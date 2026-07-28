import ProjectDetailsPage from "@/app/components/project-details";
import { SyncLanguageWrapper } from "@/app/components/sync-language-wrapper";


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    return (
        <SyncLanguageWrapper>
            <ProjectDetailsPage />
        </SyncLanguageWrapper>
    )
}

export default page