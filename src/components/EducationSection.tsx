import { motion } from "framer-motion";
import { GraduationCap, Award, FileText } from "lucide-react";

const EducationSection = () => (
  <section id="education" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="space-y-10"
      >
        <div>
          <h2 className="text-3xl font-bold text-foreground">Education & Certifications</h2>
          <p className="mt-2 text-muted-foreground">Strong academic foundation in computer science and AI</p>
        </div>

        {/* Degree */}
        <div className="p-6 rounded-2xl glass-border-md bg-surface">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl glass-border bg-card shrink-0">
              <GraduationCap size={20} className="text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Bachelor of Technology</h3>
              <p className="text-sm text-primary font-medium">Information Science & Engineering</p>
              <p className="text-sm text-muted-foreground">BMS College of Engineering, Bangalore</p>
              <div className="flex flex-wrap gap-4 text-xs font-mono-tabular text-muted-foreground mt-2">
                <span><strong className="text-foreground">GPA:</strong> 7.9/10</span>
                <span>Expected Graduation: July 2026</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                <strong className="text-foreground">Coursework:</strong> Data Structures, Algorithms, DBMS, OOP, Mobile App Dev, Software Engineering, Unix Programming
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="https://raw.githubusercontent.com/AbhayManikanti/Website/main/Advanced%20Certification%20in%20Data%20Science%20and%20AI%20from%20IIT%20Madras.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-xl glass-border bg-surface hover:bg-surface-hover transition-colors flex items-start gap-3"
          >
            <Award size={16} className="text-primary mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Advanced Certification in Data Science & AI</h4>
              <p className="text-xs text-muted-foreground mt-0.5">IIT Madras</p>
            </div>
          </a>
          <a
            href="https://raw.githubusercontent.com/AbhayManikanti/Website/main/IIT%20Roorkee%20AI:ML%20Certificate.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-xl glass-border bg-surface hover:bg-surface-hover transition-colors flex items-start gap-3"
          >
            <Award size={16} className="text-primary mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">ML & AI Using COVID-19 Data Analysis</h4>
              <p className="text-xs text-muted-foreground mt-0.5">IIT Roorkee & Finland Labs</p>
            </div>
          </a>
        </div>

        {/* Publication */}
        <a
          href="http://www.ijcrt.org/papers/IJCRT2501340.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group block p-4 rounded-xl glass-border bg-surface hover:bg-surface-hover transition-colors"
        >
          <div className="flex items-start gap-3">
            <FileText size={16} className="text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-muted-foreground mb-1">Research Publication</p>
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                "Ambulance Congestion Control using AI & IoT Devices"
              </h4>
              <p className="text-xs text-muted-foreground mt-1">Published in IJCRT Journal</p>
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  </section>
);

export default EducationSection;
