import { DB } from '~/lib/appwrite'
import { DB_ID, COLLECTION_TASKS } from '~/DbConstants'
import { useNeedUpdateTasksBoard } from '#imports'
import { useMutation } from '@tanstack/vue-query'

export function useStatusAction() {
	
	const updateBoard = useNeedUpdateTasksBoard()

	const taskIdToChange = ref<string>('')
	const newStatusToChange = ref<string>('')

	const { mutate: updateStatusMutation, isPending: updatingStatus } =
		useMutation({
			mutationKey: ['editAction', taskIdToChange.value],
			mutationFn: () =>
				DB.updateDocument(DB_ID, COLLECTION_TASKS, taskIdToChange.value, {
					status: newStatusToChange.value,
				}),
			onSuccess: () => updateBoard.set(true),
		})

	const updateStatus = () => {
		updateStatusMutation()
	}

	return {
		newStatusToChange,
		taskIdToChange,
		updatingStatus,
		updateStatus,
	}
}
