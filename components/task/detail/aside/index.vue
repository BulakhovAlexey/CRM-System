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
	<div class="task-view__aside aside border rounded-xl">
		<TaskDetailAsideDeadlines
			:taskId="task.$id"
			:created="task.$createdAt"
			:endDate="task.end_date"
		/>
		<div class="aside__users p-2">
			<TaskDetailAsideUsers :task="task" />
		</div>
	</div>
</template>
