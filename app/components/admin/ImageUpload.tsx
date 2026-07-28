"use client";

import { useState, useRef } from "react";
import { Upload, X, FileVideo, FileImage, Loader2 } from "lucide-react";
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
  accept = "image/png,image/jpeg,image/gif,image/webp,video/mp4,video/webm",
  multiple = false,
  label = "Upload files",
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();

  const handleUpload = async (file: File) => {
    setError("");
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

        xhr.open("POST", "/api/upload");
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        xhr.send(formData);
      });

      onUpload(result);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    if (multiple) {
      Array.from(fileList).forEach((file) => handleUpload(file));
    } else {
      handleUpload(fileList[0]);
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
      Array.from(fileList).forEach((file) => handleUpload(file));
    } else {
      handleUpload(fileList[0]);
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
    return "image";
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-foreground bg-hover"
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
          <div className="space-y-2">
            <Loader2 className="w-8 h-8 mx-auto text-foreground animate-spin" />
            <p className="text-sm text-foreground">
              Uploading... {progress}%
            </p>
            <div className="w-full max-w-xs mx-auto bg-border rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 mx-auto text-foreground/50" />
            <p className="text-sm text-foreground/70">
              {label} (drag & drop or click)
            </p>
            <p className="text-xs text-foreground/50">
              PNG, JPG, GIF, WebP, MP4, WebM (max 50MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {files.map((url) => {
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
                  // eslint-disable-next-line @next/next/no-img-element
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
