// customize NuxtUi
export default defineAppConfig({
	nuxtIcon: {
		class: 'hover:opacity-70 transition-all cursor-pointer', // default <Icon> class applied
	},
	ui: {
		primary: 'blue',
		gray: 'cool',
		notifications: {
			// Show toasts at the top right of the screen
			position: 'top-0 bottom-auto',
		},
		notification: {
			default: {
				color: 'blue',
				icon: 'i-heroicons-exclamation-triangle',
			},
			base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-auto disabled:opacity-75 flex-shrink-0',
		},
		button: {
			default: {
				size: 'md',
			},
		},
		table: {
			base: 'bg-slate-200 bg-opacity-80 rounded',
		},
		formGroup: {
			label: {
				wrapper: 'flex content-center items-center justify-between',
				base: 'block font-medium text-textMain dark:text-gray-200',
				required:
					"after:content-['*'] after:ms-0.5 after:text-red-400 dark:after:text-red-400",
			},
			size: {
				'2xs': 'text-xs',
				xs: 'text-xs',
				sm: 'text-sm',
				md: 'text-sm',
				lg: 'text-sm',
				xl: 'text-base',
			},
			container: 'mt-1 relative',
			default: {
				size: 'sm',
			},
		},
		divider: {
			border: {
				base: 'flex border-white dark:border-gray-800',
				horizontal: 'w-full',
				vertical: 'h-full',
			},
			label: 'text-white',
		},
	},
})
