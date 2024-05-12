<script setup lang="ts">
import type { PropType } from 'vue';
import type { IComment, IUser } from '~/types/types';
import { useComments } from './useComments';

const props = defineProps({
  taskID: {
    type: String as PropType<string>,
    required: true
  },
  users: {
    type: Array as PropType<IUser[] | null>,
    default: null
  }
})

const { getCommentsByTask, addComment, commentMessage, deleteComment, commentToDel } = useComments(props.taskID)
const { data: comments, isFetching, isPending } = getCommentsByTask

const addHandler = (commentText: string) => {
  commentMessage.value = commentText
  addComment()
  //smoothScroll()
}

const commentHandler = (id: string, actionType: 'upd' | 'del') => {
  console.log(actionType);
  switch (actionType) {
    case 'del':
      commentToDel.value = id
      deleteComment()
      break;
    case 'upd':
      alert('123')
      break;
    default:
      throw new Error("Unknown action in child component");
      break;
  }
}

const smoothScroll = () => {
  let where = document.getElementById('taskSlideOverBody');
  console.log(where);
  if(where){
    where.scrollTop = where.scrollHeight
    //window.scrollBy(0, where.getBoundingClientRect().top - document.documentElement.clientHeight + where.clientHeight);	
  }
}
smoothScroll()
</script>

<template>
  <div class="comments__title">Комментарии</div>
  <div 
  :class="{ fetching : isFetching }"
  class="comments__body mt-4 transition-all">
    <div v-if="comments && comments.length > 0" class="comments__items flex flex-col gap-5">
      <TasksCommentsItem 
      v-for="comment in comments" 
      :comment="comment" 
      :users="users" 
      @commentAction="commentHandler"
      :key="comment.$id"/>
    </div>
  </div>
  <TasksCommentsCreate :loading="isFetching" @addComment='addHandler' />
</template>

<style scoped>
.fetching{
  @apply blur-sm pointer-events-none transition-all
}
</style>