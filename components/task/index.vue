<script setup lang="ts">
import type { IColumnTask } from '~/types/types'
import { useTasks } from './useTasks'

const { getBoard } = useTasks()
const { data, isFetching } = getBoard
</script>

<template>
	<TransitionGroup name="appear">
		<LoadingContainer v-if="isFetching" />
		<div v-else class="tasks">
			<div class="tasks__columns grid grid-cols-4 min-h-full">
				<div
					v-for="column in (data as IColumnTask[])"
					:key="column.id"
					class="task-column text-center flex flex-col"
				>
					<TaskColumnTitle :column="column" />
					<TaskCreateModal />
					<TaskList :tasks="column.items" />
				</div>
			</div>
		</div>
	</TransitionGroup>
</template>

<style scoped>
.task-column {
	min-height: calc(100vh - 64px - 24px);
}
.task-column {
	border-right: 0.5px solid gray;
}
.task-column:last-child {
	border-right: none;
}
</style>
