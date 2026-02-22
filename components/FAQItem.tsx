import React from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    return (
        <details className="group bg-white border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:border-yellow-400/80 open:bg-yellow-400/5 open:border-yellow-400/80">
            <summary className="flex justify-between items-center font-bold list-none text-zinc-800">
                {question}
                <span className="transition-transform duration-300 group-open:rotate-45 text-2xl font-light text-zinc-500">
                    +
                </span>
            </summary>
            <div className="overflow-hidden max-h-0 group-open:max-h-screen transition-all duration-500 ease-in-out">
                 <p className="mt-4 text-zinc-600 text-sm leading-relaxed">
                    {answer}
                </p>
            </div>
        </details>
    );
};

export default FAQItem;