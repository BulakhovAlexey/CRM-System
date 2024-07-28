<script setup lang="ts">
import { EnumStatus } from '~/types/types'

const filterStatus = defineModel({ type: String })
const showMyTasks = inject('showMyTasks') as Ref<boolean>

const options = [
	'все',
	EnumStatus.in_process,
	EnumStatus.control,
	EnumStatus.done,
]
</script>

<template>
	<div class="pb-2 text-center flex items-center gap-10">
		<USelectMenu
			class="max-w-[150px] w-full"
			v-model="filterStatus"
			:options="options"
			placeholder="Select status"
		/>
		<div class="toggle flex items-center gap-2">
			<div class="cursor-pointer" @click="showMyTasks = !showMyTasks">Мои</div>
			<UToggle size="sm" v-model="showMyTasks" />
		</div>
	</div>
</template>

<style scoped></style>
