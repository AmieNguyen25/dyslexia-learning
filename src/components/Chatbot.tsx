import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, Volume2 } from 'lucide-react';

interface ChatbotProps {
    onClose: () => void;
    fontSize: number;
    characterSpacing?: number;
    onSpeakText?: (text: string) => void;
}

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: Date;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onClose, fontSize, characterSpacing = 0, onSpeakText }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'ai',
            text: "Hello! I'm your AI learning assistant. I'm here to help you with math questions, explain concepts, or provide study tips. How can I assist you today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Focus input when chatbot opens
        inputRef.current?.focus();
    }, []);

    const generateId = () => Math.random().toString(36).substr(2, 9);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: generateId(),
            sender: 'user',
            text: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // Import the OpenAI service
            const { getChatResponse } = await import('../services/openaiService');

            const aiResponse = await getChatResponse(currentInput, messages);

            const aiMessage: Message = {
                id: generateId(),
                sender: 'ai',
                text: aiResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error('Chatbot error:', error);
            const errorMessage: Message = {
                id: generateId(),
                sender: 'ai',
                text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. In the meantime, feel free to review your course materials or practice problems!",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed inset-0 md:bottom-8 md:right-8 md:inset-auto md:w-96 md:h-[70vh] bg-white md:rounded-2xl shadow-2xl flex flex-col z-50 md:max-w-md">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white md:rounded-t-2xl">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white bg-opacity-20 rounded-full">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold" style={{ fontSize: `${fontSize}px`, letterSpacing: `${characterSpacing}px` }}>
                            AI Learning Assistant
                        </h3>
                        <p className="text-xs opacity-80">Always here to help</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    aria-label="Close chat"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-start space-x-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'ai' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                }`}>
                                {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
                            </div>

                            {/* Message bubble */}
                            <div className="flex flex-col">
                                <div className="relative">
                                    <div
                                        style={{ fontSize: `${fontSize - 1}px`, letterSpacing: `${characterSpacing}px` }}
                                        className={`p-3 rounded-2xl shadow-sm ${msg.sender === 'ai'
                                            ? 'bg-white text-gray-800 rounded-tl-md pr-10'
                                            : 'bg-blue-500 text-white rounded-tr-md'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                    {/* Sound button for AI messages */}
                                    {msg.sender === 'ai' && onSpeakText && (
                                        <button
                                            onClick={() => onSpeakText(msg.text)}
                                            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                                            aria-label="Read message aloud"
                                        >
                                            <Volume2 size={14} className="text-gray-500" />
                                        </button>
                                    )}
                                </div>
                                <span className={`text-xs text-gray-500 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                    {formatTime(msg.timestamp)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-start space-x-2">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <Bot size={16} />
                            </div>
                            <div className="bg-white p-3 rounded-2xl rounded-tl-md shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <Loader2 size={16} className="animate-spin text-blue-500" />
                                    <span className="text-gray-600 text-sm">Thinking...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white md:rounded-b-2xl">
                <div className="flex items-center space-x-3">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about math..."
                        className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-colors"
                        style={{ fontSize: `${fontSize - 1}px`, letterSpacing: `${characterSpacing}px` }}
                        disabled={isLoading}
                        maxLength={500}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:ring-2 focus:ring-blue-400"
                        aria-label="Send message"
                    >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                    </button>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                    Press Enter to send • {input.length}/500 characters
                </div>
            </form>
        </div>
    );
};