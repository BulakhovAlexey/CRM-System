import type { ITask } from "~/types/types";
import { defineStore } from "pinia";

const defaultTask: { task: ITask } = {
  task: {
    $id: '',
    $createdAt: '',
    task_name: '',
    description: '',
    start_date: '',
    end_date: '',
    executor: '',
    owner: '',
    groups: {
      $id: '',
      $createdAt: '',
      tasks: [],
      name: '',
      description: '',
      project_link: '',
    },
  }
}


export const useSelectedTaskStore = defineStore('taskStore', {
  state: () => defaultTask,
  getters: {
    getTask: state => state.task,
  },
  actions: {
    set(data: ITask){
      this.$patch({task: data})
    },
    clear(){
      this.$patch(defaultTask)
    },
  }
})

// export const addGroupSlideOver = defineStore('groupSlideOverStore', {
//   state: () => ({
//     isClosed: true
//   }),
//   actions: {
//     set(data:boolean){
//       this.$patch({isClosed: data})
//     },
//   }
// })