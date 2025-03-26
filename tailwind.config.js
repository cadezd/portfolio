/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {
            animation: {
                'infinite-scroll': 'infinite-scroll 60s linear infinite',
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' },
                }
            }
        },
        colors: {
            'white-300': '#fefefe',
            'orange-300': '#eb593a',
            'dark-grey-200': '#262626',
            'dark-grey-150': '#393939',
            'dark-grey-100': '#808080',
            'grey-400': '#acacac',
            'black-500': '#090909'
        },
        fontFamily: {
            'Syne': ['Syne', 'sans-serif'],
            'Satoshi': ['Satoshi', 'sans-serif'],
        },
    },
    plugins: [],
}

