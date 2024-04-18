/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: 'hsl(var(--clr-primary-50) / <alpha-value>)',
					100: 'hsl(var(--clr-primary-100) / <alpha-value>)',
					200: 'hsl(var(--clr-primary-200) / <alpha-value>)',
					300: 'hsl(var(--clr-primary-300) / <alpha-value>)',
					400: 'hsl(var(--clr-primary-400) / <alpha-value>)',
					500: 'hsl(var(--clr-primary-500) / <alpha-value>)',
					600: 'hsl(var(--clr-primary-600) / <alpha-value>)',
					700: 'hsl(var(--clr-primary-700) / <alpha-value>)',
					800: 'hsl(var(--clr-primary-800) / <alpha-value>)',
					900: 'hsl(var(--clr-primary-900) / <alpha-value>)',
					950: 'hsl(var(--clr-primary-950) / <alpha-value>)'
				}
			}
		}
	},
	plugins: []
};

export default config;
