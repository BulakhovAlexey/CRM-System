import { defineStore } from 'pinia'

export const useFSloadingStore = defineStore('FSLoading', {
	state: () => ({
		isFSLoading: true,
	}),
	actions: {
		set(data: boolean) {
			this.$patch({ isFSLoading: data })
		},
	},
})
