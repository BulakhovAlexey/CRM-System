<script setup lang="ts">
import type { PropType } from 'vue'
import type { ITask, IUser } from '~/types/types'

const props = defineProps({
	userID: {
		type: String as PropType<ITask['owner'] | ITask['executor']>,
		required: true,
	},
})
const loading = inject('loading') as Ref<boolean>
const users = inject('users') as Ref<IUser[]>

const getUserLabel = (executor: string): string => {
	if (users.value) {
		const user = users.value.find(user => user.$id === executor)
		return user ? user.name : ''
	}
	return ''
}
</script>

<template>
	<USkeleton v-if="loading" class="w-[45px] h-[24px]" />
	<UBadge v-else color="gray" :label="getUserLabel(userID)" />
</template>

<style scoped></style>
