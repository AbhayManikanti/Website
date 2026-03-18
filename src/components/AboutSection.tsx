import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award } from "lucide-react";

const highlights = [
  { icon: GraduationCap, text: "B.Tech in Information Science & Engineering" },
  { icon: Briefcase, text: "AI Intern at Fortive" },
  { icon: Award, text: "Published Research Author" },
];

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      >
        <h2 className="text-3xl font-bold text-foreground">About Me</h2>
        <p className="mt-2 text-muted-foreground">Passionate about transforming businesses through intelligent automation</p>

        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm a Computer Science student at BMS College of Engineering with a passion for artificial intelligence
              and process automation. Currently working as an AI Intern at Fortive, I've developed solutions that have
              saved companies hundreds of hours and thousands of pounds in operational costs.
            </p>
            <p>
              My expertise spans across RPA development, machine learning pipeline creation, and business process
              optimization. I'm particularly skilled at identifying inefficiencies and creating AI-powered solutions
              that deliver measurable business value.
            </p>
          </div>

          <div className="space-y-3">
            {highlights.map((h) => (
              <div
                key={h.text}
                className="flex items-center gap-3 p-4 rounded-xl glass-border bg-surface text-foreground"
              >
                <h.icon size={18} className="text-primary shrink-0" />
                <span className="text-sm">{h.text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
