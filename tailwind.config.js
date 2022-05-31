module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            important: true,
            animation: {
                'spin-slow': 'spin 30s linear infinite'
            },
            spacing: {
                '112': '28rem'
            }
        },
    },
    plugins: [],
}