import React from 'react';

interface FooterProps {
    onContactClick: () => void;
    onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick, onAdminClick }) => {
    return (
        <footer id="contacto" className="bg-white pt-16 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                    <div className="col-span-1 md:col-span-1">
                        <h4 className="font-bold mb-4 uppercase">Quem Somos</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><a href="#sobre" className="hover:underline">A Empresa</a></li>
                            <li><a href="#ambiente" className="hover:underline">Sustentabilidade</a></li>
                        </ul>
                        <div className="mt-8">
                            <button 
                                onClick={onContactClick}
                                className="bg-yellow-400 text-black px-6 py-3 text-xs uppercase font-bold tracking-widest hover:bg-yellow-500 transition shadow-md"
                            >
                                Contacte-nos
                            </button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 uppercase">Apoio ao Cliente</h4>
                        <ul className="space-y-2 text-gray-600">
                             <li><button onClick={onContactClick} className="hover:underline text-left">Contacto</button></li>
                             <li><a href="#faq" className="hover:underline">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-bold mb-4 uppercase">Contactos</h4>
                        <div className="text-gray-600 space-y-2">
                            <p>+351 253 695 164</p>
                            <p>geral@bueso.pt</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 uppercase">Onde Estamos</h4>
                        <div className="text-gray-600 space-y-2">
                            <p>R. António Alberto de Sousa 38 Pav.2, Ferreiros, 4705-133 Braga</p>
                            <p>Pav 32, 4700 Braga,Ferreiros, 4705-133 Braga, Portugal</p>
                            <a 
                                href="https://maps.app.goo.gl/W6dFJ3HSi5VnE1K26"
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Ver no Mapa
                            </a>
                        </div>
                    </div>
                </div>

                <div className="my-16">
                    <div className="bg-gray-200 border border-gray-300 overflow-hidden h-80 md:h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11944.911751001204!2d-8.4074581!3d41.5426617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-PT!2spt!4v1771622271249!5m2!1spt-PT!2spt"
                            className="w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização da Plásticos Bueso no Google Maps"
                        ></iframe>
                    </div>
                </div>

                <div className="pb-8 border-t border-gray-200 pt-8 text-center text-gray-500 text-xs">
                    <p className="mb-4">&copy; 2026 Plásticos Bueso. Todos os direitos reservados.</p>
                     <div className="flex justify-center space-x-6">
                        <a href="#" className="hover:underline">Política de Privacidade</a>
                        <a href="#" className="hover:underline">Termos de Uso</a>
                        <button onClick={onAdminClick} className="hover:underline">Gestão</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;