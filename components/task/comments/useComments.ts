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
  const commentToEditID = ref<string>('')
  const commentToEditMessage = ref<string>('')
  const isEditAction = ref<boolean>(false)
  const resultCommentIndex = ref<number | null>(null)
  const resultCommentID = ref<string | null>(null)
  const commentIsTaskResult = ref<boolean>(false)

  const smoothScroll = () => {
    let taskSlideOverBody = document.getElementById('taskSlideOverBody');
    if(taskSlideOverBody){
      taskSlideOverBody.scrollTo({
        top: taskSlideOverBody.scrollHeight,
        left: 0,
        behavior: "smooth",
      })
    }
  }

  const getCommentsByTask = useQuery({
    queryKey: ['get_comments', taskId],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_COMMENTS),
    select(data) {
      const comments = data.documents as unknown as IComment[]
      comments.filter(el => el.tasks.$id == taskId)
      resultCommentIndex.value = null
      resultCommentID.value = null
      comments.find((el, index) => {
        if(el.taskResult) {
          resultCommentIndex.value = index
          resultCommentID.value = el.$id
        }
      })
      return comments
    },
  })

  const { mutate: addMutation, isPending } = useMutation({
    mutationKey: ['add_comment'],
    mutationFn: () => DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
      author: authStore.getID,
      text: commentMessage.value,
      tasks: taskId,
      taskResult: commentIsTaskResult.value
    }),
    onSuccess: async () => {
      await getCommentsByTask.refetch()
      smoothScroll()
    }
  })

  const { mutate: removeResultMutation, isPending: removingResult } = useMutation({
    mutationKey: ['remove_result'],
    mutationFn: () => DB.updateDocument(DB_ID, COLLECTION_COMMENTS, resultCommentID.value as string, {
      taskResult: false
    }),
    onSuccess: async () => {
      await getCommentsByTask.refetch()
    }
  })

  const { mutate: updateMutation, isPending: updating } = useMutation({
    mutationKey: ['edit_comment', commentToEditID.value],
    mutationFn: () => DB.updateDocument(DB_ID, COLLECTION_COMMENTS, commentToEditID.value, 
      {
        text: commentToEditMessage.value,
        taskResult: commentIsTaskResult.value
      }),
    onSuccess: async () => {
      await getCommentsByTask.refetch()
      commentToEditMessage.value = ''
      isEditAction.value = false
    }
  })


  const { mutate: deleteMutation } = useMutation({
    mutationKey: ['delete_comment'],
    mutationFn: () => DB.deleteDocument(DB_ID, COLLECTION_COMMENTS, commentToDel.value),
    onSuccess: () => {
      getCommentsByTask.refetch()
    }
  })

  const addComment = () => {
    addMutation()
  }

  const deleteComment = () => {
    deleteMutation()
  }

  const updateComment = async () => {
    updateMutation()
  }

  const removeResult = async () => {
    removeResultMutation()
  }

  return {
    getCommentsByTask,
    commentMessage,
    isPending,
    removingResult,
    commentToDel,
    commentToEditID,
    commentToEditMessage,
    isEditAction,
    resultCommentIndex,
    resultCommentID,
    commentIsTaskResult,
    updateComment,
    deleteComment,
    addComment,
    removeResult
  }
}