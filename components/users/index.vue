<script setup lang="ts">
import type { IUserCell } from '~/types/types'
import { columns } from '~/seeders/user.columns.data'
import { dateFormatter } from '@/lib/supportFunctions'

const route = useRoute()
const searchValue = ref<string>('')

if (route.query.q && route.query.q.length > 0) {
	searchValue.value = route.query.q as string
}

const { data: list, pending } = await useAsyncData('users', () =>
	$fetch<IUserCell[]>('/api/getUsers').then(users => {
		return users.map(element => {
			element.$createdAt = dateFormatter(element.$createdAt)
			element.accessedAt = dateFormatter(element.accessedAt)
			element.labels = element.labels[0]
			return element
		})
	})
)
</script>

<template>
	<LoadingContainer v-if="pending" />
	<div v-else class="user-list">
		<div class="user-list__top py-3">
			<UISearch v-model="searchValue" />
		</div>
		<UISortableTable
			:searchValue="searchValue"
			:data="(list as IUserCell[])"
			:columns="columns"
		/>
	</div>
</template>
