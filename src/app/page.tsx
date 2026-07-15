import Banner from "@/components/Home/Banner";
import EventCategories from "@/components/Home/EventCategories";
import FeaturedEvents from "@/components/Home/FeaturedEvents";
import HowItWorks from "@/components/Home/HowItWorks";
import PlatformStats from "@/components/Home/PlatformStats";
import Testimonials from "@/components/Home/Testimonials";
import FAQ from "@/components/Home/FAQ";

export default function Home() {
  return (
    <>
      <Banner />
      <EventCategories />
      <FeaturedEvents />
      <HowItWorks />
      <PlatformStats />
      <Testimonials />
      <FAQ />
    </>
  );
}