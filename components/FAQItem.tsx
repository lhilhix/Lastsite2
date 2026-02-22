import React from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    return (
        <details className="group bg-white border border-gray-200 p-4 cursor-pointer">
            <summary className="flex justify-between items-center font-semibold list-none">
                {question}
                <span className="transition-transform duration-300 group-open:rotate-45 text-xl font-light">
                    +
                </span>
            </summary>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {answer}
            </p>
        </details>
    );
};

export default FAQItem;