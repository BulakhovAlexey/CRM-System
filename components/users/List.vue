<script setup lang="ts">
import type { IUserCell } from '~/types/types';
import { columns } from '~/seeders/user.columns.data';
import { dateFormatter } from '@/lib/supportFunctions'

const route = useRoute()

const search = ref<string>('')

if(route.query.q && route.query.q.length > 0) search.value = route.query.q as string

const { data: list, pending } = await useFetch('/api/getUsers', {
  transform: (list: IUserCell[]) => {
    return list.map(element => {
      element.$createdAt = dateFormatter(element.$createdAt)
      element.accessedAt = dateFormatter(element.accessedAt)
      element.labels = element.labels[0]
      return element
    })
  }
})

const selected = ref('')

const filteredRows = computed(() => {
  if (!search.value) {
    return list.value
  }

  if(list.value !== null){
    return list.value.filter((user) => {
      return Object.values(user).some((value) => {
        return String(value).toLowerCase().includes(search.value.toLowerCase())
      })
    })
  }
})

const select = (row: IUserCell) => {
  console.log(row);
}

</script>

<template>
  <div class="user-list">
    <!-- todo loader -->
    <div v-if="pending" class="">LOADING.....</div>
    <div v-else>
      <div class="flex items-center gap-2 cursor-pointer px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
        <UISearch v-model="search" />
      </div>
      <UTable
      :columns="columns" 
      :empty-state="{ label: 'Ничего не найдено..' , icon : 'i-heroicons-circle-stack-20-solid' }"
      :rows="(filteredRows as IUserCell[])"
      @select="select"
      :loading="pending"
      >
      </UTable>
    </div>
  </div>
</template>

<style scoped>
tr{
  @apply hover:bg-black
}
</style>