<script setup lang="ts">
import type { ITask } from '~/types/types';
import { EnumStatus } from '~/types/types'
import { useAuthStore } from '@/stores/auth.store'
import {
	useSelectedTaskStore,
	useTaskUpdateModalStore,
	useIsEditTaskAction,
} from '~/stores/task.store'
import { useStatusAction } from './useStatusAction'

const props = defineProps({
	task: {
		type: Object as PropType<ITask>,
		required: true,
	},
})
const authStore = useAuthStore()
const selectedTaskStore = useSelectedTaskStore()
const updateModalStore = useTaskUpdateModalStore()
const isEditActionStore = useIsEditTaskAction()

const taskSlideOverIsOpen = ref<boolean>(false)
const selectedTaskID = ref<string>('')

const taskActions = (task: ITask, isOwner: boolean = false) => {
	if (isOwner) isEditActionStore.set(true)
	if (isEditActionStore.isEditAction) {
		selectedTaskStore.set(task)
		updateModalStore.set(true)
	} else {
		selectedTaskID.value = task.$id
		taskSlideOverIsOpen.value = !taskSlideOverIsOpen.value
	}
}


const closeModalHandler = () => {
	selectedTaskStore.clear()
	updateModalStore.set(false)
	isEditActionStore.set(false)
}

const { updateStatus, updatingStatus, taskIdToChange, newStatusToChange } =
	useStatusAction()

const updateStatusHandler = async (taskID: string, newStatus: EnumStatus) => {
	taskIdToChange.value = taskID
	newStatusToChange.value = newStatus
	taskSlideOverIsOpen.value = !taskSlideOverIsOpen.value
	updateStatus()
}
</script>


<template>
  <Icon
    v-if="authStore.getID === task.owner"
    @click="taskActions(task, authStore.getID === task.owner)"
    name="line-md:edit"
    size="18"
    class="icon scale-0 hover:opacity-65"
  />
  <Icon
    name="radix-icons:dots-horizontal"
    @click="taskActions(task)"
    class="icon scale-0 hover:opacity-65"
    size="18"
  />

  <!--  -->
  <USlideover
		v-model="taskSlideOverIsOpen"
		:ui="{ width: 'w-screen max-w-[1000px]' }"
	>
		<div
			id="taskSlideOverBody"
			class="p-4 h-screen overflow-auto scroll-smooth"
		>
			<TaskDetail :id="selectedTaskID" @updateStatus="updateStatusHandler" />
		</div>
	</USlideover>
	<UModal
		v-model="updateModalStore.isOpen"
		prevent-close
		:ui="{ overlay: { background: 'bg-gray-200/35 dark:bg-gray-800/35' } }"
	>
		<div class="p-4 bg-slate-500 rounded">
			<TaskForm @closeModal="closeModalHandler" />
		</div>
	</UModal>
</template>


<style scoped>
.icon {
	@apply mx-2;
}
.item:hover .icon {
	@apply scale-100 transition-all;
}
</style>