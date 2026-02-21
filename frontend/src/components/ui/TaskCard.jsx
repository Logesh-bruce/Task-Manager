import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    IoCalendarOutline,
    IoTimeOutline,
    IoCreateOutline,
    IoTrashOutline,
    IoEllipsisVertical
} from 'react-icons/io5';
import { cn } from '../../utils/cn';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const TaskCard = ({ task, onEdit, onDelete }) => {
    const priorityColors = {
        high: 'error',
        medium: 'warning',
        low: 'success',
    };

    return (
        <Card className="group relative">
            <div className="flex justify-between items-start mb-4">
                <Badge variant={priorityColors[task.priority?.toLowerCase() || 'low']} className="capitalize">
                    {task.priority || 'Low'}
                </Badge>
                <div className="flex gap-1">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-primary transition-all"
                    >
                        <IoCreateOutline className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                    >
                        <IoTrashOutline className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                {task.title}
            </h3>
            <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                {task.description}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2 text-slate-400">
                    <IoCalendarOutline className="w-4 h-4" />
                    <span className="text-xs font-semibold">{task.dueDate}</span>
                </div>
                <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                    task.status === 'completed' ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                )}>
                    {task.status}
                </div>
            </div>
        </Card>
    );
};

export default TaskCard;
