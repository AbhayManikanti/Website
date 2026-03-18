import { motion } from "framer-motion";
import { Brain, Code2, Wrench, Users } from "lucide-react";

const categories = [
  {
    icon: Brain,
    title: "AI & Automation",
    skills: ["AI/ML Models", "RPA", "UiPath", "Data Analysis", "Data Visualization", "Azure AI Foundry"],
  },
  {
    icon: Code2,
    title: "Programming",
    skills: ["Python", "Java", "C++", "JavaScript", "SQL"],
  },
  {
    icon: Wrench,
    title: "DevOps & Tools",
    skills: ["Docker", "Git", "Pytest", "Linux/Unix"],
  },
  {
    icon: Users,
    title: "Business & Soft Skills",
    skills: ["Project Management", "Process Optimization", "Analytical Thinking", "Leadership", "Communication"],
  },
];

const SkillsSection = () => (
  <section id="skills" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      >
        <h2 className="text-3xl font-bold text-foreground">Technical Skills</h2>
        <p className="mt-2 text-muted-foreground">Comprehensive expertise across AI, development, and business domains</p>
      </motion.div>

      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="p-5 rounded-2xl glass-border bg-surface"
          >
            <div className="flex items-center gap-2 mb-4">
              <cat.icon size={18} className="text-primary" />
              <h3 className="text-sm font-semibold text-foreground">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span key={skill} className="px-2.5 py-1 text-xs text-muted-foreground rounded-lg bg-muted">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
