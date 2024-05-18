import { DB } from "~/lib/appwrite";
import { DB_ID, COLLECTION_TASKS } from "~/DbConstants";
import { useMutation } from "@tanstack/vue-query";
import { useTasks } from "./useTasks";


export function useStatusAction() {

  const { getBoard } = useTasks()
  const { refetch } = getBoard

  const taskIdToChange = ref<string>('')
  const newStatusToChange = ref<string>('')

  const { mutate: updateStatusMutation, isPending: updatingStatus } = useMutation({
    mutationKey: ['editAction', taskIdToChange.value],
    mutationFn: () => DB.updateDocument(DB_ID, COLLECTION_TASKS, taskIdToChange.value, { status: newStatusToChange.value }),
    onSuccess: () => refetch()
  })

  const updateStatus = () => {
    updateStatusMutation()
  }

  return {
    newStatusToChange,
    taskIdToChange,
    updatingStatus,
    updateStatus
  }
}