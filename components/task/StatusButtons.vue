<script setup lang="ts">
import { EnumStatus, type ITask } from '~/types/types'
import { useAuthStore } from '@/stores/auth.store'
import { useComments } from './comments/useComments'

const authStore = useAuthStore()

const emits = defineEmits(['statusChange'])

const props = defineProps({
	task: {
		type: Object as PropType<ITask>,
		required: true,
	},
})
const { resultCommentID } = useComments(props.task.$id)

const toast = useToast()
const isOwner = authStore.getID === props.task.owner
const isStartStatus = ref<boolean>(props.task.status === EnumStatus.in_process)
const isDoneStatus = ref<boolean>(props.task.status === EnumStatus.done)
const disableButton = ref<boolean>(false)
const notificationText = 'Добавьте результат задачи!'

const showNotification = () => {
	disableButton.value = true
	toast.add({
		title: notificationText,
		callback: () => (disableButton.value = false),
	})
}

const action = (newStatus: EnumStatus) => {
	resultCommentID.value == null
		? showNotification()
		: emits('statusChange', props.task.$id, newStatus)
}
</script>

<template>
	<div class="task-view__actions gap-4">
		<UButton
			v-if="!isDoneStatus && isOwner"
			@click="action(EnumStatus.done)"
			color="gray"
			:disabled="disableButton"
		>
			Завершить
		</UButton>

		<UButton
			v-if="!isStartStatus || isDoneStatus"
			@click="action(EnumStatus.in_process)"
			color="lime"
			:disabled="disableButton"
		>
			Вернуть в работу
		</UButton>

		<UButton
			v-if="isStartStatus"
			@click="action(EnumStatus.control)"
			color="amber"
			:disabled="disableButton"
		>
			На контроль
		</UButton>
	</div>
</template>

<style scoped>
.task-view__actions {
	@apply flex justify-end gap-4 border-b py-3;
}
</style>
