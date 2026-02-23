"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import projectsData from "@/data/projects.json";

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<any>(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProject]);

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + "...";
    };

    return (
        <>
            <section id="about-us" className="min-h-screen w-full bg-black relative">
                <div className="w-full grid grid-cols-1 md:grid-cols-2">
                    {projectsData.map((project, index) => {
                        const isLastOdd = index === projectsData.length - 1 && projectsData.length % 2 !== 0;

                        return (
                            <div
                                key={project.id}
                                className={`group relative h-[70vh] md:h-screen w-full overflow-hidden flex flex-col items-center justify-center ${isLastOdd ? "md:col-span-2 md:h-[60vh]" : ""
                                    }`}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                                    <Image
                                        src={project.image}
                                        alt={project.name}
                                        fill
                                        className="object-cover object-center"
                                        quality={90}
                                    />
                                    {/* Dark overlay for text readability */}
                                    <div className="absolute inset-0 bg-black/70 group-hover:bg-black/80 transition-colors duration-500" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center max-w-3xl">
                                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-xl">
                                        {project.name}
                                    </h2>

                                    <p className="text-base md:text-xl text-white/90 font-medium mb-4 drop-shadow-md">
                                        {truncateText(project.description, 160)}
                                    </p>

                                    {project.description.length > 160 && (
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="text-cyan-400 underline uppercase tracking-widest text-sm font-bold mb-6 hover:text-cyan-300 transition-colors"
                                        >
                                            Ver más
                                        </button>
                                    )}

                                    {/* Participants subtitle */}
                                    {project.participants && project.participants.length > 0 && (
                                        <div className="text-sm md:text-base text-cyan-400 font-semibold mb-6 flex flex-wrap justify-center drop-shadow-md">
                                            <span>Participantes: {project.participants.join(", ")}</span>
                                        </div>
                                    )}

                                    {/* Social Icons */}
                                    {(project.youtube || project.instagram) && (
                                        <div className="flex gap-4 mb-8">
                                            {project.youtube && (
                                                <a
                                                    href={project.youtube}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-white/10 hover:bg-red-500/80 rounded-full transition-colors backdrop-blur-sm shadow-xl text-white"
                                                    title="YouTube"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M21.582,6.186c-0.23,-0.86,-0.908,-1.538,-1.768,-1.768C18.253,4,12,4,12,4S5.747,4,4.186,4.418c-0.86,0.23,-1.538,0.908,-1.768,1.768C2,7.747,2,12,2,12s0,4.253,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768C5.747,20,12,20,12,20s6.253,0,7.814,-0.418c0.86,-0.23,1.538,-0.908,1.768,-1.768C22,16.253,22,12,22,12S22,7.747,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
                                                    </svg>
                                                </a>
                                            )}
                                            {project.instagram && (
                                                <a
                                                    href={project.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-white/10 hover:bg-pink-500/80 rounded-full transition-colors backdrop-blur-sm shadow-xl text-white"
                                                    title="Instagram"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Description Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                            onClick={() => setSelectedProject(null)}
                            aria-label="Cerrar modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-6 pr-8">
                            {selectedProject.name}
                        </h3>
                        <div className="overflow-y-auto pr-2 text-white/90 space-y-4">
                            {selectedProject.description.split('\n').map((paragraph: string, idx: number) => (
                                <p key={idx} className="text-sm md:text-base leading-relaxed font-medium">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {(selectedProject.youtube || selectedProject.instagram) && (
                            <div className="mt-8 pt-6 border-t border-zinc-800 flex gap-4">
                                {selectedProject.youtube && (
                                    <a
                                        href={selectedProject.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors font-bold text-sm tracking-wider uppercase"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M21.582,6.186c-0.23,-0.86,-0.908,-1.538,-1.768,-1.768C18.253,4,12,4,12,4S5.747,4,4.186,4.418c-0.86,0.23,-1.538,0.908,-1.768,1.768C2,7.747,2,12,2,12s0,4.253,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768C5.747,20,12,20,12,20s6.253,0,7.814,-0.418c0.86,-0.23,1.538,-0.908,1.768,-1.768C22,16.253,22,12,22,12S22,7.747,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
                                        </svg>
                                        Ver Video
                                    </a>
                                )}
                                {selectedProject.instagram && (
                                    <a
                                        href={selectedProject.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 rounded-lg transition-colors font-bold text-sm tracking-wider uppercase"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                        Instagram
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
