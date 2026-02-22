import React from 'react';
import { Recycle, Zap, Repeat } from 'lucide-react';

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-zinc-800 p-8 border border-zinc-700 hover:border-yellow-400/50 transition-colors flex flex-col items-start text-left">
        <div className="text-yellow-400 mb-4">{icon}</div>
        <h4 className="font-bold text-white mb-3 text-lg">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{children}</p>
    </div>
);


const Environment: React.FC = () => {
    return (
        <section id="ambiente" className="py-24 bg-zinc-900 text-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto mb-16">
                    <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2 block">Sustentabilidade</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Compromisso Ambiental</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Acreditamos numa indústria que inova de forma responsável. A sustentabilidade está no centro da nossa operação, desde a escolha de materiais à otimização dos nossos processos produtivos.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <InfoCard icon={<Recycle size={32} />} title="Materiais Reciclados">
                        Sempre que o projeto permite, especialmente em componentes não visíveis, utilizamos polímeros reciclados de alta qualidade (rPP, rABS, rPC). Garantimos que as propriedades mecânicas e a durabilidade cumprem os mais rigorosos padrões.
                    </InfoCard>
                    <InfoCard icon={<Zap size={32} />} title="Eficiência Energética">
                        As nossas máquinas de injeção são de última geração, otimizadas para um baixo consumo energético. Monitorizamos o processo em tempo real para minimizar o desperdício de matéria-prima e garantir que cada ciclo é o mais eficiente possível.
                    </InfoCard>
                    <InfoCard icon={<Repeat size={32} />} title="Economia Circular">
                        Colaboramos com os nossos clientes desde a fase de concepção para desenvolver peças mais leves, duráveis e, sempre que possível, recicláveis. O nosso objetivo é prolongar o ciclo de vida dos produtos e facilitar a sua reintegração na cadeia de valor.
                    </InfoCard>
                </div>
            </div>
        </section>
    );
};

export default Environment;