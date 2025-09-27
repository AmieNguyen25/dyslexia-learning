import React, { useState } from 'react';
import { Eye, EyeOff, Volume2, User, Lock, Mail, BookOpen } from 'lucide-react';

interface RegisterProps {
    fontSize: number;
    lineSpacing: number;
    onRegister: (userData: RegisterFormData) => void;
    onNavigateToLogin: () => void;
    onSpeakText: (text: string) => void;
}

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    preferredPath: 'visual' | 'auditory';
}

interface FormErrors {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    preferredPath: string;
}

export const Register: React.FC<RegisterProps> = ({
    fontSize,
    lineSpacing,
    onRegister,
    onNavigateToLogin,
    onSpeakText,
}) => {
    const [form, setForm] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        preferredPath: 'visual',
    });
    
    const [errors, setErrors] = useState<FormErrors>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        preferredPath: '',
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            preferredPath: '',
        };

        // Username validation
        if (!form.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (form.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
            newErrors.username = 'Username can only contain letters, numbers, and underscores';
        }

        // Email validation
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(form.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }

        // Confirm password validation
        if (!form.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => !error);
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
            onRegister(form);
            setIsLoading(false);
        }, 1500);
    };

    const handleInputChange = (field: keyof RegisterFormData, value: string | 'visual' | 'auditory') => {
        setForm(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const welcomeText = "Create your account for Algebraic Concepts - a dyslexia-friendly learning platform designed just for you";

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 
                        style={{ fontSize: `${fontSize + 6}px`, lineHeight: lineSpacing }}
                        className="font-bold text-gray-800 mb-2"
                    >
                        Join Our Learning Community! 🚀
                    </h1>
                    <p 
                        style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                        className="text-gray-600 mb-4"
                    >
                        Create your personalized algebra learning account
                    </p>
                    
                    <button
                        onClick={() => onSpeakText(welcomeText)}
                        className="mb-4 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:ring-4 focus:ring-green-300 mx-auto"
                        aria-label="Listen to welcome message"
                    >
                        <Volume2 size={16} />
                        <span style={{ fontSize: `${fontSize - 4}px` }}>Listen</span>
                    </button>
                </div>

                {/* Register Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
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
                            placeholder="Choose a username"
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

                    {/* Email Field */}
                    <div>
                        <label 
                            htmlFor="email"
                            style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                            className="block text-gray-700 font-medium mb-2"
                        >
                            <Mail size={18} className="inline mr-2" />
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`w-full px-4 py-3 border-2 rounded-xl transition-colors focus:outline-none focus:ring-4 ${
                                errors.email 
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                            }`}
                            style={{ fontSize: `${fontSize}px` }}
                            placeholder="Enter your email"
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <p 
                                id="email-error"
                                style={{ fontSize: `${fontSize - 4}px` }}
                                className="text-red-600 mt-2"
                                role="alert"
                            >
                                {errors.email}
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
                                placeholder="Create a strong password"
                                aria-describedby={errors.password ? 'password-error' : 'password-help'}
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
                        {errors.password ? (
                            <p 
                                id="password-error"
                                style={{ fontSize: `${fontSize - 4}px` }}
                                className="text-red-600 mt-2"
                                role="alert"
                            >
                                {errors.password}
                            </p>
                        ) : (
                            <p 
                                id="password-help"
                                style={{ fontSize: `${fontSize - 4}px` }}
                                className="text-gray-500 mt-2"
                            >
                                Must be 8+ characters with uppercase, lowercase, and number
                            </p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label 
                            htmlFor="confirmPassword"
                            style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                            className="block text-gray-700 font-medium mb-2"
                        >
                            <Lock size={18} className="inline mr-2" />
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={form.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-colors focus:outline-none focus:ring-4 ${
                                    errors.confirmPassword 
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                                }`}
                                style={{ fontSize: `${fontSize}px` }}
                                placeholder="Confirm your password"
                                aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p 
                                id="confirm-password-error"
                                style={{ fontSize: `${fontSize - 4}px` }}
                                className="text-red-600 mt-2"
                                role="alert"
                            >
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Learning Preference */}
                    <div>
                        <label 
                            style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                            className="block text-gray-700 font-medium mb-3"
                        >
                            <BookOpen size={18} className="inline mr-2" />
                            Preferred Learning Style
                        </label>
                        <div className="space-y-3">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="preferredPath"
                                    value="visual"
                                    checked={form.preferredPath === 'visual'}
                                    onChange={(e) => handleInputChange('preferredPath', e.target.value as 'visual')}
                                    className="w-5 h-5 text-blue-600 focus:ring-4 focus:ring-blue-200"
                                    disabled={isLoading}
                                />
                                <span style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-700">
                                    🎨 Visual Learning (diagrams, charts, colors)
                                </span>
                            </label>
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="preferredPath"
                                    value="auditory"
                                    checked={form.preferredPath === 'auditory'}
                                    onChange={(e) => handleInputChange('preferredPath', e.target.value as 'auditory')}
                                    className="w-5 h-5 text-blue-600 focus:ring-4 focus:ring-blue-200"
                                    disabled={isLoading}
                                />
                                <span style={{ fontSize: `${fontSize - 2}px` }} className="text-gray-700">
                                    🔊 Auditory Learning (speech, sounds, explanations)
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 px-6 rounded-xl font-medium transition-colors focus:ring-4 focus:ring-green-200 ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p 
                        style={{ fontSize: `${fontSize - 2}px`, lineHeight: lineSpacing }}
                        className="text-gray-600"
                    >
                        Already have an account?{' '}
                        <button
                            onClick={onNavigateToLogin}
                            className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                            style={{ fontSize: `${fontSize - 2}px` }}
                        >
                            Sign in here
                        </button>
                    </p>
                </div>

                {/* Accessibility Info */}
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                    <p 
                        style={{ fontSize: `${fontSize - 4}px`, lineHeight: lineSpacing }}
                        className="text-green-800 text-center"
                    >
                        🧠 Designed for learners with dyslexia<br />
                        ⌨️ Full keyboard navigation support<br />
                        🔊 Audio assistance available<br />
                        📊 Personalized learning paths
                    </p>
                </div>
            </div>
        </div>
    );
};