import { useContent } from "../context/ContentContext";
import { SkillCard } from "./hero";


const Skills = () => {
    const { content } = useContent();
    const techStack = content.hero.skills;
    const techStackReversed = [...techStack]

    const skills = techStack.concat(techStackReversed)
    return (
        <div className="flex gap-2 animate-scroll-left hover:pause-animation">
            {skills.map((tech, index) => (
                <SkillCard key={index} {...tech} />
            ))}
        </div>
    )
}

export default Skills