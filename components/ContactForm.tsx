import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

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
        <div className="bg-white text-black p-6 sm:p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-3xl font-bold mb-2 text-black tracking-tighter">Fale Connosco</h2>
            <p className="text-neutral-500 mb-8 text-sm">Preencha o formulário e a nossa equipa técnica entrará em contacto.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="name" className="block text-xs font-semibold uppercase text-neutral-500 mb-2">Nome</label>
                        <input type="text" id="name" name="name" required className="w-full bg-white border border-neutral-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold uppercase text-neutral-500 mb-2">Email</label>
                        <input type="email" id="email" name="email" required className="w-full bg-white border border-neutral-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
                    </div>
                </div>
                <div>
                    <label htmlFor="subject" className="block text-xs font-semibold uppercase text-neutral-500 mb-2">Assunto</label>
                    <input type="text" id="subject" name="subject" required className="w-full bg-white border border-neutral-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-xs font-semibold uppercase text-neutral-500 mb-2">Mensagem</label>
                    <textarea id="message" name="message" rows={4} required className="w-full bg-white border border-neutral-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"></textarea>
                </div>
                <div>
                    <label htmlFor="attachment" className="block text-xs font-semibold uppercase text-neutral-500 mb-2">Anexo (Opcional)</label>
                    <input type="file" id="attachment" name="attachment" className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 transition" />
                </div>
                <div className="flex justify-end pt-4">
                     <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-yellow-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-yellow-500 transition rounded-md shadow-lg hover:shadow-yellow-400/20 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <><Loader2 className="animate-spin h-4 w-4" />A enviar...</>
                        ) : (
                            <>Enviar Pedido<Send size={14} /></>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;