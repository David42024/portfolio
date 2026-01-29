import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection, CertificatesSection, ExperienceSection, SkillsSection, ContactSection } from "@/components/sections";
import { Certificate } from "crypto";


export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Placeholder sections */}
      <ProjectsSection />

      <SkillsSection />

      <ExperienceSection />

      <CertificatesSection />

      <ContactSection/>
    </>
  );
}