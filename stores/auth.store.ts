import type { IUser } from '~/types/types'
import { defineStore } from 'pinia'

const defaultUser: {
	user: Pick<IUser, '$id' | 'email' | 'name' | 'labels' | 'status'>
} = {
	user: {
		$id: '',
		email: '',
		name: '',
		labels: [''],
		status: false,
	},
}

export const useAuthStore = defineStore('userStore', {
	state: () => defaultUser,
	getters: {
		isAuth: state => state.user.status,
		getName: state => state.user.name,
		getID: state => state.user.$id,
		getEmail: state => state.user.email,
		getGroups: state => state.user.labels[0],
	},
	actions: {
		set(data: IUser) {
			this.$patch({ user: data })
		},
		setName(name: string) {
			this.$patch({ user: { name } })
		},
		setEmail(email: string) {
			this.$patch({ user: { email } })
		},
		clear() {
			this.$patch(defaultUser)
		},
	},
})
