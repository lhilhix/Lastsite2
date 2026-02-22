import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, X, MessageSquare } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatInterfaceProps {
    onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434/api/chat');
    const [model, setModel] = useState('llama3');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(ollamaUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: model,
                    messages: [...messages, userMessage],
                    stream: false,
                }),
            });

            if (!response.ok) {
                throw new Error('Falha ao comunicar com Ollama. Verifique se o serviço está a correr e o URL está correto.');
            }

            const data = await response.json();
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.message?.content || data.response || 'Sem resposta do modelo.',
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error: any) {
            console.error('Ollama Error:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: `Erro: ${error.message}. Certifique-se que o Ollama está instalado e a correr com CORS permitido (OLLAMA_ORIGINS="*").` 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl bg-white overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-2">
                    <div className="bg-black p-1.5 rounded-lg">
                        <Bot className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider">Assistente Bueso (Ollama)</h3>
                        <p className="text-[10px] text-gray-500">Modelo: {model}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setMessages([])} 
                        className="text-[10px] font-bold uppercase text-gray-400 hover:text-red-500 transition mr-2"
                        title="Limpar conversa"
                    >
                        Limpar
                    </button>
                    <button onClick={onClose} className="text-gray-400 hover:text-black transition">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Settings (Collapsible or small) */}
            <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50 flex gap-4 items-center">
                <div className="flex-1">
                    <label className="text-[9px] font-bold uppercase text-gray-400">Endpoint</label>
                    <input 
                        type="text" 
                        value={ollamaUrl} 
                        onChange={e => setOllamaUrl(e.target.value)}
                        className="w-full text-xs bg-transparent border-none focus:ring-0 p-0 text-gray-600"
                    />
                </div>
                <div className="w-24">
                    <label className="text-[9px] font-bold uppercase text-gray-400">Modelo</label>
                    <input 
                        type="text" 
                        value={model} 
                        onChange={e => setModel(e.target.value)}
                        className="w-full text-xs bg-transparent border-none focus:ring-0 p-0 text-gray-600"
                    />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <MessageSquare className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">Como posso ajudar?</h4>
                        <p className="text-sm text-gray-500 max-w-xs">
                            Coloque as suas questões sobre os nossos produtos, processos de injeção ou metalização.
                        </p>
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                            msg.role === 'user' 
                                ? 'bg-black text-white rounded-tr-none' 
                                : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}>
                            <div className="flex items-center gap-2 mb-1">
                                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                                <span className="text-[10px] font-bold uppercase opacity-50">
                                    {msg.role === 'user' ? 'Você' : 'Assistente'}
                                </span>
                            </div>
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                            <span className="text-xs text-gray-500 italic">O modelo está a processar...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                <div className="relative flex items-center">
                    <input 
                        type="text" 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Escreva a sua mensagem..."
                        className="w-full border border-gray-300 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                        disabled={isLoading}
                    />
                    <button 
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={16} />
                    </button>
                </div>
                <p className="text-[9px] text-center text-gray-400 mt-2 uppercase tracking-widest">
                    Powered by Ollama Local API
                </p>
            </form>
        </div>
    );
};

export default ChatInterface;
