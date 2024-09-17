import type { ITask } from '~/types/types'
import { EnumStatus } from '~/types/types'
import { DB } from '~/lib/appwrite'
import { DB_ID, COLLECTION_TASKS } from '~/DbConstants'
import { v4 as uuid } from 'uuid'
import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'
import { taskSchema } from '@/lib/schema.validate'
import {
	useAuthStore,
	useSelectedTaskStore,
	useTaskUpdateModalStore,
} from '#imports'
import {
	useNeedUpdateTasksBoard,
	useIsEditTaskAction,
} from '~/stores/task.store'

export function useCreateTask() {
	const selectedTaskStore = useSelectedTaskStore()
	const updateModalStore = useTaskUpdateModalStore()
	const task: ITask = selectedTaskStore.getTask
	const needUpdateTasksBoard = useNeedUpdateTasksBoard()
	const authStore = useAuthStore()
	const isEditActionStore = useIsEditTaskAction()

	const {
		errors,
		meta,
		values,
		defineField,
		setFieldValue,
		handleSubmit,
		isSubmitting,
	} = useForm({
		validationSchema: taskSchema,
	})

	const [name, nameAttrs] = defineField('name')
	const [description, descriptionAttrs] = defineField('description')
	const [groupID, groupIDAttrs] = defineField('group')
	const [executorID, executorIDAttrs] = defineField('executor')
	const [date, dateAttrs] = defineField('date')
	const [important, importantAttrs] = defineField('important')

	if (isEditActionStore.isEditAction) {
		setFieldValue('name', task.task_name)
		setFieldValue('description', task.description)
		setFieldValue('group', task.groups.$id)
		setFieldValue('executor', task.executor)
		setFieldValue('date', new Date(task.end_date))
		setFieldValue('important', task.isImportant)
	}

	const {
		mutate: create,
		isPending: creating,
		isSuccess: created,
	} = useMutation({
		mutationKey: ['createTask'],
		mutationFn: () =>
			DB.createDocument(DB_ID, COLLECTION_TASKS, uuid(), {
				task_name: name.value,
				description: description.value,
				groups: groupID.value,
				start_date: new Date(),
				end_date: date.value,
				executor: executorID.value,
				owner: authStore.getID,
				status: EnumStatus.in_process,
				isImportant: important.value,
			}),
		onSuccess: () => {
			needUpdateTasksBoard.set(true)
			isEditActionStore.set(false)
		},
	})

	const {
		mutate: update,
		isPending: updating,
		isSuccess: updated,
	} = useMutation({
		mutationKey: ['updateTask', task.$id],
		mutationFn: () =>
			DB.updateDocument(DB_ID, COLLECTION_TASKS, task.$id, {
				task_name: name.value,
				description: description.value,
				groups: groupID.value,
				start_date: new Date(),
				end_date: date.value,
				executor: executorID.value,
				owner: authStore.getID,
				isImportant: important.value,
			}),
		onSuccess: () => {
			updateModalStore.set(false)
			selectedTaskStore.clear()
			needUpdateTasksBoard.set(true)
		},
	})

	const createTask = handleSubmit(async values => {
		isEditActionStore.isEditAction ? update() : create()
	})

	return {
		name,
		nameAttrs,
		description,
		important,
		importantAttrs,
		descriptionAttrs,
		executorID,
		executorIDAttrs,
		groupID,
		groupIDAttrs,
		date,
		dateAttrs,
		errors,
		meta,
		isSubmitting,
		createTask,
		creating,
		updating,
		created,
		updated,
	}
}
