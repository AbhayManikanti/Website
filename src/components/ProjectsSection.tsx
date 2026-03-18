import { motion } from "framer-motion";
import { Shield, Car, FileText, ExternalLink } from "lucide-react";

const projects = [
  {
    icon: Shield,
    title: "Aegis AI - Fraud Detection System",
    description: "AI/ML-powered fraud detection system built with Python (FastAPI, XGBoost – 99.93% accuracy) and deployed on Google Cloud Run with Docker. Features a Next.js/TypeScript/Tailwind frontend with explainable ML insights and real-time WebSocket streaming.",
    tags: ["Machine Learning", "Python", "React", "FastAPI", "Docker", "GCP"],
    link: "https://aegissecure.netlify.app/",
  },
  {
    icon: Car,
    title: "Park-Ease (Smart Parking System)",
    description: "React + NodeJS containerized web application for real-time parking availability and spot booking. Features live space monitoring, reservation system, and user-friendly interface.",
    tags: ["React", "Node.js", "Docker", "Netlify"],
    link: "http://parkease-maps.netlify.app/",
  },
  {
    icon: FileText,
    title: "Intelligent Resume Screening",
    description: "AI-powered RPA workflow using UiPath Document Understanding for automated candidate shortlisting. Streamlines HR processes and improves recruitment efficiency.",
    tags: ["UiPath", "AI/ML", "Document Processing", "RPA"],
  },
];

const container = { animate: { transition: { staggerChildren: 0.05 } } };
const item = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.2, 0, 0, 1] },
};

const ProjectsSection = () => (
  <section id="projects" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      >
        <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
        <p className="mt-2 text-muted-foreground">Innovative solutions that solve real-world problems</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {projects.map((p) => (
          <motion.div
            key={p.title}
            variants={item}
            whileHover={{ y: -2 }}
            className="group p-5 rounded-2xl glass-border bg-surface hover:bg-surface-hover transition-colors duration-200 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl glass-border bg-card">
                <p.icon size={18} className="text-primary" />
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.description}</p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono-tabular text-muted-foreground rounded-md bg-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProjectsSection;
