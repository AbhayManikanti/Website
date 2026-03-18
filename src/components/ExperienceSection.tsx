import { motion } from "framer-motion";

const achievements = [
  "Created the Nimbus-AI Chatbot for Fluke Corporation, saving **500 hours annually** and reducing costs by **£35,000**",
  "Architected a lead-generation AI agent that automates processing of **1,500+ new leads monthly**, with projected annual revenue impact of **£6 million**",
  "Built an AI Agent Mentor to support employee training in Kaizen methodology across **10,000+ employees**",
  "Developed RPA automation workflows, saving **30+ hours** of employee time yearly across multiple teams",
  "Designed ML pipelines to improve workflow efficiency and enhance reporting dashboards with automated insights",
];

const renderBold = (text: string) => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : part
  );
};

const ExperienceSection = () => (
  <section id="experience" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      >
        <h2 className="text-3xl font-bold text-foreground">Professional Experience</h2>
        <p className="mt-2 text-muted-foreground">Building intelligent solutions that drive real business impact</p>

        <div className="mt-10 p-6 rounded-2xl glass-border-md bg-surface">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Artificial Intelligence Intern</h3>
              <p className="text-primary font-medium text-sm mt-1">Fortive</p>
            </div>
            <span className="text-xs font-mono-tabular uppercase tracking-widest text-muted-foreground">
              Aug 2025 — Present
            </span>
          </div>

          <div className="space-y-3">
            {achievements.map((a, i) => (
              <div key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary mt-1 shrink-0">▸</span>
                <span>{renderBold(a)}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ExperienceSection;
