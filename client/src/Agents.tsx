import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAgentsQuery } from "@/api";
import { Modal } from "@/components/ui/Modal";
import { useState, useRef, useEffect } from "react";
import { useSendMessageMutation } from "@/api";
import type { TextResponse } from "@/api";
import "./App.css";

type ModalType = "documentation" | "terminal" | "chat" | null;

function Agents() {
    const { data: agents } = useGetAgentsQuery();
    const defaultAgent = agents?.[0];
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<TextResponse[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { mutate: sendMessage, isPending } = useSendMessageMutation({ setMessages, setSelectedFile });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleModalClose = () => {
        setActiveModal(null);
        setMessages([]);
        setInput("");
        setSelectedFile(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((!input.trim() && !selectedFile) || !defaultAgent?.id) return;

        const userMessage: TextResponse = {
            text: input,
            user: "user",
            attachments: selectedFile ? [{ url: URL.createObjectURL(selectedFile), contentType: selectedFile.type, title: selectedFile.name }] : undefined,
        };
        setMessages((prev) => [...prev, userMessage]);

        sendMessage({ text: input, agentId: defaultAgent.id, selectedFile });
        setInput("");
    };

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="text-center mb-16">
                <h1 className="text-6xl font-bold mb-10 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-transparent bg-clip-text">
                    Aurynne AI
                </h1>
                <h2 className="text-gray-400/80 text-xs mb-1">Contract Address</h2>
                <div className="text-gray-400/90 font-mono text-sm">
                    XxXxXxXxXx3Xx8XxXxXx4XxXxXxXxXx8XxXxXxXxXx7Xxpump
                </div>
            </div>

            <div className="flex gap-6 justify-center">
                <Button
                    className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 min-w-[160px] shadow-lg shadow-purple-500/20"
                    onClick={() => setActiveModal("documentation")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Documentation
                </Button>

                <Button
                    className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 min-w-[160px] shadow-lg shadow-purple-500/20"
                    onClick={() => setActiveModal("terminal")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Open Terminal
                </Button>

                <Button
                    className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 min-w-[160px] shadow-lg shadow-purple-500/20"
                    onClick={() => setActiveModal("chat")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Chat with Aurynne
                </Button>
            </div>

            <div className="flex gap-4 justify-center mt-8">
                <Button
                    className="bg-purple-500/80 hover:bg-purple-600 text-white px-6 py-2 rounded-xl flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 shadow-lg shadow-purple-500/20"
                    onClick={() => window.open('https://x.com/Aurynne_AI', '_blank')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Twitter
                </Button>

                <Button
                    className="bg-purple-500/80 hover:bg-purple-600 text-white px-6 py-2 rounded-xl flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 shadow-lg shadow-purple-500/20"
                    onClick={() => window.open('https://github.com/Aurynne/Aurynne_AI', '_blank')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                </Button>
            </div>

            <Modal
                isOpen={activeModal === "documentation"}
                onClose={handleModalClose}
                title="Documentation"
                position="left"
                width="w-1/4"
            >
                <div className="text-gray-300 p-4">
                    <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
                    <p className="leading-relaxed">
                        Welcome to the AI Assistant documentation. This guide will help you understand how to use the various features available in our interface.
                    </p>
                </div>
            </Modal>

            <Modal
                isOpen={activeModal === "terminal"}
                onClose={() => setActiveModal(null)}
                title="Terminal"
                position="bottom"
                height="h-1/2"
            >
                <div className="bg-[#000000] text-green-500 font-mono border border-gray-800/50">
                    <div className="flex items-center gap-2 px-3 py-1.5 text-gray-400 border-b border-gray-800/50">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500/60 shadow-sm shadow-red-500/10"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 border border-yellow-500/60 shadow-sm shadow-yellow-500/10"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 border border-green-500/60 shadow-sm shadow-green-500/10"></div>
                        </div>
                        <div className="text-xs text-gray-500/90">Terminal</div>
                    </div>
                    <div className="px-4 py-6 min-h-[calc(100vh-40px)] flex flex-col">
                        <div className="text-center mt-6">
                            <div className="text-green-500/90 text-lg font-medium">Welcome to AI Assistant Terminal</div>
                            <div className="text-green-500/90 mt-1.5">Type "help" for available commands.</div>
                        </div>
                        <div className="mt-10 flex items-center gap-2 px-1">
                            <span className="text-purple-400">$</span>
                            <span className="w-2 h-5 bg-green-500 animate-pulse"></span>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={activeModal === "chat"}
                onClose={() => setActiveModal(null)}
                title="Aurynne"
                position="right"
                width="w-1/4"
            >
                <div className="flex flex-col h-full relative">
                    <div className="absolute inset-0 top-0 bottom-14 overflow-y-auto">
                        <div className="space-y-4 p-4 min-h-full bg-[#0a0f1d]/50">
                            {messages.length > 0 ? (
                                <>
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`text-left flex ${
                                                message.user === "user"
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >
                                            {message.user !== "user" ? (
                                                <div className="max-w-[80%] bg-muted/90 rounded-2xl p-3 shadow-lg shadow-purple-500/10">
                                                    <div className="flex items-center gap-2.5 mb-2 border-b border-gray-700/20 pb-1.5">
                                                        <img
                                                            src="/profile pic.png"
                                                            alt="Aurynne"
                                                            className="w-[25px] h-[25px] rounded-full object-cover"
                                                        />
                                                        <span className="text-xs text-gray-400">Aurynne</span>
                                                    </div>
                                                    <pre className="whitespace-pre-wrap break-words px-2 text-[15px] leading-relaxed chat-text max-w-full">
                                                        {message.text}
                                                        {message.attachments?.map((attachment, i) => (
                                                            attachment.contentType.startsWith('image/') && (
                                                                <img
                                                                    key={i}
                                                                    src={attachment.url.startsWith('http')
                                                                        ? attachment.url
                                                                        : `http://localhost:3000/media/generated/${attachment.url.split('/').pop()}`
                                                                    }
                                                                    alt={attachment.title || "Attached image"}
                                                                    className="mt-2 max-w-full rounded-lg"
                                                                />
                                                            )
                                                        ))}
                                                    </pre>
                                                </div>
                                            ) : (
                                                <pre
                                                    className="max-w-[80%] rounded-2xl px-5 py-3 whitespace-pre-wrap break-words bg-purple-500/90 text-white text-[15px] leading-relaxed shadow-lg shadow-purple-500/10 chat-text"
                                                >
                                                    {message.text}
                                                    {message.attachments?.map((attachment, i) => (
                                                        attachment.contentType.startsWith('image/') && (
                                                            <img
                                                                key={i}
                                                                src={attachment.url}
                                                                alt={attachment.title || "Attached image"}
                                                                className="mt-2 max-w-full rounded-lg"
                                                            />
                                                        )
                                                    ))}
                                                </pre>
                                            )}
                                        </div>
                                    ))}
                                    {isPending && (
                                        <div className="flex justify-start">
                                            <div className="max-w-[80%] bg-muted rounded-lg p-2">
                                                <div className="flex items-center gap-2 mb-1 border-b border-gray-700/20 pb-1">
                                                    <img
                                                        src="/profile pic.png"
                                                        alt="Aurynne"
                                                        className="w-[25px] h-[25px] rounded-full object-cover"
                                                    />
                                                    <span className="text-xs text-gray-400">Aurynne</span>
                                                </div>
                                                <div className="px-2 flex gap-1.5">
                                                    <div className="w-2.5 h-2.5 bg-purple-400/70 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                    <div className="w-2.5 h-2.5 bg-purple-400/70 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                    <div className="w-2.5 h-2.5 bg-purple-400/70 rounded-full animate-bounce"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center text-muted-foreground chat-text">
                                    No messages yet. Start a conversation!
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-14 min-h-[56px] border-t border-gray-800/30 bg-[#0f1729] flex items-center px-4">
                        <form onSubmit={handleSubmit} className="flex gap-2 w-full items-center">
                            <div className="flex-1 relative">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="w-full bg-[#0f1729] border-gray-800/30 focus:border-purple-500/50 focus:ring-purple-500/20 placeholder:text-gray-500 overflow-hidden whitespace-nowrap h-10"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }
                                    }}
                                    disabled={isPending}
                                />
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    onClick={handleFileSelect}
                                    className="bg-[#9333ea] hover:bg-[#7e22ce] text-white shadow-sm shadow-purple-500/20 w-10 h-10 p-0"
                                    disabled={isPending}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="bg-[#9333ea] hover:bg-[#7e22ce] text-white shadow-sm shadow-purple-500/20 w-10 h-10 p-0"
                                >
                                    {isPending ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    )}
                                </Button>
                            </div>
                        </form>
                        {selectedFile && (
                            <div className="mt-2 text-sm text-muted-foreground">
                                Selected file: {selectedFile.name}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Agents;