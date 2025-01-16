<script setup lang="ts">
const props = defineProps({
	itemsCount: {
		type: Number || String,
		default: '',
	},
})
</script>

<template>
	<div class="comments__title">Комментарии ({{ itemsCount }})</div>
</template>

<style scoped>
.result__title {
	@apply text-sm mb-1;
}
</style>
