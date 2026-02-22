import React, { useState } from 'react';

interface ContactFormProps {
    onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Obrigado pelo seu contacto! A nossa equipa responderá em breve.');
                onClose();
            } else {
                alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Ocorreu um erro de rede. Por favor, verifique a sua ligação.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2 text-black">Fale Connosco</h2>
            <p className="text-gray-600 mb-6 text-sm">Preencha o formulário e a nossa equipa técnica entrará em contacto.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="text-xs font-semibold uppercase text-gray-500">Nome</label>
                    <input type="text" id="name" name="name" required className="w-full bg-white border border-gray-300 rounded-none mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div>
                    <label htmlFor="email" className="text-xs font-semibold uppercase text-gray-500">Email</label>
                    <input type="email" id="email" name="email" required className="w-full bg-white border border-gray-300 rounded-none mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div>
                    <label htmlFor="subject" className="text-xs font-semibold uppercase text-gray-500">Assunto</label>
                    <input type="text" id="subject" name="subject" required className="w-full bg-white border border-gray-300 rounded-none mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div>
                    <label htmlFor="message" className="text-xs font-semibold uppercase text-gray-500">Mensagem</label>
                    <textarea id="message" name="message" rows={4} required className="w-full bg-white border border-gray-300 rounded-none mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
                </div>
                <div>
                    <label htmlFor="attachment" className="text-xs font-semibold uppercase text-gray-500">Anexo (Opcional)</label>
                    <input type="file" id="attachment" name="attachment" className="w-full bg-white border border-gray-300 rounded-none mt-1 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
                <div className="flex justify-end pt-4">
                     <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`px-8 py-3 bg-yellow-400 text-black font-bold text-xs uppercase hover:bg-yellow-500 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'A enviar...' : 'Enviar Pedido'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;