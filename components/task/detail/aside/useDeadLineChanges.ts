import { DB } from '~/lib/appwrite'
import { DB_ID, COLLECTION_TASKS } from '~/DbConstants'
import { useMutation } from '@tanstack/vue-query'
import { useNeedUpdateTasksBoard } from '#imports'

export function useDeadLineChanges(date: Ref<Date | undefined>) {
	const taskID = ref<string>('')
	const isNeedUpdateTaskBoard = useNeedUpdateTasksBoard()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update_deadLine'],
		mutationFn: () =>
			DB.updateDocument(DB_ID, COLLECTION_TASKS, taskID.value, {
				end_date: date.value,
			}),
		onSuccess: () => {
			isNeedUpdateTaskBoard.set(true)
		},
	})

	return {
		mutate,
		taskID,
		isPending,
	}
}
