import React, { useState } from 'react';
import Modal from './Modal';
import { useContent } from '../src/hooks/useContent';

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="bg-gray-50 p-6 border border-gray-100 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
        <p className="text-4xl font-bold text-black mb-2">{value}</p>
        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{label}</p>
    </div>
);

const galleryImages = [
    { seed: 'old-factory', alt: 'Fábrica antiga da Plásticos Bueso' },
    { seed: 'first-machine', alt: 'Primeira máquina de injeção' },
    { seed: 'founding-team', alt: 'Equipa fundadora da empresa' },
    { seed: 'early-product', alt: 'Um dos primeiros produtos fabricados' },
];

const AboutUs: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { content, loading } = useContent();

    if (loading || !content) return <section className="py-24 bg-white animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-10 bg-gray-200 w-1/2 mx-auto mb-8"></div><div className="h-40 bg-gray-100 w-full"></div></div></section>;

    return (
        <>
            <section id="sobre" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">{content.about.title}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">{content.about.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6 text-gray-700 text-base leading-relaxed">
                            <p>{content.about.content1}</p>
                            <p>{content.about.content2}</p>
                            <div className="pt-4">
                                <span className="inline-block h-1 w-20 bg-yellow-400"></span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="sm:col-span-2">
                                <StatCard value="+25" label="Anos de Experiência" />
                            </div>
                            <StatCard value="+10M" label="Peças / Ano" />
                            <StatCard value="IATF 16949" label="Certificação" />
                        </div>
                    </div>

                    <div className="mt-24">
                        <h3 className="text-2xl font-bold text-center mb-10">A Nossa Trajetória em Imagens</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(content.about.gallery || []).map((imageUrl: string, index: number) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(imageUrl)}
                                        className="block aspect-square bg-gray-200 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-yellow-400 overflow-hidden"
                                        aria-label={`Ver imagem ${index + 1}`}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={`Galeria ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} size="lg" padding={false}>
                {selectedImage && (
                    <img 
                        src={selectedImage.replace('/400/400', '/1200/800')}
                        alt="Vista ampliada da galeria" 
                        className="w-full h-auto object-contain max-h-[90vh]"
                    />
                )}
            </Modal>
        </>
    );
};

export default AboutUs;