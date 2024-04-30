import type { IUser } from "~/types/types";
import { defineStore } from "pinia";

const defaultUser: { user: Pick<IUser, 'email' | 'name' | 'labels' | 'status'>} = {
  user: {
    email: '',
    name: '',
    labels: [''],
    status: false
  }
}


export const useAuthStore = defineStore('userStore', {
  state: () => defaultUser,
  getters: {
    isAuth: state => state.user.status,
    getName: state => state.user.name,
    getGroups: state => state.user.labels[0]
  },
  actions: {
    set(data: IUser){
      this.$patch({user: data})
    },
    clear(){
      this.$patch(defaultUser)
    },
    addGroup(){
      // todo
    },
    removeGroup(){
      // todo
    }
  }
})