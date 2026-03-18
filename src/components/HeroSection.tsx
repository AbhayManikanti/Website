import { motion } from "framer-motion";
import { Mail, Linkedin, Download, Brain, Bot, BarChart3 } from "lucide-react";

const transition = { duration: 0.5, ease: [0.2, 0, 0, 1] };

const stats = [
  { value: "£6K+", label: "Cost Savings" },
  { value: "90+", label: "Hours Automated" },
  { value: "1+", label: "AI Projects" },
];

const floatingBadges = [
  { icon: Brain, label: "AI/ML", className: "top-8 right-12" },
  { icon: Bot, label: "RPA", className: "bottom-24 right-0" },
  { icon: BarChart3, label: "Analytics", className: "bottom-12 right-16" },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-16">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-border bg-surface text-xs font-mono-tabular uppercase tracking-widest text-muted-foreground">
            <Bot size={14} />
            AI & RPA Specialist
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Hi, I'm{" "}
              <span className="text-primary">Abhay Sreenath Manikanti</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Computer Science student with hands-on experience in AI, automation, and data-driven process optimization. I specialize in creating intelligent solutions that enhance efficiency and drive measurable business impact.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            {stats.map((s) => (
              <div key={s.label} className="flex-1 p-4 rounded-xl glass-border bg-surface text-center">
                <div className="text-xl font-bold font-mono-tabular text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:abhay.manikanti@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              <Mail size={16} /> Hire Me
            </a>
            <a
              href="https://linkedin.com/in/abhay-manikanti-504a6b1b3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 glass-border bg-surface text-foreground rounded-xl font-medium text-sm hover:bg-surface-hover active:scale-95 transition-all duration-200"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href="https://raw.githubusercontent.com/AbhayManikanti/Website/main/Abhay%20Sreenath%20Manikanti%20-%20Artificial%20Intelligence%20Intern%20Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-3 glass-border bg-surface text-foreground rounded-xl font-medium text-sm hover:bg-surface-hover active:scale-95 transition-all duration-200"
            >
              <Download size={16} /> Resume
            </a>
          </div>
        </motion.div>

        {/* Right - Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...transition, delay: 0.3 }}
          className="relative flex justify-center"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
            <div className="w-full h-full rounded-full overflow-hidden glass-border-lg">
              <img
                src="https://raw.githubusercontent.com/AbhayManikanti/Website/main/src/project1.jpeg"
                alt="Abhay Manikanti"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badges */}
            {floatingBadges.map((badge) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...transition, delay: 0.6 }}
                className={`absolute ${badge.className} flex items-center gap-2 px-3 py-2 rounded-xl glass-border-md bg-card text-sm font-medium text-foreground`}
              >
                <badge.icon size={16} className="text-primary" />
                {badge.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
