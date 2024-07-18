<script setup lang="ts">
import { EnumStatus } from '~/types/types'

const filterStatus = defineModel()

const options = [
	'все',
	EnumStatus.in_process,
	EnumStatus.control,
	EnumStatus.done,
]
</script>

<template>
	<div class="pb-2 max-w-[150px] text-center">
		<UFormGroup label="Статус задач" size="sm">
			<USelectMenu
				v-model="filterStatus"
				:options="options"
				placeholder="Select status"
			/>
		</UFormGroup>
	</div>
</template>

<style scoped></style>
