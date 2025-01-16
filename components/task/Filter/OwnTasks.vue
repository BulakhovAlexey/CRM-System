<script setup lang="ts">
const showOwnTasks = inject('showOwnTasks') as Ref<boolean>
</script>

<template>
	<div class="toggle flex items-center gap-2">
		<div class="cursor-pointer" @click="showOwnTasks = !showOwnTasks">
			Только мои
		</div>
		<UToggle size="sm" v-model="showOwnTasks" />
	</div>
</template>

<style scoped></style>
