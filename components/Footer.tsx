import React from 'react';

interface FooterProps {
    onContactClick: () => void;
    onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick, onAdminClick }) => {
    return (
        <footer id="contacto" className="bg-black text-white pt-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-sm">
                    <div className="md:col-span-4">
                         <div className="text-2xl font-black tracking-tighter mb-4">
                            <a href="#home" className="flex items-center gap-2 text-white">
                                <span>PLÁSTICOS</span> 
                                <span className="text-yellow-500">BUESO</span>
                            </a>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed pr-8">Líderes em injeção e metalização de plásticos, comprometidos com a inovação, qualidade e sustentabilidade em cada projeto.</p>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-bold mb-4 uppercase tracking-wider text-neutral-400">Menu</h4>
                        <ul className="space-y-3 text-neutral-200">
                            <li><a href="#produtos" className="hover:text-yellow-400 transition-colors">Produtos</a></li>
                            <li><a href="#servicos" className="hover:text-yellow-400 transition-colors">Serviços</a></li>
                            <li><a href="#catalogo" className="hover:text-yellow-400 transition-colors">Catálogo</a></li>
                            <li><a href="#sobre" className="hover:text-yellow-400 transition-colors">Sobre Nós</a></li>
                        </ul>
                    </div>

                     <div className="md:col-span-3">
                        <h4 className="font-bold mb-4 uppercase tracking-wider text-neutral-400">Fale Connosco</h4>
                        <div className="text-neutral-200 space-y-3">
                            <p>+351 253 695 164</p>
                            <p>geral@bueso.pt</p>
                             <button onClick={onContactClick} className="pt-2 font-bold text-yellow-400 hover:text-yellow-300 transition-colors">Enviar Mensagem →</button>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="font-bold mb-4 uppercase tracking-wider text-neutral-400">Onde Estamos</h4>
                        <div className="text-neutral-200 space-y-3">
                            <p>R. António Alberto de Sousa 38 Pav.2, Ferreiros, 4705-133 Braga</p>
                            <a 
                                href="https://maps.app.goo.gl/W6dFJ3HSi5VnE1K26"
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block pt-2 font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
                            >
                                Ver no Mapa →
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 mb-8 border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-neutral-500 text-xs">
                    <p className="mb-4 sm:mb-0">&copy; 2026 Plásticos Bueso. Todos os direitos reservados.</p>
                     <div className="flex items-center space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                        <button onClick={onAdminClick} className="hover:text-white transition-colors">Gestão</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;