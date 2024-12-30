export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#7c3aed', // purple-600
                    dark: '#6b21a8',    // purple-700
                    light: '#a78bfa',   // purple-300
                },
                secondary: {
                    DEFAULT: '#3b82f6', // blue-500
                    dark: '#2563eb',    // blue-600
                    light: '#93c5fd',   // blue-300
                },
                success: {
                    DEFAULT: '#10b981', // green-500
                    dark: '#059669',    // green-600
                },
                danger: {
                    DEFAULT: '#ef4444', // red-500
                    dark: '#dc2626',    // red-600
                },
                warning: {
                    DEFAULT: '#f59e0b', // yellow-500
                    dark: '#d97706',    // yellow-600
                },
                gray: {
                    light: '#f3f4f6',   // gray-100
                    DEFAULT: '#e5e7eb', // gray-200
                    dark: '#d1d5db',    // gray-300
                },
            },
        },
    },
    plugins: [],
};