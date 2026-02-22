import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Shield, Info } from 'lucide-react';
import type { Product } from './Catalog';

interface ProductDetailProps {
    productId: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/products');
                const data: Product[] = await response.json();
                const found = data.find(p => p.id === productId);
                setProduct(found || null);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [productId]);

    if (loading) {
        return (
            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
                <div className="h-8 bg-neutral-200 w-1/4 mb-8 rounded"></div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="aspect-square bg-neutral-100 rounded-lg"></div>
                    <div className="space-y-4">
                        <div className="h-10 bg-neutral-200 w-3/4 rounded"></div>
                        <div className="h-6 bg-neutral-100 w-1/2 rounded"></div>
                        <div className="h-32 bg-neutral-50 w-full rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="pt-32 pb-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
                <a href="#catalogo" className="text-yellow-600 hover:underline">Voltar ao catálogo</a>
            </div>
        );
    }

    return (
        <main className="pt-24 pb-20 bg-white text-black min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <a href="#catalogo" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors">
                        <ArrowLeft size={14} className="mr-3" /> Voltar ao Catálogo
                    </a>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7 relative"
                    >
                        <div className="aspect-square bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <span className="bg-white/80 backdrop-blur-md text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-black/10">
                                {product.code}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-5 flex flex-col"
                    >
                        <div className="mb-6">
                            <span className="text-yellow-500 font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
                                Detalhes do Produto
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tighter">
                                {product.name}
                            </h1>
                        </div>

                        <p className="text-lg text-neutral-600 leading-relaxed mb-10">
                            {product.description}
                        </p>

                        <div className="space-y-5 border-y border-neutral-200 py-8 mb-10">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3 text-neutral-500"><Package size={16} /><span className="font-bold uppercase text-xs tracking-widest">Material</span></div>
                                <span className="font-medium text-sm text-black">{product.material}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3 text-neutral-500"><Shield size={16} /><span className="font-bold uppercase text-xs tracking-widest">Acabamento</span></div>
                                <span className="bg-yellow-400/20 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full border border-yellow-400/30">{product.finishType}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            <button onClick={() => window.location.href = '#contacto'} className="flex-1 bg-yellow-400 text-black font-bold py-4 uppercase text-xs tracking-widest hover:bg-yellow-500 transition shadow-lg hover:shadow-yellow-400/20 rounded-md">
                                Solicitar Orçamento
                            </button>
                            {product.drawingUrl ? (
                                <a href={product.drawingUrl} download className="flex-1 border border-neutral-300 text-black font-bold py-4 uppercase text-xs tracking-widest hover:bg-neutral-100 transition text-center rounded-md">
                                    Ficha Técnica
                                </a>
                            ) : (
                                <button className="flex-1 border border-neutral-200 text-neutral-400 font-bold py-4 uppercase text-xs tracking-widest cursor-not-allowed text-center rounded-md">
                                    Ficha Indisponível
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>

                <div className="mt-24 pt-16 border-t border-neutral-200">
                    <div className="flex items-center gap-3 mb-8">
                        <Info size={20} className="text-yellow-500" />
                        <h2 className="text-xl font-bold uppercase tracking-widest">Informação Adicional</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-sm">
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-black">Qualidade Certificada</h4>
                            <p className="text-neutral-600 leading-relaxed">
                                Todos os nossos produtos seguem rigorosos padrões de qualidade IATF 16949, garantindo a máxima precisão e durabilidade para a indústria automóvel.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-black">Sustentabilidade</h4>
                            <p className="text-neutral-600 leading-relaxed">
                                Utilizamos processos de injeção otimizados para reduzir o desperdício de material e priorizamos polímeros recicláveis sempre que as especificações técnicas o permitem.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-black">Customização</h4>
                            <p className="text-neutral-600 leading-relaxed">
                                Oferecemos soluções à medida, desde o desenvolvimento do molde até ao acabamento final em metalização ou pintura, adaptando-nos às suas necessidades específicas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
