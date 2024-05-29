<script setup lang="ts">
import { EnumStatus, type ITask } from '~/types/types';
import { useAuthStore } from '@/stores/auth.store';
import { useComments } from './comments/useComments';

const authStore = useAuthStore()

const emits = defineEmits(['statusChange'])

const props = defineProps({
  task: {
    type: Object as PropType<ITask>,
    required: true,
  }
})
const { resultCommentID } = useComments(props.task.$id)

const toast = useToast()
const isOwner = authStore.getID === props.task.owner
const isStartStatus = ref<boolean>(props.task.status === EnumStatus.in_process)
const isDoneStatus = ref<boolean>(props.task.status === EnumStatus.done)

const showNotification = (text: string) => {
  toast.add({ title: text })
}

const action = (newStatus: EnumStatus) => {
  if(resultCommentID.value == null){
    let text = ''
    switch (newStatus) {
      case EnumStatus.control:
        text = 'Нужен результат!'
        break;
      case EnumStatus.done:
        text = 'Задача еще не выполнена!'
        break;
      default:
        break;
    }
    showNotification(text)
    return false
  }
  emits('statusChange', props.task.$id, newStatus)
}

</script>

<template>
  <div v-if="isOwner" class="task-view__actions gap-4">
    <UButton 
      v-if="!isStartStatus || isDoneStatus" 
      @click="action(EnumStatus.in_process)" 
      color="lime"
    >
      Вернуть в работу
    </UButton>
    <UButton 
      v-if="!isDoneStatus" 
      @click="action(EnumStatus.done)"
      color="gray"
    >
      Завершить
    </UButton>
  </div>
  <div v-else class="task-view__actions">
    <UButton 
      v-if="isStartStatus"
      @click="action(EnumStatus.control)"
      color="amber"
    >
      На контроль
    </UButton>
    <UButton 
    v-else 
      @click="action(EnumStatus.in_process)" 
      color="lime"
    >
      Вернуть в работу
    </UButton>
  </div>
</template>

<style scoped>
.task-view__actions{
  @apply flex justify-end gap-4 border-b py-3
}
</style>