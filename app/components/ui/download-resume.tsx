import { useContent } from "../../context/content/ContentContext";


const DownloadCVButton = ({ text, icon, download }: { text: string, icon?: React.ReactNode, download?: string }) => {

    const { content } = useContent();

    const resume = content.contact.resume;

    return (

        <a className="hover:opacity-80 transition-all" href={resume} target="_blank" download={download}>
            <button type="button" className={`cursor-pointer bg-card rounded-md border border-border px-4 py-2 flex items-center justify-center gap-2 hover:border-accent hover:opacity-80 transition-all text-sm text-foreground`} ><span>{icon}</span>{text}</button>
        </a>

    )
}




export default DownloadCVButton;