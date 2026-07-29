"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload,
  X,
  FileVideo,
  FileImage,
  FileText,
  Loader2,
  RotateCcw,
  Ban,
} from "lucide-react";
import { useAuth } from "@/app/context/auth/AuthContext";

interface UploadedFile {
  url: string;
  publicId: string;
  resourceType: string;
  format: string;
}

interface ImageUploadProps {
  onUpload: (file: UploadedFile) => void;
  onRemove: (url: string) => void;
  files: string[];
  accept?: string;
  multiple?: boolean;
  label?: string;
}

export const ImageUpload = ({
  onUpload,
  onRemove,
  files,
  accept = "image/png,image/jpeg,image/gif,image/webp,video/mp4,video/webm,application/pdf",
  multiple = false,
  label = "Upload files",
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [failedFile, setFailedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const xhrRef = useRef<XMLHttpRequest | null>(null);
  const { token } = useAuth();

  const uploadFile = useCallback(async (file: File) => {
    setError("");
    setFailedFile(null);
    setUploading(true);
    setProgress(0);

    if (file.size > 50 * 1024 * 1024) {
      setError("File size exceeds 50MB limit");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const xhr = new XMLHttpRequest();
      xhrRef.current = xhr;

      const result = await new Promise<UploadedFile>((resolve, reject) => {
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            try {
              const err = JSON.parse(xhr.responseText);
              reject(new Error(err.error || "Upload failed"));
            } catch {
              reject(new Error("Upload failed"));
            }
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Upload failed")));
        xhr.addEventListener("abort", () => reject(new Error("Upload cancelled")));

        xhr.open("POST", "/api/upload");
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.send(formData);
      });

      onUpload(result);
    } catch (err: any) {
      if (err.message === "Upload cancelled") return;
      setError(err.message || "Upload failed");
      setFailedFile(file);
    } finally {
      setUploading(false);
      setProgress(0);
      xhrRef.current = null;
    }
  }, [token, onUpload]);

  const cancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;
    }
    setUploading(false);
    setProgress(0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    if (multiple) {
      Array.from(fileList).forEach((file) => uploadFile(file));
    } else {
      uploadFile(fileList[0]);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const fileList = e.dataTransfer.files;
    if (!fileList.length) return;

    if (multiple) {
      Array.from(fileList).forEach((file) => uploadFile(file));
    } else {
      uploadFile(fileList[0]);
    }
  };

  const isVideo = (url: string) => {
    const ext = url.split(".").pop()?.toLowerCase();
    return ["mp4", "webm", "mov"].includes(ext || "");
  };

  const getFileIcon = (url: string) => {
    const ext = url.split(".").pop()?.toLowerCase();
    if (["mp4", "webm", "mov"].includes(ext || "") || url.includes("/video/")) {
      return "video";
    }
    if (ext === "gif") return "gif";
    if (ext === "pdf") return "pdf";
    if (ext === "docx" || ext === "doc") return "docx";
    return "image";
  };

  const getFileName = (url: string) => {
    const parts = url.split("/");
    const last = parts[parts.length - 1];
    const decoded = decodeURIComponent(last);
    return decoded.split("?")[0];
  };

  const documents = files.filter((url) => {
    const t = getFileIcon(url);
    return t === "pdf" || t === "docx";
  });

  const mediaFiles = files.filter((url) => {
    const t = getFileIcon(url);
    return t !== "pdf" && t !== "docx";
  });

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>

      {/* Document preview */}
      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((url) => {
            const type = getFileIcon(url);
            return (
              <div
                key={url}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {getFileName(url)}
                  </p>
                  <p className="text-[11px] text-foreground/50 uppercase font-semibold">
                    {type === "pdf" ? "PDF Document" : "Word Document"}
                  </p>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs text-blue-500 hover:text-blue-400 font-medium px-2 py-1 rounded-md hover:bg-blue-500/10 transition-colors"
                >
                  View
                </a>
                <button
                  type="button"
                  onClick={() => onRemove(url)}
                  className="shrink-0 w-7 h-7 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-foreground bg-hover"
            : uploading
            ? "border-foreground/30 bg-card pointer-events-auto"
            : error
            ? "border-red-500/50 hover:border-red-400"
            : "border-border hover:border-accent"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-3">
            <Loader2 className="w-8 h-8 mx-auto text-foreground animate-spin" />
            <p className="text-sm text-foreground">Uploading... {progress}%</p>
            <div className="w-full max-w-xs mx-auto bg-border rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cancelUpload();
              }}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              <Ban className="w-3.5 h-3.5" />
              Cancel upload
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 mx-auto text-foreground/50" />
            <p className="text-sm text-foreground/70">
              {documents.length > 0
                ? "Click to replace"
                : `${label} (drag & drop or click)`}
            </p>
            <p className="text-xs text-foreground/50">
              PNG, JPG, GIF, WebP, MP4, WebM, PDF, DOCX (max 50MB)
            </p>
          </div>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
          <span className="flex-1">{error}</span>
          {failedFile && (
            <button
              type="button"
              onClick={() => uploadFile(failedFile)}
              className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded-md transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Retry
            </button>
          )}
          <button
            type="button"
            onClick={() => { setError(""); setFailedFile(null); }}
            className="shrink-0 p-1 hover:bg-red-500/10 rounded-md transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Media preview grid */}
      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {mediaFiles.map((url) => {
            const type = getFileIcon(url);
            return (
              <div
                key={url}
                className="relative group rounded-lg overflow-hidden border border-border aspect-video bg-card"
              >
                {type === "video" ? (
                  <div className="w-full h-full flex items-center justify-center bg-card">
                    <FileVideo className="w-8 h-8 text-foreground/50" />
                  </div>
                ) : (
                  <img
                    src={url}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-background/80 text-foreground">
                  {type === "video" ? "MP4" : type === "gif" ? "GIF" : "IMG"}
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(url)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
