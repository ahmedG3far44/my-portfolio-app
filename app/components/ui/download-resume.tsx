import { useContent } from "../../context/content/ContentContext";

const DownloadCVButton = ({ text, icon }: { text: string; icon?: React.ReactNode }) => {
  const { content } = useContent();

  const raw = content.contact.resume;
  if (!raw) return null;

  const href = raw.startsWith("http") ? raw : "/" + raw;
  const isCloudinary = href.includes("res.cloudinary.com");
  const downloadUrl = isCloudinary
    ? href.replace("/upload/", "/upload/fl_attachment/")
    : href;

  return (
    <a
      className="cursor-pointer bg-card rounded-md border border-border px-4 py-2 flex items-center justify-center gap-2 hover:border-accent hover:opacity-80 transition-all text-sm text-foreground w-fit"
      href={downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{icon}</span>
      {text}
    </a>
  );
};

export default DownloadCVButton;
