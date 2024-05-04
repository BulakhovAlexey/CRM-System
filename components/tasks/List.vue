<script setup lang="ts">
import type { IColumnTask, ITask } from '~/types/types';
import { useTasks } from './useTasks';
import { dateFormatter } from '~/lib/supportFunctions';

const { getBoard } = useTasks()
const { data, isFetching, refetch } = getBoard

</script>

<template>
  <TransitionGroup name="layout">
    <div v-if="isFetching" class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <Icon name="radix-icons:update" class="animate-spin" size="50" />
    </div>
    <div v-else  class="tasks">
      <div class="tasks__columns grid grid-cols-4 min-h-full">
        <div v-for="column in (data as IColumnTask[])"
          :key="column.id"
          class="task-column text-center flex flex-col"
        >
          <div 
          class="task-column__title border rounded-md border-cyan-800 py-1 mb-3 mx-1 bg-opacity-55"
          :class="column.color">
            {{ column.label }}({{ column.items.length }})
          </div>
          <div class="task-column__add flex gap-1 justify-center items-center overflow-hidden p-2 cursor-pointer">
            <Icon name="radix-icons:plus-circled" size="20" class="task-column__add-icon" />
            <span class="task-column__add-text text-nowrap inline-block overflow-hidden w-0 transition-all duration-300">Создать задачу</span>
          </div>
          <div class="task-column__body px-2 flex-1">
            <div class="task-column__items flex flex-col gap-4">
              <div 
              class="item border rounded-md p-2 cursor-pointer" 
              draggable="true" 
              v-for="task in column.items" 
              :key="task.$id">
                <div class="item__title mb-3 text-start">{{ task.task_name }}</div>
                <div class="item__badge flex justify-end">
                  <UBadge color="gray" :label="dateFormatter(task.end_date)" />
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<style scoped>
.task-column{
  min-height: calc(100vh - 64px - 24px);
}
.task-column{
  border-right: 0.5px solid gray;
}
.task-column:last-child{
  border-right: none;
}
.red{
  @apply bg-red-400
}
.green{
  @apply bg-green-400
}
.blue400{
  @apply bg-blue-200
}
.blue600{
  @apply bg-blue-400
}
.task-column__add:hover > .task-column__add-text{
  width: 130px;
  overflow: auto;
  opacity: 1;
  transition: all 0.4s ease 0s;
}
</style>