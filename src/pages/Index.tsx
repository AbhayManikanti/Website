import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";

const Index = () => (
  <>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SkillsSection />
    <EducationSection />
    <ContactSection />
    <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border/10">
      <div className="container">© {new Date().getFullYear()} Abhay Sreenath Manikanti. All rights reserved.</div>
    </footer>
  </>
);

export default Index;
