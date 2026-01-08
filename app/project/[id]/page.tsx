import ProjectDetailsPage from "@/app/components/project-details";


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    // const { id } = await params;
    return (
        <ProjectDetailsPage />
    )
}

export default page