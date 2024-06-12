<script setup lang="ts">
import type { PropType } from 'vue'
import type { ITask, IUser } from '~/types/types'

const props = defineProps({
	task: {
		type: Object as PropType<Pick<ITask, 'owner' | 'executor'>>,
		required: true,
	},
})

const users = inject('users') as Ref<IUser[]>
const loading = inject('loading') as Ref<Boolean>

function getUserLabel(executor: string): {
	name: string | ''
	position: string | ''
} {
	if (users) {
		const user = users.value.find(user => user.$id === executor)
		if (user) {
			return {
				name: user.name,
				position: user.labels[0],
			}
		}
	}
	return {
		name: '',
		position: '',
	}
}

const getLink = ($id: string): string => {
	return `users/?q=${$id}`
}
</script>

<template>
	<div class="flex flex-col gap-1">
		<div class="aside__task-owner opacity-80">Постановщик</div>
		<USkeleton v-if="loading" class="w-[200px] h-[25px]" />
		<NuxtLink
			v-else
			class="mb-2 link p-1 border rounded"
			:to="getLink(task.owner)"
		>
			{{ getUserLabel(task.owner).name }}
			<span class="text-xs opacity-50">
				({{ getUserLabel(task.owner).position }})
			</span>
		</NuxtLink>
		<div class="aside__task-executor opacity-80">Исполнитель</div>
		<USkeleton v-if="loading" class="w-[200px] h-[25px]" />
		<NuxtLink
			v-else
			class="link p-1 border rounded"
			:to="getLink(task.executor)"
		>
			{{ getUserLabel(task.executor).name }}
			<span class="text-xs opacity-50">
				({{ getUserLabel(task.executor).position }})
			</span>
		</NuxtLink>
	</div>
</template>

<style scoped>
.link {
	@apply hover:opacity-60 transition-all;
}
</style>
