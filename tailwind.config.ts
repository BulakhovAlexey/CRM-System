import { _opacity } from '#tailwind-config/theme/transitionProperty'
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
	theme: {
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		extend: {
			borderRadius: {
				none: '0',
				sm: '.125rem',
				DEFAULT: '.25rem',
				lg: '.5rem',
			},
			colors: {
				textMain: '#e2e8f0',
				bgMain: '#374151',
				tableBorder: 'rgb(238,238,238,1)',
			},
		},
	},
}
