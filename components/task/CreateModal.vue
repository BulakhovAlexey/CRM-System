<script setup lang="ts">
const isOpen = ref<boolean>(false)

const closeModal = () => {
	isOpen.value = false
}
</script>

<template>
	<div
		@click="isOpen = !isOpen"
		class="create-task__add flex gap-1 justify-center items-center overflow-hidden p-2 cursor-pointer"
	>
		<Icon
			name="radix-icons:plus-circled"
			size="20"
			class="create-task__add-icon text-slate-700"
		/>
		<span
			class="create-task__add-text text-slate-700 text-nowrap inline-block overflow-hidden w-0 transition-all duration-300"
			>Создать задачу</span
		>
	</div>
	<UModal v-model="isOpen" prevent-close>
		<div class="p-4 bg-slate-500 rounded">
			<TaskForm @closeModal="closeModal" />
		</div>
	</UModal>
</template>

<style scoped>
.create-task__add:hover > .create-task__add-text {
	width: 130px;
	overflow: auto;
	opacity: 0.8;
	transition: all 0.4s ease 0s;
}

.create-task__add:hover > .create-task__add-icon {
	transform: scale(1.2);
	opacity: 0.8;
	transition: all 0.4s ease 0s;
}
</style>
