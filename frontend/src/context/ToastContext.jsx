import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkCircle, IoCloseCircle, IoAlertCircle, IoInformationCircle } from 'react-icons/io5';
import { cn } from '../utils/cn';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const icons = {
        success: <IoCheckmarkCircle className="w-6 h-6 text-emerald-500" />,
        error: <IoCloseCircle className="w-6 h-6 text-rose-500" />,
        warning: <IoAlertCircle className="w-6 h-6 text-amber-500" />,
        info: <IoInformationCircle className="w-6 h-6 text-blue-500" />,
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className={cn(
                                "flex items-center gap-3 p-4 bg-white rounded-2xl shadow-soft-lg border border-slate-100 min-w-[300px] pointer-events-auto"
                            )}
                        >
                            {icons[toast.type]}
                            <p className="flex-1 text-sm font-medium text-slate-700">{toast.message}</p>
                            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600">
                                <IoCloseCircle className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
