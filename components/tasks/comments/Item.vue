<script setup lang="ts">
import type { PropType } from 'vue';
import type { IComment, IUser } from '~/types/types';
import { dateFormatter } from '~/lib/supportFunctions';
import { useAuthStore } from '@/stores/auth.store';


const props = defineProps({
  comment: {
    type: Object as PropType<IComment>,
    default: () => []
  },
  users: {
    type: Array as PropType<IUser[] | null>,
    default: null
  }
})

const emit = defineEmits(['commentAction'])

const authStore = useAuthStore()

const getUserName = (userID: string): string => {
  let userName = ''
  if (props.users) {
    const user = props.users.find(user => user.$id === userID);
    if(user) userName = user.name
  }
  return userName;
}

const action = (id: string, actionType: 'upd' | 'del') => {
  switch (actionType) {
    case 'upd':
      emit('commentAction', id, 'upd')
      break;
    case 'del':
      emit('commentAction', id, 'del')
      break;
    default:
      throw new Error("Unknown Action");
      break;
  }
}

</script>

<template>
  <div class="comments__item comment overflow-hidden">
    <div class="comment__inner flex justify-start items-start gap-4">
      <div class="comment__head flex justify-start items-center gap-3 mb-4">
        <div class="comment__logo">{{ getUserName(comment.author).charAt(0) }}</div>
      </div>
      <div class="comment__body p-3 rounded-md bg-slate-400 bg-opacity-10 flex-1">
        <div class="comment__body-top relative flex items-center">
          <NuxtLink 
          :to="`users/?q=${comment.author}`"
          class="comment__author text-sky-700 mr-4">
            {{ getUserName(comment.author) }}
          </NuxtLink>
          <span class="comment__date text-sm opacity-50">{{ dateFormatter(comment.$createdAt) }}</span>
          <div v-if="comment.author === authStore.getID">
            <Icon 
            @click="action(comment.$id, 'del')" 
            name="material-symbols:delete-outline-sharp" 
            size="20" 
            class="comment__edit" />
            <Icon 
            @click="action(comment.$id, 'upd')" 
            name="line-md:edit" 
            size="20" 
            class="comment__delete" />
          </div>
        </div>
        <p class="comment__text mt-3">{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.comment__logo{
  @apply w-[30px] h-[30px] flex justify-center items-center rounded-full bg-slate-400
}
.comment__delete,
.comment__edit{
  @apply translate-x-full opacity-0 inline-block absolute top-0 right-0 hover:scale-110 transition-all cursor-pointer
}
.comment__delete{
  @apply right-0
}
.comment__edit{
  @apply right-[40px]
}
.comment:hover .comment__delete,
.comment:hover .comment__edit{
  @apply translate-x-0 opacity-100 transition-all
}
</style>