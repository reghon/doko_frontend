import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Feature from "@/components/Feature";
import Review from "@/components/ReviewSection";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-8xl px-4">
        <HeroSection />
        <Feature />
        <Review />
      </main>
    </>
  );
}
