<template>
  <div>
    <UTable :columns="columns" 
    :rows="(data?.documents as unknown as IGroup[])"
    :loading="isLoading"
    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
    :progress="{ color: 'primary', animation: 'carousel' }"
    class="w-full"
    >

    <template #actions-data="{ row }">
      <UDropdown :items="actions(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>

  </UTable>
  </div>
</template>

<script setup lang="ts">
import type { IGroup } from '~/types/types';
import { useGroupList } from '~/components/group/useGroupList'
import { columns } from '~/seeders/group.columns.data';

//const { data, isLoading, isPending } = useGroupList()
const { getGroupsList } = useGroupList()

const { data, isLoading } = getGroupsList()

const router = useRouter()

const actions = (row: IGroup) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => router.push(`edit-group-${row.$id}`)
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid'
  }]
]

</script>

<style scoped>
</style>
