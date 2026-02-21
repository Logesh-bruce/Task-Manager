import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoAdd, IoFilterOutline, IoStatsChartOutline } from 'react-icons/io5';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';
import TaskCard from '../../components/ui/TaskCard';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { useToast } from '../../context/ToastContext';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Build Premium UI', description: 'Design and implement the landing page and dashboard with Framer Motion.', priority: 'High', dueDate: 'Feb 25, 2026', status: 'pending' },
        { id: 2, title: 'Auth Implementation', description: 'Complete the authentication flow with Context API.', priority: 'Medium', dueDate: 'Feb 22, 2026', status: 'completed' },
        { id: 3, title: 'Responsive Design', description: 'Ensure all pages work perfectly on mobile and tablet devices.', priority: 'High', dueDate: 'Feb 24, 2026', status: 'pending' },
        { id: 4, title: 'Polish & Animation', description: 'Add micro-animations and smooth transitions throughout the app.', priority: 'Low', dueDate: 'Feb 28, 2026', status: 'pending' },
    ]);

    const { showToast } = useToast();

    const handleAddTask = (e) => {
        e.preventDefault();
        showToast('Task added successfully!');
        setIsModalOpen(false);
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
        showToast('Task deleted successfully!', 'info');
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 mb-1">My Journey</h1>
                        <p className="text-slate-500 font-medium">Manage your goals and stay productive.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="secondary" className="flex items-center gap-2 h-12">
                            <IoFilterOutline className="w-5 h-5" />
                            Filter
                        </Button>
                        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 h-12 shadow-primary/20">
                            <IoAdd className="w-5 h-5" />
                            Add New Task
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Tasks', value: tasks.length, color: 'primary' },
                        { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: 'emerald-500' },
                        { label: 'Pending', value: tasks.filter(t => t.status === 'pending').length, color: 'amber-500' },
                        { label: 'High Priority', value: tasks.filter(t => t.priority === 'High').length, color: 'rose-500' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-3xl bg-white shadow-soft border border-slate-100 flex items-center justify-between"
                        >
                            <div>
                                <p className="text-sm font-bold text-slate-400 mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-slate-800">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl`}>
                                <IoStatsChartOutline className={`text-${stat.color}`} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Task Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={handleDeleteTask}
                            onEdit={() => setIsModalOpen(true)}
                        />
                    ))}
                </div>

                {tasks.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <IoListOutline className="w-12 h-12 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">No tasks found</h3>
                        <p className="text-slate-500 max-w-sm">
                            Your task list is empty. Start by creating a new task to organize your day.
                        </p>
                    </div>
                )}
            </div>

            {/* Add Task Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Task"
            >
                <form onSubmit={handleAddTask} className="space-y-4">
                    <Input label="Task Title" placeholder="e.g. Design Dashboard" required />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Due Date" type="date" required />
                        <div className="relative">
                            <label className="absolute left-4 top-1 text-xs text-primary font-bold">Priority</label>
                            <select className="w-full h-16 px-4 pt-6 bg-white border border-slate-200 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none text-slate-700 font-medium">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative bg-white border border-slate-200 rounded-2xl p-4 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                        <label className="block text-xs text-primary font-bold mb-1">Description</label>
                        <textarea
                            rows="4"
                            className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400"
                            placeholder="Add more details about this task..."
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button variant="secondary" className="flex-1 h-14" type="button" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button className="flex-1 h-14 font-bold" type="submit">
                            Save Task
                        </Button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default Dashboard;
