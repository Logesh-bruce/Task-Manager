import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { IoRocketOutline, IoMailOutline, IoLockClosedOutline, IoPersonOutline } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
            login({ name: 'Logesh', email: 'logesh@example.com' });
            showToast(isLogin ? 'Welcome back!' : 'Account created successfully!');
            setLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <IoRocketOutline className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-black text-slate-800 tracking-tight">Task Manager</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        {isLogin ? 'Welcome Back!' : 'Create an Account'}
                    </h2>
                    <p className="text-slate-500">
                        {isLogin ? 'Sign in to manage your tasks' : 'Join thousands of productive teams'}
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-soft-lg border border-white/50">
                    <form onSubmit={handleSubmit} className="space-y-2">
                        {!isLogin && (
                            <Input
                                id="name"
                                label="Full Name"
                                type="text"
                                required
                                icon={<IoPersonOutline />}
                            />
                        )}
                        <Input
                            id="email"
                            label="Email Address"
                            type="email"
                            required
                            icon={<IoMailOutline />}
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            required
                            icon={<IoLockClosedOutline />}
                        />

                        <Button
                            type="submit"
                            loading={loading}
                            className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 mt-4"
                        >
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-slate-500">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-2 font-bold text-primary hover:underline transition-all"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
