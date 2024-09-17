<script setup lang="ts">
const props = defineProps({
	important: {
		type: Boolean,
		default: false,
	},
	color: {
		type: String,
		default: 'red',
	},
	size: {
		type: String,
		default: '15',
	},
})
</script>

<template>
	<UTooltip v-if="props.important" text="Важная задача">
		<Icon name="game-icons:flame" :size="size" :color="color" />
	</UTooltip>
</template>

<style scoped></style>
