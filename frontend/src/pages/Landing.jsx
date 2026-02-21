import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { IoRocketOutline, IoShieldCheckmarkOutline, IoTimeOutline } from 'react-icons/io5';

const Landing = () => {
    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/30">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-100/40 rounded-full blur-[100px]" />
            </div>

            <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                        <IoRocketOutline className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-800 tracking-tight">Task Manager</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
                    <a href="#" className="hover:text-primary transition-colors">Features</a>
                    <a href="#" className="hover:text-primary transition-colors">Pricing</a>
                    <a href="#" className="hover:text-primary transition-colors">Contact</a>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/login">
                        <Button variant="ghost">Login</Button>
                    </Link>
                    <Link to="/login">
                        <Button className="shadow-primary/20">Get Started</Button>
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold text-primary bg-primary/10 rounded-full">
                            The Next Generation of Task Management
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
                            Organize your work <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                                effortlessly with Task Manager.
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Streamline your workflow, collaborate with teammates, and hit your deadlines with our premium task management system designed for high-performance squads.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/login">
                                <Button size="lg" className="w-full sm:w-auto h-16 px-10 shadow-xl shadow-primary/20">
                                    Start for Free
                                </Button>
                            </Link>
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto h-16 px-10">
                                View Demo
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-20 relative mx-auto max-w-5xl"
                    >
                        <div className="rounded-3xl border border-white/40 bg-white/20 backdrop-blur-xl p-4 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2000&auto=format&fit=crop"
                                alt="Dashboard Preview"
                                className="rounded-2xl w-full h-auto shadow-sm"
                            />
                        </div>
                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-10 -right-10 hidden lg:block"
                        >
                            <div className="glass p-4 rounded-2xl shadow-xl flex items-center gap-4 border-emerald-100">
                                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                                    <IoShieldCheckmarkOutline className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Task Completed</p>
                                    <p className="text-xs text-slate-400">Project Alpha success!</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <section className="mt-32 grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <IoRocketOutline />,
                            title: "Lightning Fast",
                            desc: "Engineered for speed with the latest web technologies."
                        },
                        {
                            icon: <IoTimeOutline />,
                            title: "Smart Tracking",
                            desc: "Never miss a deadline with automated reminders and smart prioritization."
                        },
                        {
                            icon: <IoShieldCheckmarkOutline />,
                            title: "Bank-Grade Security",
                            desc: "Your data is encrypted and secure with our production-ready infrastructure."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ translateY: -8 }}
                            className="p-8 rounded-3xl bg-white border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all"
                        >
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary text-2xl mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </section>
            </main>

            <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100/50 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-sm">
                <p>© 2026 Task Manager. Built with passion for excellence.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
