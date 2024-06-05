<script setup lang="ts">
import { EnumStatus, type ITask, type IUser } from '~/types/types'
import { useQuery } from '@tanstack/vue-query'
import { DB } from '~/lib/appwrite'
import { COLLECTION_TASKS, DB_ID } from '~/DbConstants'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
})
const emits = defineEmits(['updateStatus'])

const { data, isFetching } = useQuery({
	queryKey: ['get_task', props.id],
	queryFn: () => DB.getDocument(DB_ID, COLLECTION_TASKS, props.id),
})

const task = data as unknown as ITask

const users = ref<IUser[] | null>(null)
const loading = ref<boolean>(true)

onMounted(async () => {
	const response = await fetch('/api/getUsers')
	users.value = await response.json()
	loading.value = false
})

const statusChangeHandler = async (
	taskId: keyof Pick<ITask, '$id'>,
	newStatus: EnumStatus
) => {
	emits('updateStatus', taskId, newStatus)
}
</script>

<template>
	<LoadingContainer v-if="isFetching" />
	<div v-else>
		<h2 class="task-view__title p-2 mb-3 border rounded-xl text-xl">
			{{ task.task_name }}
		</h2>
		<div class="task-view__inner flex gap-2 text-base">
			<div
				class="task-view__body flex-[60%] p-2 border rounded-xl overflow-scroll"
			>
				<TaskStatusBadge :status="task.status" />
				<TaskDetailDescription :description="task.description" />
				<TaskDetailGroup :group="task.groups.name" />
				<TaskStatusButtons @statusChange="statusChangeHandler" :task="task" />
				<TaskCommentsList :taskID="task.$id" :users="users" />
			</div>
			<div class="task-view__aside aside border rounded-xl">
				<TaskDetailAside :task="task" :users="users" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.link {
	@apply hover:opacity-50 transition-all;
}
</style>
