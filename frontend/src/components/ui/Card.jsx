import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const Card = ({ children, className, onClick, noPadding = false }) => {
    return (
        <motion.div
            whileHover={onClick ? { scale: 1.01, translateY: -2 } : {}}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            className={cn(
                "rounded-3xl bg-white shadow-soft transition-shadow hover:shadow-soft-lg border border-slate-100/50 overflow-hidden",
                !noPadding && "p-6",
                onClick && "cursor-pointer",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export default Card;
