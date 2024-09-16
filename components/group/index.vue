<script setup lang="ts">
import type { IGroup } from '~/types/types'
import { useGroupList } from '~/components/group/useGroupList'
import { useSelectedGroupStore } from '~/stores/groups.store'
import { columns } from '~/seeders/group.columns.data'
import { useDeleteGroup } from './useDeleteGroup'
import { text } from './group.lang'

const route = useRoute()
const search = ref<string>('')
if (route.query.q && route.query.q.length > 0)
	search.value = route.query.q as string

const groupStore = useSelectedGroupStore()
const { getGroupsList } = useGroupList()
const { data: groups, isLoading, refetch, isFetching } = getGroupsList()

const deletePopupRef = ref<boolean>(false)
const showSlideOver = ref<boolean>(false)
const create = ref<boolean>(false)

const createGroup = () => {
	groupStore.clear()
	showSlideOver.value = true
	create.value = true
}

const editAction = (row: IGroup) => {
	create.value = false
	groupStore.set(row)
	showSlideOver.value = true
}

const deleteAction = (row: IGroup) => {
	groupStore.set(row)
	idRef.value = groupStore.getId
	deletePopupRef.value = true
}

const { deleteGroup, idRef } = useDeleteGroup(deletePopupRef, { refetch })

const updateData = () => {
	showSlideOver.value = !showSlideOver.value
	refetch()
}

const actions = (row: IGroup) => [
	[
		{
			label: text.labels.edit,
			icon: 'i-heroicons-pencil-square-20-solid',
			click: () => editAction(row),
		},
	],
	[
		{
			label: text.labels.delete,
			icon: 'i-heroicons-trash-20-solid',
			click: () => deleteAction(row),
		},
	],
]

const filteredRows = computed(() => {
	if (!search.value) {
		return groups.value?.documents
	}

	if (groups.value !== null) {
		return groups.value?.documents.filter(group => {
			return Object.values(group).some(value => {
				return String(value).toLowerCase().includes(search.value.toLowerCase())
			})
		})
	}
})
</script>

<template>
	<LoadingContainer v-if="isLoading || isFetching" />
	<div v-else>
		<div class="group__top">
			<UISearch v-model="search" />
			<UButton @click="createGroup" class="group__add self-end">{{
				text.createGroup
			}}</UButton>
		</div>

		<UTable
			:columns="columns"
			:rows="(filteredRows as unknown as IGroup[])"
			:loading="isLoading"
			:empty-state="{
				label: 'Ничего не найдено..',
				icon: 'i-heroicons-circle-stack-20-solid',
			}"
			:loading-state="{
				icon: 'i-heroicons-arrow-path-20-solid',
				label: 'Loading...',
			}"
			:progress="{ color: 'primary', animation: 'carousel' }"
			class="w-full"
		>
			<template #actions-data="{ row }">
				<UDropdown :items="actions(row)">
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-ellipsis-horizontal-20-solid"
					/>
				</UDropdown>
			</template>
		</UTable>

		<UModal v-model="deletePopupRef">
			<div class="p-4">
				<div class="popup__tittle text-center mb-4 text-2xl">
					Удалить группу "{{ groupStore.getName }}"?
				</div>
				<div class="popup__warning text-center mb-6" v-if="groupStore.isTasks">
					В группе есть <span class="text-red-600">активные</span> задачи они
					будут удалены. Необходимо подтверждение
				</div>
				<UButton @click="deleteGroup" class="mx-auto block">Удалить</UButton>
			</div>
		</UModal>

		<USlideover v-model="showSlideOver">
			<div class="p-4 flex-1 bg-slate-400">
				<GroupCreate v-if="create" @closeSlideOver="updateData" />
				<GroupEdit v-else @closeSlideOver="updateData" />
			</div>
		</USlideover>
	</div>
</template>

<style scoped>
.group__top {
	@apply flex justify-between items-center gap-2 cursor-pointer py-3.5 border-b border-gray-200 dark:border-gray-700;
}
</style>
