function withOpacityValue(variable) {
    return ({ opacityValue }) => {
        if(opacityValue === undefined) {
            return `rgb(var(${variable}))`
        }
        return `rgb(var(${variable}) / ${opacityValue})`
    }
}

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
            },
            backgroundColor: {
                skin: {
                    bg: withOpacityValue('--color-bg-base'),
                    'bg-hover': withOpacityValue('--color-bg-hover'),
                    card: withOpacityValue('--color-bg-card'),
                }
            },
            textColor: {
                skin: {
                    text: withOpacityValue('--color-text'),
                    'text-sec': withOpacityValue('--color-text-sec'),
                    'text-select': withOpacityValue('--color-text-select'),
                    'text-hover': withOpacityValue('--color-text-hover'),
                }
            },
            borderColor: {
                skin: {
                    border: withOpacityValue('--color-border')
                }
            }
        },
    },
    plugins: [],
}