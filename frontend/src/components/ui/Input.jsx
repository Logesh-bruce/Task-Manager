import React, { useState } from 'react';
import { cn } from '../../utils/cn';

const Input = ({ label, error, className, id, ...props }) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setFocused(true);
    const handleBlur = (e) => {
        setFocused(false);
        setHasValue(e.target.value.length > 0);
    };

    return (
        <div className="relative w-full mb-4">
            <div className={cn(
                "relative rounded-2xl border bg-white transition-all duration-300",
                focused ? "border-primary ring-4 ring-primary/10" : "border-slate-200",
                error ? "border-red-500" : ""
            )}>
                <input
                    id={id}
                    className={cn(
                        "block w-full px-4 py-4 bg-transparent outline-none text-slate-700 placeholder:transparent",
                        className
                    )}
                    placeholder={label}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setHasValue(e.target.value.length > 0)}
                    {...props}
                />
                <label
                    htmlFor={id}
                    className={cn(
                        "absolute left-4 transition-all duration-300 pointer-events-none text-slate-400",
                        (focused || hasValue)
                            ? "top-1 text-xs text-primary"
                            : "top-4 text-base"
                    )}
                >
                    {label}
                </label>
            </div>
            {error && <p className="mt-1 text-xs text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{error}</p>}
        </div>
    );
};

export default Input;
