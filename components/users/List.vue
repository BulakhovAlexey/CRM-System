<template>
  <pre>
  </pre>
  <div class="user-list">
    <div class="user-list__inner p-3 w-full flex-col">
      <div class="user-list__head flex p-3 justify-between items-center gap-4 border-y border-tableBorder">
        <div class="user-list__cell" v-for="headCell in columns" :key="headCell.key">
          {{ headCell.label }}
          <span v-if="headCell.sortable">
            <Icon name="i-heroicons-bars-arrow-up-20-solid" size="20" />
            <Icon name="i-heroicons-bars-arrow-up-20-solid" size="20" />
            <Icon name="i-heroicons-bars-arrow-down-20-solid" size="20" />
          </span>
        </div>
      </div>
      <div class="user-list__row px-3 py-4 flex border-b border-tableBorder justify-between items-center gap-4" v-for="user in (data.data.value?.users as unknown as IUserCell[])">
        <div class="user-list__cell">{{ user.name }}</div>
        <div class="user-list__cell">{{ user.email }}</div>
        <div class="user-list__cell">{{ (user.labels?.length == 1) ? (user.labels[0].toLocaleUpperCase()) : '' }}</div>
        <div class="user-list__cell">{{ dateFormatter(user.$createdAt) }}</div>
        <div class="user-list__cell">{{ dateFormatter(user.accessedAt) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUserCell } from '~/types/types';
import { columns } from '~/seeders/user.columns.data';
import { dateFormatter } from '@/lib/supportFunctions'

const data = await useFetch('/api/getUsers')



</script>

<style scoped>
.user-list__cell{
  flex: 0 1 200px;
  text-align: left;
}
</style>