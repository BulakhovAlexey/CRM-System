<script setup lang="ts">
import type { PropType } from 'vue'
import { EnumStatus } from '~/types/types'

const getTaskStatusColor = (status: EnumStatus): string => {
	switch (status) {
		case EnumStatus.in_process:
			return 'lime'
		case EnumStatus.control:
			return 'amber'
		case EnumStatus.done:
			return 'gray'
	}
}
const props = defineProps({
	status: {
		type: String as PropType<EnumStatus>,
		required: true,
	},
	showTitle: {
		type: Boolean,
		default: true,
	},
})
</script>

<template>
	<div v-if="showTitle" class="task-view__item border-b py-3">
		<div class="task-view__status flex justify-start gap-3 items-center">
			<span>Статус:</span>
			<UBadge :color="getTaskStatusColor(status)" :label="status" />
		</div>
	</div>
	<UBadge v-else :color="getTaskStatusColor(status)" :label="status" />
</template>

<style scoped></style>
