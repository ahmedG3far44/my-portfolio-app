
const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="group cursor-pointer bg-card border border-border rounded-lg p-2.5 flex items-center justify-center hover:border-accent hover:shadow-sm hover:shadow-accent/10 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
            {children}
        </div>
    )
}

export default Card;