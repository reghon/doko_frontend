import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Feature from "@/components/Feature";
import Review from "@/components/ReviewSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-8xl">
        <HeroSection />
        <Feature />
        <Review />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
}
