"use client";

import { useState, useEffect } from "react";
import servicesData from "@/data/services.json";
import { sendEmail } from "@/actions/sendEmail";

export default function ServicesSection() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState("");
    const [formStatus, setFormStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [modalOpen]);

    const handleOpenModal = (title: string) => {
        setSelectedService(title);
        setFormStatus({ type: "", message: "" });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedService("");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ type: "", message: "" });

        const formData = new FormData(event.currentTarget);
        formData.append("subject", selectedService);

        try {
            // Simulate server action
            const response = await sendEmail(null, formData);
            if (response.success) {
                setFormStatus({ type: "success", message: response.message });
                setTimeout(() => handleCloseModal(), 3000);
            } else {
                setFormStatus({ type: "error", message: response.message });
            }
        } catch (error) {
            setFormStatus({ type: "error", message: "Error inesperado." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="services" className="relative w-full bg-[#EAEAEA] py-32 md:py-48 px-6 lg:px-12 overflow-hidden border-t border-black/5">
            {/* Logo Watermark */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.05]">
                <div
                    className="w-full h-full grayscale mix-blend-multiply bg-[url('/logo.jpeg')] bg-center bg-repeat bg-[length:150%] md:bg-[length:100%] lg:bg-[length:50%]"
                />
            </div>

            <div className="max-w-[1920px] mx-auto w-full flex flex-col items-center relative z-10">
                <div className="text-center mb-20 max-w-3xl">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6 text-[#5c5c5c]">
                        {servicesData.sectionTitle} <span className="font-bold">{servicesData.sectionTitleHighlight}</span>
                    </h2>
                    <p className="text-[#555555] text-lg md:text-xl font-medium">
                        {servicesData.sectionSubtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full relative z-10">
                    {servicesData.items.map((service) => (
                        <div
                            key={service.id}
                            className="group relative flex flex-col p-8 lg:p-10 rounded-3xl bg-white/40 border border-black/5 hover:border-black/10 hover:bg-white/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-md"
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-linear-to-br from-black/0 via-transparent to-black/0 group-hover:from-black/5 transition-colors duration-500 pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full gap-6">
                                {/* Icon Representation */}
                                <div className="w-16 h-16 rounded-2xl bg-[#5C5C5C]/10 border border-[#5C5C5C]/20 flex items-center justify-center text-[#5C5C5C] group-hover:scale-110 group-hover:bg-[#5C5C5C]/20 group-hover:text-black transition-all duration-500 shadow-sm">
                                    {service.icon === 'class' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                                    )}
                                    {service.icon === 'show' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                    )}
                                    {service.icon === 'event' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                    )}
                                    {service.icon === 'custom' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5" /></svg>
                                    )}
                                </div>

                                <div className="grow">
                                    <h3 className="text-2xl font-black text-[#4F4F4F] mb-4 tracking-tight group-hover:text-black transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-[#6B6B6B] leading-relaxed text-sm lg:text-base font-medium">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Consultar Button Action */}
                                <button
                                    type="button"
                                    onClick={() => handleOpenModal(service.title)}
                                    className="mt-6 pt-6 border-t border-black/10 relative overflow-hidden flex items-center justify-between group/btn cursor-pointer"
                                >
                                    <span className="text-xs font-bold tracking-[0.2em] text-[#7A7A7A] uppercase group-hover/btn:text-black transition-colors">
                                        Consultar
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#7A7A7A] group-hover/btn:text-black transition-transform group-hover/btn:translate-x-1">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                    <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-black/20 to-transparent -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700 ease-out" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
                    <div className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8 animate-in slide-in-from-bottom-4 duration-300">
                        {/* Modal Glow */}
                        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-[60px]" />

                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
                            aria-label="Cerrar modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                                Consultar Servicio
                            </h3>
                            <p className="text-zinc-400 mb-8 text-sm">
                                Pedido de: <strong className="text-cyan-400">{selectedService}</strong>
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                                        Tu Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="tucorreo@ejemplo.com"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium text-sm"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="description" className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                                        Descripción del Evento / Pedido
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        required
                                        rows={4}
                                        placeholder="Cuéntanos un poco sobre tu idea, fechas, o necesidades..."
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm font-medium resize-none"
                                    />
                                </div>

                                {formStatus.message && (
                                    <div className={`p-3 rounded-lg text-sm font-medium border ${formStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                                        {formStatus.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-4 w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-widest uppercase text-sm py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {isSubmitting ? "Enviando..." : "Enviar Consulta"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
