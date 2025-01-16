import type { IGroup } from '~/types/types'
import { defineStore } from 'pinia'

const defaultGroup: { group: IGroup } = {
	group: {
		$id: '',
		$createdAt: '',
		tasks: [],
		name: '',
		description: '',
		project_link: '',
	},
}

export const useSelectedGroupStore = defineStore('groupStore', {
	state: () => defaultGroup,
	getters: {
		getGroup: state => state.group,
		getId: state => state.group.$id,
		getName: state => state.group.name,
		isTasks: state => state.group.tasks.length > 0,
	},
	actions: {
		set(data: IGroup) {
			this.$patch({ group: data })
		},
		clear() {
			this.$patch(defaultGroup)
		},
	},
})

export const addGroupSlideOver = defineStore('groupSlideOverStore', {
	state: () => ({
		isClosed: true,
	}),
	actions: {
		set(data: boolean) {
			this.$patch({ isClosed: data })
		},
	},
})
