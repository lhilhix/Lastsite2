import React, { useState } from 'react';
import Modal from './Modal';
import { useContent } from '../src/hooks/useContent';

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <p className="text-5xl font-black text-yellow-400 mb-2 tracking-tighter">{value}</p>
        <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{label}</p>
    </div>
);

const AboutUs: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { content, loading } = useContent();

    if (loading || !content) return <section className="py-24 bg-neutral-50 animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-10 bg-gray-200 w-1/2 mx-auto mb-8"></div><div className="h-40 bg-gray-100 w-full"></div></div></section>;

    return (
        <>
            <section id="sobre" className="py-24 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-5 gap-16 items-center">
                        <div className="md:col-span-3 space-y-6 text-gray-700 text-base leading-relaxed">
                             <h2 className="text-3xl font-bold mb-4 text-black">{content.about.title}</h2>
                            <p>{content.about.content1}</p>
                            <p>{content.about.content2}</p>
                            <div className="pt-4">
                                <span className="inline-block h-1 w-20 bg-yellow-400"></span>
                            </div>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-2 gap-y-12 gap-x-8">
                            <StatCard value="+25" label="Anos" />
                            <StatCard value="+10M" label="Peças/Ano" />
                            <StatCard value="IATF" label="16949" />
                            <StatCard value="9001" label="ISO" />
                        </div>
                    </div>

                    <div className="mt-24">
                        <h3 className="text-2xl font-bold text-center mb-10 text-black">A Nossa Trajetória</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {(content.about.gallery || []).map((imageUrl: string, index: number) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(imageUrl)}
                                        className="block aspect-[4/3] bg-gray-200 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-yellow-400 overflow-hidden"
                                        aria-label={`Ver imagem ${index + 1}`}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={`Galeria ${index + 1}`}
                                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
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
                        src={selectedImage.replace('/400/300', '/1200/800')}
                        alt="Vista ampliada da galeria" 
                        className="w-full h-auto object-contain max-h-[90vh]"
                    />
                )}
            </Modal>
        </>
    );
};

export default AboutUs;