// customize NuxtUi
export default defineAppConfig({
  nuxtIcon: {
    class: 'hover:opacity-50 transition-all cursor-pointer', // default <Icon> class applied
  },
  ui: {
    primary: 'blue',
    gray: 'cool',
    button: {
      default: {
        size: 'md',
      }
    },
    formGroup: {
      wrapper: '',
      inner: '',
      label: {
        wrapper: 'flex content-center items-center justify-between',
        base: 'block font-medium text-textMain dark:text-gray-200',
        required: "after:content-['*'] after:ms-0.5 after:text-red-400 dark:after:text-red-400",
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
      description: 'text-gray-500 dark:text-gray-400',
      hint: 'text-gray-500 dark:text-gray-400',
      help: 'mt-2 text-gray-500 dark:text-gray-400',
      error: 'mt-2 text-red-500 dark:text-red-400',
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
