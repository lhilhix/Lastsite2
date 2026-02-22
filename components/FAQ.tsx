import React from 'react';
import FAQItem from './FAQItem';

const faqData = [
    {
        question: "Cromagem vs Metalização: Qual escolher?",
        answer: "A cromagem galvânica oferece maior dureza superficial, enquanto a metalização por vácuo é excelente para estética complexa em plásticos sensíveis."
    },
    {
        question: "Vocês aceitam prototipagem?",
        answer: "Sim, acompanhamos o projeto desde a fase de injeção de teste até à pintura final ou metalização do protótipo."
    },
    {
        question: "Quais os polímeros com que trabalham?",
        answer: "Trabalhamos com uma vasta gama de termoplásticos de engenharia, incluindo ABS, PC, PA6, PA66, PBT, e blends com reforço de fibra de vidro ou carbono."
    },
    {
        question: "Qual o vosso processo de controlo de qualidade?",
        answer: "Implementamos um rigoroso controlo de qualidade em todas as fases, desde a inspeção da matéria-prima até à verificação dimensional e estética do produto final, garantindo a conformidade com as especificações do cliente."
    },
    {
        question: "Oferecem diferentes acabamentos na metalização?",
        answer: "Sim, oferecemos uma variedade de acabamentos, incluindo cromo brilhante, acetinado, escovado e outras cores metalizadas sob consulta para ir de encontro às necessidades estéticas do seu projeto."
    },
    {
        question: "Qual o tempo de entrega para um novo projeto?",
        answer: "O tempo de entrega varia com a complexidade do molde e do projeto. Após a análise inicial, fornecemos uma estimativa detalhada, mantendo sempre o cliente informado sobre o progresso."
    }
];

const FAQ: React.FC = () => {
    return (
        <section id="faq" className="py-24 bg-neutral-100">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-center text-2xl font-bold uppercase tracking-wider mb-12">Questões Recentes</h2>
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;