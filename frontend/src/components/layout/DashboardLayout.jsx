import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
    IoGridOutline,
    IoListOutline,
    IoCheckmarkDoneOutline,
    IoTimeOutline,
    IoLogOutOutline,
    IoRocketOutline,
    IoMenuOutline,
    IoCloseOutline,
    IoNotificationsOutline,
    IoSearchOutline
} from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <IoGridOutline />, path: '/dashboard' },
        { id: 'all', label: 'All Tasks', icon: <IoListOutline />, path: '/dashboard/all' },
        { id: 'pending', label: 'Pending', icon: <IoTimeOutline />, path: '/dashboard/pending' },
        { id: 'completed', label: 'Completed', icon: <IoCheckmarkDoneOutline />, path: '/dashboard/completed' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={{ x: isOpen ? 0 : -300 }}
                className={cn(
                    "fixed top-0 left-0 h-full w-[280px] bg-white border-r border-slate-100 z-50 lg:translate-x-0 transition-all duration-300",
                    !isOpen && "lg:w-[280px]" // On desktop it stays open by default
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="p-8 flex items-center justify-between">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                                <IoRocketOutline className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-black text-slate-800 tracking-tight">Task Manager</span>
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 lg:hidden"
                        >
                            <IoCloseOutline className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 space-y-2 mt-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all duration-200",
                                    location.pathname === item.path
                                        ? "bg-primary/10 text-primary shadow-sm"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                )}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* User Section (Bottom) */}
                    <div className="p-6 border-t border-slate-100">
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-slate-500 font-semibold hover:bg-rose-50 hover:text-rose-600 transition-all"
                        >
                            <IoLogOutOutline className="w-6 h-6" />
                            Logout
                        </button>
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

const Navbar = ({ onMenuClick }) => {
    const { user } = useAuth();

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 px-6 lg:px-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 lg:hidden"
                >
                    <IoMenuOutline className="w-7 h-7" />
                </button>
                <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 w-64 lg:w-96">
                    <IoSearchOutline className="text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="bg-transparent border-none outline-none text-sm w-full text-slate-600"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                    <IoNotificationsOutline className="w-6 h-6" />
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-800">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-400">{user?.email || 'user@example.com'}</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                        {user?.name?.[0] || 'U'}
                    </div>
                </div>
            </div>
        </header>
    );
};

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col lg:pl-[280px]">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="p-6 lg:p-10 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
