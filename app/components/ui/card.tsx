

const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="group cursor-pointer bg-card rounded-md border border-border p-2 flex items-center justify-center hover:border-accent transition-all ">
            {children}
        </div>
    )

}

export default Card;