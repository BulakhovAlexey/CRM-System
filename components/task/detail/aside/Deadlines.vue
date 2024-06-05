<script setup lang="ts">
import { dateFormatter } from '@/lib/supportFunctions'

const props = defineProps({
	created: {
		type: String,
		required: true,
	},
	endDate: {
		type: String,
		required: true,
	},
})
</script>

<template>
	<div class="aside__title bg-slate-600 text-stone-50 rounded-t-xl p-2 text-sm">
		Ожидает выполнения с {{ dateFormatter(props.created) }}
	</div>
	<div class="aside__row p-2 text-sm border-b mb-2">
		Крайний срок: {{ dateFormatter(props.endDate) }}
	</div>
</template>

<style scoped></style>
