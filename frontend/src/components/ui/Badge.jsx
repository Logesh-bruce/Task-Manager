import React from 'react';
import { cn } from '../../utils/cn';

const Badge = ({ children, variant = 'info', className }) => {
    const variants = {
        info: 'bg-blue-50 text-blue-600 border-blue-100',
        success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        warning: 'bg-amber-50 text-amber-600 border-amber-100',
        error: 'bg-rose-50 text-rose-600 border-rose-100',
    };

    return (
        <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-all duration-200",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
};

export default Badge;
