<script setup lang="ts">
import type { PropType } from 'vue'
import type { ITask, IUser } from '~/types/types'

const props = defineProps({
	task: {
		type: Object as PropType<Pick<ITask, 'owner' | 'executor'>>,
		required: true,
	},
	users: {
		type: Object as PropType<IUser[] | null>,
		default: null,
	},
})

function getUserLabel(executor: string): {
	name: string | ''
	position: string | ''
} {
	if (props.users) {
		const user = props.users.find(user => user.$id === executor)
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
	<div class="aside__task-owner opacity-80">Постановщик</div>
	<USkeleton v-if="users === null" class="w-[200px] h-[25px]" />
	<NuxtLink v-else class="mb-2 link" :to="getLink(task.owner)">
		{{ getUserLabel(task.owner).name }}
		<span class="text-xs opacity-50">
			({{ getUserLabel(task.owner).position }})
		</span>
	</NuxtLink>
	<div class="aside__task-executor opacity-80">Исполнитель</div>
	<USkeleton v-if="users === null" class="w-[200px] h-[25px]" />
	<NuxtLink v-else class="link" :to="getLink(task.executor)">
		{{ getUserLabel(task.executor).name }}
		<span class="text-xs opacity-50">
			({{ getUserLabel(task.executor).position }})
		</span>
	</NuxtLink>
</template>
