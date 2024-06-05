<script setup lang="ts">
import type { IColumnTask } from '~/types/types'

const props = defineProps({
	column: {
		type: Object as PropType<IColumnTask>,
		required: true,
	},
})
</script>

<template>
	<div class="task-column__title" :class="column.color">
		{{ column.label }}({{ column.items.length }})
	</div>
</template>

<style scoped>
.task-column__title {
	@apply border rounded-md border-cyan-800 py-1 mb-3 mx-1 bg-opacity-55;
}
.red {
	@apply bg-red-400;
}
.green {
	@apply bg-green-400;
}
.blue400 {
	@apply bg-blue-200;
}
.blue600 {
	@apply bg-blue-400;
}
</style>
