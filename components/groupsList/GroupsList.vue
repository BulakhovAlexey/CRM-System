<template>
  <div v-if="isLoading">Loading&&&</div>
  <div v-else>
    <UTable :columns="columns" 
    :rows="(data?.documents as unknown as IGroup[])"
    :loading="isLoading"
    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
    :progress="{ color: 'primary', animation: 'carousel' }"
    class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import type { IGroup, ITask } from '~/types/types';
import { getGroupList } from '@/components/groupsList/useGroupList'
import { columns } from '~/seeders/group.columns.data';

const { data, isLoading } = getGroupList()

</script>

<style scoped>
</style>
