<script setup lang="ts">
const props = defineProps({
	important: {
		type: Boolean,
		default: false,
	},
	name: {
		type: String,
		required: true,
	},
})
</script>

<template>
	<div
		class="item__title text-start flex-1 flex justify-start items-center gap-2"
	>
		<TaskImportantLabel :important="props.important" />
		{{ props.name }}
	</div>
</template>

<style scoped></style>
