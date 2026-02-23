import Link from "next/link";
import footerData from "@/data/footer.json";

// Helper function to render simple SVG icons based on the platform name
const SocialIcon = ({ type }: { type: string }) => {
    switch (type) {
        case "instagram":
            return (
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
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
            );
        case "youtube":
            return (
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
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                </svg>
            );
        case "tiktok":
            return (
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
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
            );
        default:
            return null;
    }
};

export default function Footer() {
    return (
        <footer id="contact" className="relative w-full bg-[#0a0a0a] border-t border-white/10 pt-20 pb-10 px-6 lg:px-12 overflow-hidden text-white font-sans">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-magenta-500/5 blur-[120px] pointer-events-none" />

            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                {/* Brand & Description */}
                <div className="col-span-1 lg:col-span-1 flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-3 text-3xl font-black tracking-tighter hover:text-cyan-400 transition-colors">
                        <img src="/logo.jpeg" alt="Logotipo Break The Beat" className="w-10 h-10 object-cover rounded-full" />
                        {footerData.brand.name}
                    </Link>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
                        {footerData.brand.description}
                    </p>
                </div>

                {/* Explore Links */}
                <div className="col-span-1 flex flex-col gap-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">
                        {footerData.links.title}
                    </h3>
                    <ul className="flex flex-col gap-4">
                        {footerData.links.items.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.href}
                                    className="text-sm font-semibold hover:text-cyan-400 transition-colors"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="col-span-1 flex flex-col gap-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">
                        {footerData.contact.title}
                    </h3>
                    <div className="flex flex-col gap-4 text-sm font-medium text-zinc-300">
                        <a href={`mailto:${footerData.contact.email}`} className="hover:text-white transition-colors">
                            {footerData.contact.email}
                        </a>
                        <a href={`tel:${footerData.contact.phone}`} className="hover:text-white transition-colors">
                            {footerData.contact.phone}
                        </a>
                        <p>{footerData.contact.address}</p>
                    </div>
                </div>

                {/* Social Navigation */}
                <div className="col-span-1 flex flex-col gap-6 md:items-end lg:items-end">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2 md:text-right w-full lg:text-right">
                        SÍGUENOS
                    </h3>
                    <div className="flex gap-4">
                        {footerData.socials.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Follow on ${social.platform}`}
                                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                            >
                                <SocialIcon type={social.icon} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-[1920px] mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-zinc-500 font-medium tracking-wide">
                    {footerData.copyright}
                </p>
                <div className="flex gap-6 text-xs text-zinc-500 font-medium">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
