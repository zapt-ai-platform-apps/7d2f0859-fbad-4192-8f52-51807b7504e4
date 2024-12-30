export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6366F1', // indigo-500
                    dark: '#4F46E5',    // indigo-600
                    light: '#818CF8',   // indigo-300
                },
                secondary: {
                    DEFAULT: '#10B981', // emerald-500
                    dark: '#059669',    // emerald-600
                    light: '#34D399',   // emerald-400
                },
                success: {
                    DEFAULT: '#16A34A', // green-600
                    dark: '#14532D',    // green-700
                },
                danger: {
                    DEFAULT: '#EF4444', // red-500
                    dark: '#DC2626',    // red-600
                },
                warning: {
                    DEFAULT: '#F59E0B', // amber-500
                    dark: '#D97706',    // amber-600
                },
                accent: {
                    DEFAULT: '#F472B6', // pink-400
                    dark: '#DB2777',    // pink-600
                    light: '#F9A8D4',   // pink-300
                },
                muted: {
                    DEFAULT: '#6B7280', // gray-500
                    dark: '#4B5563',    // gray-700
                    light: '#D1D5DB',   // gray-300
                },
                background: {
                    DEFAULT: '#F9FAFB', // gray-50
                    dark: '#F3F4F6',    // gray-100
                },
                foreground: {
                    DEFAULT: '#111827', // gray-900
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};