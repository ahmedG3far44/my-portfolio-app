const DownloadCVButton = ({
  text,
  icon,
}: {
  text: string;
  icon?: React.ReactNode;
}) => {
  return (
    <a
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:border-accent hover:bg-accent/5 active:scale-95 transition-all duration-200 w-fit cursor-pointer"
      href={"./resume.pdf"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="text-foreground/70 group-hover:text-foreground transition-colors">
        {icon}
      </span>
      {text}
    </a>
  );
};

export default DownloadCVButton;
