import React, { useState } from 'react';
import { Eye, EyeOff, Volume2, User, Lock } from 'lucide-react';

interface LoginProps {
    fontSize: number;
    lineSpacing: number;
    onLogin: (username: string, password: string) => void;
    onNavigateToRegister: () => void;
    onSpeakText: (text: string) => void;
}

interface LoginForm {
    username: string;
    password: string;
}

interface FormErrors {
    username: string;
    password: string;
}

export const Login: React.FC<LoginProps> = ({
    fontSize,
    lineSpacing,
    onLogin,
    onNavigateToRegister,
    onSpeakText,
}) => {
    const [form, setForm] = useState<LoginForm>({
        username: '',
        password: '',
    });
    
    const [errors, setErrors] = useState<FormErrors>({
        username: '',
        password: '',
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            username: '',
            password: '',
        };

        if (!form.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (form.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return !newErrors.username && !newErrors.password;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            onSpeakText('Please correct the errors in the form');
            return;
        }

        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            onLogin(form.username, form.password);
            setIsLoading(false);
        }, 1000);
    };

    const handleInputChange = (field: keyof LoginForm, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const welcomeText = "Welcome to Algebraic Concepts - your dyslexia-friendly learning platform";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 
                        style={{ fontSize: `${fontSize + 6}px`, lineHeight: lineSpacing }}
                        className="font-bold text-gray-800 mb-2"
                    >
                        Welcome Back! 🎯
                    </h1>
                    <p 
                        style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                        className="text-gray-600 mb-4"
                    >
                        Sign in to continue your algebra journey
                    </p>
                    
                    <button
                        onClick={() => onSpeakText(welcomeText)}
                        className="mb-4 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-blue-300 mx-auto"
                        aria-label="Listen to welcome message"
                    >
                        <Volume2 size={16} />
                        <span style={{ fontSize: `${fontSize - 4}px` }}>Listen</span>
                    </button>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <div>
                        <label 
                            htmlFor="username"
                            style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                            className="block text-gray-700 font-medium mb-2"
                        >
                            <User size={18} className="inline mr-2" />
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={form.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            className={`w-full px-4 py-3 border-2 rounded-xl transition-colors focus:outline-none focus:ring-4 ${
                                errors.username 
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                            }`}
                            style={{ fontSize: `${fontSize}px` }}
                            placeholder="Enter your username"
                            aria-describedby={errors.username ? 'username-error' : undefined}
                            disabled={isLoading}
                        />
                        {errors.username && (
                            <p 
                                id="username-error"
                                style={{ fontSize: `${fontSize - 4}px` }}
                                className="text-red-600 mt-2"
                                role="alert"
                            >
                                {errors.username}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label 
                            htmlFor="password"
                            style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                            className="block text-gray-700 font-medium mb-2"
                        >
                            <Lock size={18} className="inline mr-2" />
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-colors focus:outline-none focus:ring-4 ${
                                    errors.password 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                                }`}
                                style={{ fontSize: `${fontSize}px` }}
                                placeholder="Enter your password"
                                aria-describedby={errors.password ? 'password-error' : undefined}
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p 
                                id="password-error"
                                style={{ fontSize: `${fontSize - 4}px` }}
                                className="text-red-600 mt-2"
                                role="alert"
                            >
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 px-6 rounded-xl font-medium transition-colors focus:ring-4 focus:ring-blue-200 ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                {/* Register Link */}
                <div className="mt-6 text-center">
                    <p 
                        style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                        className="text-gray-600"
                    >
                        Don't have an account?{' '}
                        <button
                            onClick={onNavigateToRegister}
                            className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                            style={{ fontSize: `${fontSize - 2}px` }}
                        >
                            Sign up here
                        </button>
                    </p>
                </div>

                {/* Demo Login */}
                <div className="mt-4">
                    <button
                        onClick={() => onLogin('demo', 'password')}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-medium transition-colors focus:ring-4 focus:ring-gray-200"
                        style={{ fontSize: `${fontSize - 2}px` }}
                        disabled={isLoading}
                    >
                        Quick Demo Login
                    </button>
                </div>

                {/* Accessibility Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p 
                        style={{ fontSize: `${fontSize - 4}px`, lineHeight: lineSpacing }}
                        className="text-blue-800 text-center"
                    >
                        🧠 Designed for learners with dyslexia<br />
                        ⌨️ Full keyboard navigation support<br />
                        🔊 Audio assistance available
                    </p>
                </div>
            </div>
        </div>
    );
};