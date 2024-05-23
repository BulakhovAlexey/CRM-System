import { DB } from "~/lib/appwrite";
import { DB_ID, COLLECTION_TASKS } from "~/DbConstants";
import { v4 as uuid } from "uuid";
import { useMutation } from "@tanstack/vue-query";
import { useTasks } from "./useTasks";
import { useAuthStore, useSelectedTaskStore, useTaskUpdateModalStore } from "#imports";
import { loginSchema } from '@/lib/schema.validate'
import { EnumStatus } from "~/types/types";


export function useCreateTask(date: Ref<Date | undefined>, editTask: boolean = false) {

  const selectedTaskStore = useSelectedTaskStore()
  const updateModalStore = useTaskUpdateModalStore()
  const task = selectedTaskStore.getTask
  const { getBoard } = useTasks()
  const { refetch } = getBoard
  const authStore = useAuthStore()
  const { errors, meta, values, defineField, setFieldValue, handleSubmit, isSubmitting } = useForm({
    //validationSchema: loginSchema.pick(['email', 'password'])
  })

  //const successMesRef = ref<string>('')
  //const errorMesRef = ref<string>('')
  //const isSuccess = ref<boolean>(false)

  const executorRef = ref<string>('');
  const groupRef = ref<string>('');

  const [name, nameAttrs] = defineField('name');
  const [description, descriptionAttrs] = defineField('description');

  if(editTask) {
    setFieldValue('name', task.task_name)
    setFieldValue('description', task.description)
    executorRef.value = task.executor
    groupRef.value = task.groups.$id
    date.value = new Date(task.end_date)
  }
  
  const { mutate: create, isPending: creating, isSuccess: created } = useMutation({
    mutationKey: ['createTask'],
    mutationFn: () => DB.createDocument(DB_ID, COLLECTION_TASKS, uuid(), {
      task_name: name.value,
      description: description.value,
      groups: groupRef.value,
      start_date: new Date(),
      end_date: date.value,
      executor: executorRef.value,
      owner: authStore.getID,
      status: EnumStatus.in_process
    }),
    onSuccess: () => {
      refetch()
    }
  })

  const { mutate: update, isPending: updating, isSuccess: updated } = useMutation({
    mutationKey: ['updateTask', task.$id],
    mutationFn: () => DB.updateDocument(DB_ID, COLLECTION_TASKS, task.$id, {
      task_name: name.value,
      description: description.value,
      groups: groupRef.value,
      start_date: new Date(),
      end_date: date.value,
      executor: executorRef.value,
      owner: authStore.getID
    }),
    onSuccess: () => {
      updateModalStore.set(false)
      selectedTaskStore.clear()
      refetch()
    }
  })

  const createTask = handleSubmit(async() => editTask ? update() : create()) 

  return {
    name,
    nameAttrs,
    description,
    descriptionAttrs,
    executorRef,
    groupRef,
    errors,
    meta,
    isSubmitting,
    createTask,
    creating,
    updating,
    created,
    updated
  }
}