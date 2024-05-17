<script setup lang="ts">
import type { Executor, IGroup } from '~/types/types';
import { useGroupList } from '../group/useGroupList';
import { useDatePickerConfig } from '@/lib/supportFunctions'
import { useCreateTask } from './useCreateTask';
import { useSelectedTaskStore, type PropType } from '#imports';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  editTask: {
    type: Boolean,
    default: false
  },
})

const selectedTaskStore = useSelectedTaskStore()

const task = selectedTaskStore.getTask

const { date, format, startTime } = useDatePickerConfig()

const { name, nameAttrs, description, descriptionAttrs, executorRef, groupRef, errors, createTask, meta, creating, updating, created, updated } = useCreateTask(date, props.editTask)

const { getGroupsListSelector } = useGroupList()

const { data: groups, isFetching } = getGroupsListSelector()

const { data : executors, pending } = useFetch('/api/getUsers',{
  transform: (data) => {
    const executors: Executor[] = []
    data.forEach(user => {
      const executor: Executor = {
        id: user.$id,
        label: user.name
      }
      executors.push(executor)
    })
    return executors
  }
})

</script>

<template>
  <UCard class="bg-slate-500">
    <template #header>
      <h3 class="create-task text-center text-lg text-white">{{ editTask ? "Редактировать задачу" : 'Создать задачу' }}</h3>
    </template>
    <UForm :state="{}" @submit="createTask" class="flex flex-col gap-3">
      <UFormGroup required label="Название" name="name" size="lg">
        <UInput autocomplete="off" v-model="name" immediate v-bind="nameAttrs" type="text" />
        <UIAppearMessage :condition="errors.name !== undefined && errors.name.length > 0" :message="errors.name"/>
      </UFormGroup>
      <UFormGroup required label="Описание" name="description" size="lg">
        <UTextarea v-model="description" immediate v-bind="descriptionAttrs" type="text" />
        <UIAppearMessage :condition="errors.description !== undefined && errors.description.length > 0" :message="errors.description"/>
      </UFormGroup>
      <UFormGroup required label="Группа" size="lg">
        <USkeleton v-if="isFetching" class="w-full h-[40px]" />
        <USelectMenu
          v-else
          v-model="groupRef"
          class="cursor-pointer"
          :options="(groups as unknown as IGroup[])"
          placeholder="Выберите группу"
          value-attribute="id"
          option-attribute="label"/>
      </UFormGroup>
      <UFormGroup required label="Исполнитель" size="lg">
        <USkeleton v-if="pending" class="w-full h-[40px]" />
        <USelectMenu
          v-else
          v-model="executorRef"
          class="cursor-pointer"
          :options="(executors as Executor[])"
          placeholder="Выберите исполнителя"
          value-attribute="id"
          option-attribute="label"/>
      </UFormGroup>
    <UFormGroup required label="Дата готовности" name="end_date" size="lg">
      <VueDatePicker 
      no-minutes-overlay
      placeholder="Выберите дату"
      :enable-minutes="false"
      v-model="date" 
      :format="format"
      :disabled-week-days="[6, 0]" 
      :day-names="['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']"
      />
    </UFormGroup>
    <UButton :loading="updating || creating" type="submit" class="justify-center">{{ editTask ? 'Сохранить' : 'Создать' }}</UButton>
    </UForm>
  </UCard>
</template>


<style scoped>

</style>