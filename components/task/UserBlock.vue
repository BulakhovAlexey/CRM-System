<script setup lang="ts">
import type { PropType } from 'vue'
import type { ITask } from '~/types/types'

const props = defineProps({
	task: {
		type: Object as PropType<ITask>,
		required: true,
	},
})
</script>

<template>
	<div class="item__users flex justify-start items-center gap-2">
		<TaskUserLabel :userID="task.owner" />
		<Icon name="radix-icons:arrow-right" size="17" />
		<TaskUserLabel :userID="task.executor" />
	</div>
</template>

<style scoped></style>
