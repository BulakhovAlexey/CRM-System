import type { IComment } from "~/types/types";
import { DB } from "~/lib/appwrite";
import { DB_ID, COLLECTION_COMMENTS } from "~/DbConstants";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { useAuthStore } from "@/stores/auth.store";
import { v4 as uuid } from "uuid";


export const useComments = function(taskId:String) {

  const authStore = useAuthStore()
  const commentMessage = ref<string>('')
  const commentToDel = ref<string>('')

  const getCommentsByTask = useQuery({
    queryKey: ['get_comments', taskId],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_COMMENTS),
    select(data) {
      const comments = data.documents as unknown as IComment[]
      return comments.filter(el => el.tasks.$id == taskId)
    },
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['add_comment'],
    mutationFn: () => DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
      author: authStore.getID,
      text: commentMessage.value,
      tasks: taskId
    }),
    onSuccess: () => {
      getCommentsByTask.refetch()
    }
  })

  const { mutate: deleting } = useMutation({
    mutationKey: ['delete_comment'],
    mutationFn: () => DB.deleteDocument(DB_ID, COLLECTION_COMMENTS, commentToDel.value),
    onSuccess: () => {
      getCommentsByTask.refetch()
    }
  })

  const addComment = () => {
    mutate()
  }

  const deleteComment = () => {
    deleting()
  }

  return {
    getCommentsByTask,
    addComment,
    commentMessage,
    isPending,
    deleteComment,
    commentToDel
  }
}