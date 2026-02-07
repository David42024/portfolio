import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection, CertificatesSection, ExperienceSection, SkillsSection, ContactSection } from "@/components/sections";


export default function HomePage() {
  return (
    <>
      <HeroSection />

      <ProjectsSection />

      <SkillsSection />

      <ExperienceSection />

      <CertificatesSection />

      <ContactSection/>
    </>
  );
}