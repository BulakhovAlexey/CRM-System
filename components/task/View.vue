<script setup lang="ts">
import { EnumStatus, type ITask, type IUser } from '~/types/types';
import { dateFormatter } from '@/lib/supportFunctions'
import { useQuery } from '@tanstack/vue-query';
import { DB } from '~/lib/appwrite';
import { COLLECTION_TASKS, DB_ID } from '~/DbConstants';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['updateStatus'])

const { data, isFetching } = useQuery({
  queryKey: ['get_task', props.id],
  queryFn: () => DB.getDocument(DB_ID, COLLECTION_TASKS, props.id)
})

const task = data as unknown as ITask
const users = ref<IUser[] | null>(null);
const loading = ref<boolean>(true)

onMounted(async () => {
  const response = await fetch('/api/getUsers');
  users.value = await response.json();
  loading.value = false
});

const getUserLabel = (executor: string): {name: string | '', position: string | ''} => {
  if (users.value) {
    const user = users.value.find(user => user.$id === executor);
    if(user){
      return {
        'name': user.name,
        'position': user.labels[0]
      }
    }
  }
  return {
    'name': '',
    'position': ''
  };
}

const statusChangeHandler = async (taskId: keyof Pick<ITask, '$id'> , newStatus: EnumStatus) => {
  emits('updateStatus', taskId, newStatus)
}

</script>

<template>
  <div v-if="isFetching">loading</div>
  <div v-else>
    <h2 class="task-view__title p-2 mb-3 border rounded-xl text-xl">{{ task.task_name }}</h2>
    <div class="task-view__inner flex gap-2 text-base">
      <div class="task-view__body flex-[60%] p-2 border rounded-xl overflow-scroll">
        <div class="task-view__item border-b py-3">
          <div class="task-view__status flex justify-start gap-3 items-center">
            <span>Статус:</span>
            <TaskStatusBadge :status="task.status" />
          </div>
        </div>
        <div class="task-view__item border-b py-3">
          <div class="task-view__text">
            Описание задачи:
          </div>
          <p class="task-view__value">{{ task.description }}</p>
        </div>
        <div class="task-view__item border-b py-3">
          <div class="task-view__group">Задача в группе (проекте): 
            <NuxtLink :to="`/groups/?q=${task.groups.name}`" class="opacity-60 hover:opacity-100 transition-all">{{ task.groups.name }}</NuxtLink>
          </div>
        </div>
        <TaskStatusButtons @statusChange="statusChangeHandler" :task="task"/>
        <div class="task-view__comments comments py-3">
          <TaskCommentsList :taskID="task.$id" :users="users" />
        </div>
      </div>
      <div class="task-view__aside aside border rounded-xl">
        <div class="aside__title bg-slate-600 text-stone-50 rounded-t-xl p-2 text-sm">
          Ожидает выполнения с {{ dateFormatter(task.$createdAt) }}
        </div>
        <div class="aside__row p-2 text-sm border-b mb-2">
          Крайний срок: {{ dateFormatter(task.end_date) }}
        </div>
        <div class="aside__users p-2">
          <div class="aside__task-owner opacity-80">Постановщик</div>
          <USkeleton v-if="loading" class="w-[200px] h-[25px]"/>
          <NuxtLink v-else class="mb-2 link" :to="`users/?q=${task.owner}`">
            {{ getUserLabel(task.owner).name }} 
            <span class="text-xs opacity-50">({{ getUserLabel(task.owner).position }})</span>
          </NuxtLink>
          <div class="aside__task-executor opacity-80">Исполнитель</div>
          <USkeleton v-if="loading" class="w-[200px] h-[25px]"/>
          <NuxtLink v-else class="link" :to="`users/?q=${task.executor}`">
            {{ getUserLabel(task.executor).name }} 
            <span class="text-xs opacity-50">({{ getUserLabel(task.executor).position }})</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link{
  @apply hover:opacity-50 transition-all
}
</style>