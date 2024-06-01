<script setup lang="ts">
import type { PropType } from 'vue';
import type { ITask, IUser } from '~/types/types';

const props = defineProps({
  task: {
    type: Object as PropType<ITask>,
    required: true
  },
  users: {
    type: Object as PropType<IUser[] | null>,
    default: null
  }
})
</script>


<template>
  <div class="task-view__aside aside border rounded-xl">
    <TaskDetailAsideDeadlines :created="task.$createdAt" :endDate="task.end_date"/>
    <div class="aside__users p-2">
      <TaskDetailAsideUsers :task="task" :users="users"/>
    </div>
  </div>
</template>
