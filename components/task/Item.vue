<script setup lang="ts">
import type { ITask } from '~/types/types'

const props = defineProps({
	task: {
		type: Object as PropType<ITask>,
		required: true,
	},
})
</script>

<template>
	<div class="item__top">
		<TaskTitle :name="task.task_name" :important="task.isImportant" />
		<TaskActions :task="task" />
	</div>
	<div class="item__badges mb-2 flex justify-end">
		<TaskUserBlock :task="task" />
	</div>
	<div class="item__date flex justify-between">
		<TaskTerm :term="task.end_date" />
		<TaskStatusBadge :status="task.status" :showTitle="false" />
	</div>
</template>

<style scoped>
.item__top {
	@apply flex justify-between items-center mb-3;
}
</style>
