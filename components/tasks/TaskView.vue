<script setup lang="ts">
import type { ITask, IUser } from '~/types/types';
import { dateFormatter } from '@/lib/supportFunctions'

const taskStore = useSelectedTaskStore()
const task: ITask = taskStore.getTask
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

</script>

<template>
  <h2 class="task-view__title p-2 mb-3 border rounded-xl text-xl">{{ task.task_name }}</h2>
  <div class="task-view__inner flex gap-2 text-base">
    <div class="task-view__body flex-[60%] p-1 border rounded-xl">
      <div class="task-view__item border-b py-3">
        <div class="task-view__status">Статус: //todo статус</div>
      </div>
      <div class="task-view__item border-b py-3">
        <div class="task-view__text">
          Описание задачи:
        </div>
        <p class="task-view__value">{{ task.description }}</p>
      </div>
      <div class="task-view__item border-b py-3">
        <div class="task-view__group">Задача в группе (проекте): <span class="underline">{{ task.groups.name }}</span></div>
      </div>
      <div class="task-view__actions flex justify-between border-b py-3">
        <UButton>Завершить</UButton>
      </div>
      <div class="task-view__comments py-3">
        Коментс //todo
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
        <p v-else class="mb-2">{{ getUserLabel(task.owner).name }} <span class="text-xs opacity-50">({{ getUserLabel(task.owner).position }})</span></p>
        <div class="aside__task-executor opacity-80">Исполнитель</div>
        <USkeleton v-if="loading" class="w-[200px] h-[25px]"/>
        <p v-else class="">{{ getUserLabel(task.executor).name }} <span class="text-xs opacity-50">({{ getUserLabel(task.executor).position }})</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>