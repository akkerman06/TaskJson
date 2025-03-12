// DeleteModal.tsx
import React, { ReactNode, useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    children?: ReactNode;
}

const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose, children, onDelete }) => {
    // отключает скролл если модальное окно открыто
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 
                ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
        >
            <div
                className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500
                    ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            <div
                className={`relative w-full max-w-md bg-white rounded-2xl p-6 shadow-xl transform transition-all duration-500
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-bold text-center">Вы уверены что хотите удалить семинар?</h2>
                    <div className="flex flex-col gap-2">
                        {children}
                    </div>
                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-4 rounded-lg transition-colors duration-200"
                            onClick={onClose}
                        >
                            Отмена
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                            onClick={onDelete}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;