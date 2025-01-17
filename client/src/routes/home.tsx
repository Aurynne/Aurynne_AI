import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import Chat from "@/components/chat";

type ModalType = "documentation" | "terminal" | "chat" | null;

export default function Home() {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const handleModalClose = () => {
        setActiveModal(null);
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
                onClose={handleModalClose}
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
                onClose={handleModalClose}
                title="Chat with Aurynne"
                position="right"
                width="w-1/3"
            >
                <div className="h-full">
                    <Chat agentId="17d73110-9977-0791-8a9a-04cf14457bdc" />
                </div>
            </Modal>
        </div>
    );
}