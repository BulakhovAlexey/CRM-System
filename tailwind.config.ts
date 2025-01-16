import { _opacity } from '#tailwind-config/theme/transitionProperty'
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
	theme: {
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
		extend: {
			spacing: {
				'vh-80': 'calc(100vh - 80px)',
			},
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
