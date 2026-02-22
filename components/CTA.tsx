import React from 'react';
import { useContent } from '../src/hooks/useContent';

const CTA: React.FC = () => {
    const { content, loading } = useContent();

    if (loading || !content) return <section className="py-12 bg-yellow-400 animate-pulse"><div className="h-20 bg-yellow-500/20 w-full"></div></section>;

    return (
        <section 
            className="py-20 bg-black relative overflow-hidden"
            style={content.cta.bgImage ? { backgroundImage: `url(${content.cta.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
            {content.cta.bgImage && <div className="absolute inset-0 bg-black/60"></div>}
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white uppercase tracking-wider">{content.cta.title}</h2>
                <p className="text-neutral-300 mb-8 text-base md:text-lg max-w-2xl mx-auto">
                    {content.cta.subtitle}
                </p>
                <a 
                    href="#catalogo"
                    className="inline-flex items-center justify-center px-10 py-4 bg-yellow-400 text-black font-bold text-xs uppercase hover:bg-yellow-500 transition-colors duration-300 shadow-lg"
                >
                    {content.cta.buttonText}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default CTA;