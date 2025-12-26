/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Custom Monopoly colors if needed
            colors: {
                monopolyGreen: '#1fb25a',
                monopolyBlue: '#0072bb',
            }
        },
    },
    plugins: [],
}