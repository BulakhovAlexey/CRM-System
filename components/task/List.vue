<script setup lang="ts">
import type { IColumnTask, ITask, IUser } from '~/types/types';
import { EnumStatus } from '~/types/types';
import { useTasks } from './useTasks';
import { useAuthStore } from '@/stores/auth.store'
import { useSelectedTaskStore, useTaskUpdateModalStore } from '~/stores/task.store';
import { useStatusAction } from './useStatusAction';

const authStore = useAuthStore()
const updateModalStore = useTaskUpdateModalStore()

const { getBoard } = useTasks()
const { data, isFetching } = getBoard
const selectedTaskStore = useSelectedTaskStore()

const users = ref<IUser[] | null>(null);
const loading = ref<boolean>(true)

onMounted(async () => {
  const response = await fetch('/api/getUsers');
  users.value = await response.json();
  loading.value = false
});

const getUserLabel = (executor: string): string => {
  if (users.value) {
    const user = users.value.find(user => user.$id === executor);
    return user ? user.name : '';
  }
  return '';
}

const taskSlideOverIsOpen = ref<boolean>(false)
const selectedTaskID = ref<string>('')
const editTask = ref<boolean>(false)

const taskActions = (task: ITask, isOwner: boolean = false) => {
  if(isOwner) editTask.value = true
  if(editTask.value){
    selectedTaskStore.set(task)
    updateModalStore.set(true)
  } else {
    selectedTaskID.value = task.$id
    taskSlideOverIsOpen.value = !taskSlideOverIsOpen.value
  }
}

const closeModalHandler = () =>{
  selectedTaskStore.clear()
  updateModalStore.set(false)
  editTask.value = false
}

const { updateStatus, updatingStatus, taskIdToChange, newStatusToChange } = useStatusAction()

const updateStatusHandler = async (taskID: string, newStatus: EnumStatus) =>{
  taskIdToChange.value = taskID
  newStatusToChange.value = newStatus
  taskSlideOverIsOpen.value = !taskSlideOverIsOpen.value
  updateStatus()
}


</script>

<template>
  <TransitionGroup name="appear">
    <div v-if="isFetching" class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <Icon name="radix-icons:update" class="animate-spin" size="50" />
    </div>
    <div v-else class="tasks">
      <div class="tasks__columns grid grid-cols-4 min-h-full">
        <div v-for="column in (data as IColumnTask[])"
          :key="column.id"
          class="task-column text-center flex flex-col"
        >
          <div 
          class="task-column__title border rounded-md border-cyan-800 py-1 mb-3 mx-1 bg-opacity-55"
          :class="column.color">
            {{ column.label }}({{ column.items.length }})
          </div>
          <TaskCreateModal />
          <div class="task-column__body px-2 flex-1">
            <div class="task-column__items flex flex-col gap-4">
              <div 
              class="item border rounded-md p-2 scale-95 cursor-pointer hover:scale-100 transition-all"
              draggable="true" 
              v-for="task in column.items"
              :key="task.$id">
                <div class="item__top flex justify-between items-center mb-3">
                  <div class="item__title text-start flex-1">{{ task.task_name }}</div>
                  <Icon 
                  v-if="authStore.getID === task.owner" 
                  @click="taskActions(task, authStore.getID === task.owner)"
                  name="line-md:edit" 
                  size="18" 
                  class="icon scale-0 hover:opacity-65" />
                  <Icon 
                  name="radix-icons:dots-horizontal" 
                  @click="taskActions(task)" 
                  class="icon scale-0 hover:opacity-65" 
                  size="18" />
                </div>
                <div class="item__badges mb-2">
                  <div class="item__users flex justify-start items-center gap-2">
                    <USkeleton v-if="loading" class="w-[45px] h-[24px]" />
                    <UBadge v-else color="gray" :label="getUserLabel(task.owner)"/>
                    <Icon name='radix-icons:arrow-right' size="17" />
                    <USkeleton v-if="loading" class="w-[45px] h-[24px]" />
                    <UBadge v-else color="gray" :label="getUserLabel(task.executor)"/>
                  </div>
                </div>
                <div class="item__date flex justify-end">
                  <TaskStatusBadge :status="task.status" />
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </TransitionGroup>
  <USlideover v-model="taskSlideOverIsOpen" :ui="{width: 'w-screen max-w-[1000px]'}">
    <div id="taskSlideOverBody" class="p-4 h-screen overflow-auto scroll-smooth">
      <TaskView :id="selectedTaskID" @updateStatus="updateStatusHandler" />
    </div>
  </USlideover>
  <UModal v-model="updateModalStore.isOpen" prevent-close>
    <div class="p-4 bg-slate-500 rounded">
      <TaskForm :editTask="editTask" @closeModal="closeModalHandler" />
    </div>
  </UModal>
</template>

<style scoped>
.task-column{
  min-height: calc(100vh - 64px - 24px);
}
.task-column{
  border-right: 0.5px solid gray;
}
.task-column:last-child{
  border-right: none;
}
.red{
  @apply bg-red-400
}
.green{
  @apply bg-green-400
}
.blue400{
  @apply bg-blue-200
}
.blue600{
  @apply bg-blue-400
}
.icon{
  @apply mx-2
}
.item:hover .icon{
  @apply scale-100 transition-all
}
</style>