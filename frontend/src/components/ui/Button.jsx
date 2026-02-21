import React from 'react';
import { cn } from '../../utils/cn';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    loading = false,
    disabled = false,
    ...props
}) => {
    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-lg active:scale-[0.98]',
        secondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50',
        outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5',
        ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg font-semibold',
    };

    return (
        <button
            className={cn(
                'relative inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? (
                <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </span>
            ) : children}
        </button>
    );
};

export default Button;
