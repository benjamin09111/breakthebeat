import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black selection:bg-cyan-500 selection:text-black">
      {/* JSON-driven Header */}
      <Header />

      {/* Hero Section with Video/Image Background */}
      <section className="relative h-screen w-full flex items-center justify-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden after:content-[''] after:absolute after:inset-0 after:bg-black/60 after:pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center scale-[1.02]"
          >
            <source src="/header_video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full px-6 flex flex-col items-center xl:mt-0 mt-[10vh]" />

        {/* Footbar / Scroll indicator */}
        <div className="absolute bottom-12 left-0 w-full flex justify-center z-20">
          <a
            href="#about-us"
            className="group flex flex-col items-center gap-3 text-white/80 hover:text-white transition-all duration-300"
            aria-label="Scroll to About Us"
          >
            <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase group-hover:text-cyan-400 group-hover:-translate-y-1 transition-all duration-300">
              Sobre Nosotros
            </span>
            <div className="p-2 lg:p-3 rounded-full border border-white/20 backdrop-blur-sm group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300 animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* About Us / Projects Configurable Section */}
      <ProjectsSection />

      {/* Configurable Services Section with Contact Modal */}
      <ServicesSection />

      {/* JSON-driven Footer */}
      <Footer />
    </main >
  );
}
