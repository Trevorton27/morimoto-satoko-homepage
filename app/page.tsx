import StickyNav from "@/components/StickyNav";
import HeroSection from "@/components/HeroSection";
import MessageSection from "@/components/MessageSection";
import AchievementsSection from "@/components/AchievementsSection";
import ProfileSection from "@/components/ProfileSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main>
        <HeroSection />
        <MessageSection />
        <AchievementsSection />
        <ProfileSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
