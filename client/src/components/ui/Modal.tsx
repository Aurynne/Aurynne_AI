import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from './avatar';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    position?: 'center' | 'left' | 'right' | 'bottom';
    width?: string;
    height?: string;
    showAvatar?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    children,
    title,
    position = 'center',
    width = 'w-full max-w-lg',
    height = 'h-auto',
    showAvatar = false,
}: ModalProps) {
    if (!isOpen) return null;

    const positionClasses = {
        center: 'items-center justify-center',
        left: 'items-stretch justify-start',
        right: 'items-stretch justify-end',
        bottom: 'items-end justify-center',
    };

    const modalClasses = {
        center: 'rounded-lg',
        left: 'h-full rounded-r-lg',
        right: 'h-full rounded-l-lg',
        bottom: 'w-full rounded-t-lg',
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 flex p-4"
            style={{ backdropFilter: 'blur(4px)' }}
            onClick={onClose}
        >
            <div
                className={cn(
                    'fixed inset-0 flex',
                    positionClasses[position]
                )}
            >
                <div
                    className={cn(
                        'bg-card border shadow-lg overflow-hidden',
                        modalClasses[position],
                        width,
                        height
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {title && (
                        <div className="flex items-center justify-between border-b px-4 py-3">
                            <div className="flex items-center gap-2">
                                {showAvatar && (
                                    <Avatar className="size-12 border-2 rounded-full select-none overflow-hidden">
                                        <AvatarImage src="/profile-pic.png" />
                                    </Avatar>
                                )}
                                <h2 className="text-lg font-semibold">{title}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className="overflow-auto">{children}</div>
                </div>
            </div>
        </div>
    );
}