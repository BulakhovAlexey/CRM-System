<script setup lang="ts">
import type { IColumnTask, ITask, IUser } from '~/types/types'
import { EnumStatus } from '~/types/types'
import { useTasks } from './useTasks'
import { useNeedUpdateTasksBoard } from '~/stores/task.store'
import { useAuthStore } from '@/stores/auth.store'

const { getBoard } = useTasks()
const { data, isFetching, refetch } = getBoard()
const needUpdateTasksBoard = useNeedUpdateTasksBoard()
const authStore = useAuthStore()

needUpdateTasksBoard.$onAction(({ after }) => {
	after(result => refetch())
})
const users = ref<IUser[] | null>(null)
const loading = ref<boolean>(true)

onMounted(async () => {
	const response = await fetch('/api/getUsers')
	users.value = await response.json()
	loading.value = false
})

provide('users', users)
provide('loading', loading)

const filterStatus = ref<EnumStatus | 'все'>(EnumStatus.in_process)
const showOwnTasks = ref<Boolean>(true)

provide('showOwnTasks', showOwnTasks)
provide('filterStatus', filterStatus)

const filterTasks = (tasks: ITask[]) => {
	let filteredTasks: ITask[] = tasks
	if (showOwnTasks.value) {
		filteredTasks = filteredTasks.filter(
			task => task.executor === authStore.getID
		)
	}
	if (filterStatus.value !== 'все') {
		filteredTasks = filteredTasks.filter(
			task => task.status === filterStatus.value
		)
	}

	return filteredTasks
}
</script>

<template>
	<TransitionGroup name="appear">
		<LoadingContainer v-if="isFetching" />
		<div v-else class="tasks">
			<TaskFilter />
			<div class="tasks__columns grid grid-cols-4 min-h-full">
				<div
					v-for="column in (data as IColumnTask[])"
					:key="column.id"
					class="task-column text-center flex flex-col"
				>
					<TaskColumnTitle
						:column="column"
						:columnTasksLength="filterTasks(column.items).length"
					/>
					<TaskCreateModal />
					<TaskList :tasks="filterTasks(column.items)" />
				</div>
			</div>
		</div>
	</TransitionGroup>
</template>

<style scoped>
.task-column {
	min-height: calc(100vh - 64px - 24px - 56px);
	overflow-y: hidden;
}
.task-column {
	border-right: 0.5px solid gray;
}
.task-column:last-child {
	border-right: none;
}
</style>
