import { EnumStatus, type ITask } from '~/types/types'
import { defineStore } from 'pinia'

const defaultTask: { task: ITask } = {
	task: {
		$id: '',
		$createdAt: '',
		task_name: '',
		description: '',
		start_date: '',
		end_date: '',
		executor: '',
		status: EnumStatus.in_process,
		owner: '',
		groups: {
			$id: '',
			$createdAt: '',
			tasks: [],
			name: '',
			description: '',
			project_link: '',
		},
	},
}

export const useSelectedTaskStore = defineStore('taskStore', {
	state: () => defaultTask,
	getters: {
		getTask: state => state.task,
	},
	actions: {
		set(data: ITask) {
			this.$patch({ task: data })
		},
		clear() {
			this.$patch(defaultTask)
		},
	},
})

export const useTaskUpdateModalStore = defineStore('taskUpdateModalStore', {
	state: () => ({
		isOpen: false,
	}),
	actions: {
		set(data: boolean) {
			this.$patch({ isOpen: data })
		},
	},
})
