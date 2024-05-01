<template>
  <div class="user-list">
    <UTable 
    :columns="columns" 
    :rows="(list as IUserCell[])"
    :loading="pending"
    />
  </div>
</template>

<script setup lang="ts">
import type { IUserCell } from '~/types/types';
import { columns } from '~/seeders/user.columns.data';
import { dateFormatter } from '@/lib/supportFunctions'

const { data: list, pending } = await useLazyFetch('/api/getUsers', {
  transform: (list: IUserCell[]) => {
    return list.map(element => {
      element.$createdAt = dateFormatter(element.$createdAt)
      element.accessedAt = dateFormatter(element.accessedAt)
      element.labels = element.labels[0]
      return element
    })
  }
})

</script>
