<script setup lang="ts">
import type { ITask } from '~/types/types'

const props = defineProps({
	tasks: {
		type: Object as PropType<ITask[]>,
		required: true,
	},
})
</script>

<template>
	<div class="task-column__body px-2">
		<div class="task-column__items flex flex-col gap-4">
			<div class="item" draggable="true" v-for="task in tasks" :key="task.$id">
				<TaskItem :task="task" />
			</div>
		</div>
	</div>
</template>

<style scoped>
.task-column__body {
	flex: 0 1 calc(100vh - 245px);
	overflow-y: auto;
}
.task-column__items {
	@apply h-full overflow-auto;
}
.item {
	@apply border rounded-md p-2 scale-95 cursor-pointer hover:scale-100 transition-all bg-textMain bg-opacity-55;
}
</style>
