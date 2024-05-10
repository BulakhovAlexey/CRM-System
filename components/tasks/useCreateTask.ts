import { DB } from "~/lib/appwrite";
import { v4 as uuid } from "uuid";
import { useMutation } from "@tanstack/vue-query";
import { useTasks } from "./useTasks";
import { useAuthStore } from "#imports";
import { DB_ID, COLLECTION_TASKS } from "~/DbConstants";
import { loginSchema } from '@/lib/schema.validate'


export function useCreateTask(date: Ref<Date | undefined>) {

  const { getBoard } = useTasks()
  const { refetch } = getBoard
  const authStore = useAuthStore()
  const { errors, meta, values, defineField, handleSubmit, isSubmitting } = useForm({
    //validationSchema: loginSchema.pick(['email', 'password'])
  })

  //const successMesRef = ref<string>('')
  //const errorMesRef = ref<string>('')
  //const isSuccess = ref<boolean>(false)

  const executorRef = ref<string>('');
  const groupRef = ref<string>('');

  const [name, nameAttrs] = defineField('name');
  const [description, descriptionAttrs] = defineField('description');
  //const [password, passwordAttrs] = defineField('password');

  
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['createTask'],
    mutationFn: () => DB.createDocument(DB_ID, COLLECTION_TASKS, uuid(), {
      task_name: name.value,
      description: description.value,
      groups: groupRef.value,
      start_date: new Date(),
      end_date: date.value,
      executor: executorRef.value,
      owner: authStore.getID
    }),
    onSuccess: () => {
      refetch()
    }
  })

  const createTask = handleSubmit(async() => {
    mutate()
  }) 

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
    createTask
  }
}