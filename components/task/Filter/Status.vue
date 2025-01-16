<script setup lang="ts">
import { EnumStatus } from '~/types/types'

const filterStatus = inject('filterStatus') as Ref<String>

const options = [
	'все',
	EnumStatus.in_process,
	EnumStatus.control,
	EnumStatus.done,
]
</script>

<template>
	<USelectMenu
		class="max-w-[150px] w-full"
		v-model="filterStatus"
		:options="options"
		placeholder="Select status"
	/>
</template>

<style scoped></style>
