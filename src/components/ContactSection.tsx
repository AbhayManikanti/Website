import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Download, Rocket, Lightbulb, Users, TrendingUp } from "lucide-react";

const contactItems = [
  { icon: Mail, text: "abhay.manikanti@gmail.com", href: "mailto:abhay.manikanti@gmail.com" },
  { icon: Phone, text: "+91 6366269701", href: "tel:+916366269701" },
  { icon: Linkedin, text: "LinkedIn Profile", href: "https://linkedin.com/in/abhay-manikanti-504a6b1b3" },
  { icon: Github, text: "GitHub Portfolio", href: "https://github.com/AbhayManikanti" },
  { icon: Download, text: "Download Resume", href: "https://raw.githubusercontent.com/AbhayManikanti/Website/main/Abhay%20Sreenath%20Manikanti%20-%20Artificial%20Intelligence%20Intern%20Resume.pdf" },
];

const benefits = [
  { icon: Rocket, text: "Proven track record of delivering cost-saving automation solutions" },
  { icon: Lightbulb, text: "Strong analytical mindset with business process optimization experience" },
  { icon: Users, text: "Collaborative team player with excellent communication skills" },
  { icon: TrendingUp, text: "Data-driven approach to problem-solving and decision making" },
];

const ContactSection = () => (
  <section id="contact" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      >
        <h2 className="text-3xl font-bold text-foreground">Ready to Make an Impact</h2>
        <p className="mt-2 text-muted-foreground">Let's discuss how my AI and automation expertise can drive your business forward</p>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {/* Contact info */}
          <div className="p-6 rounded-2xl glass-border-md bg-surface space-y-5">
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I'm actively seeking opportunities in AI, finance, and business roles where I can apply my
              technical expertise and passion for process optimization to create meaningful impact.
            </p>
            <div className="space-y-2">
              {contactItems.map((c) => (
                <a
                  key={c.text}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
                >
                  <c.icon size={16} className="text-primary shrink-0" />
                  {c.text}
                </a>
              ))}
            </div>
          </div>

          {/* Why choose me */}
          <div className="p-6 rounded-2xl glass-border-md bg-surface space-y-5">
            <h3 className="text-lg font-semibold text-foreground">Why Choose Me?</h3>
            <div className="space-y-3">
              {benefits.map((b) => (
                <div key={b.text} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <b.icon size={16} className="text-primary mt-0.5 shrink-0" />
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
            <a
              href="mailto:abhay.manikanti@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 active:scale-95 transition-all duration-200 w-full justify-center"
            >
              <Mail size={16} /> Contact Me for Opportunities
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
