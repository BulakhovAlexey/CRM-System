<script setup lang="ts">
import type { ITableColumn } from '~/types/types'

const props = defineProps({
	searchValue: {
		type: String,
		default: '',
	},
	data: {
		required: true,
		validator: (value: any) =>
			Array.isArray(value) || typeof value === 'object',
	},
	columns: {
		type: Array as PropType<ITableColumn[]>,
		required: true,
	},
})

const filteredRows = computed(() => {
	const data = props.data

	if (!props.searchValue || !data) {
		return data
	}

	if (Array.isArray(data)) {
		return data.filter(user => {
			return Object.values(user).some(value => {
				if (typeof value === 'string' || typeof value === 'number') {
					return String(value)
						.toLowerCase()
						.includes(props.searchValue.toLowerCase())
				}
				return false
			})
		})
	}

	return data
})
</script>

<template>
	<UTable
		:columns="columns"
		:empty-state="{
			label: 'Измените параметры поиска...',
			icon: 'i-heroicons-circle-stack-20-solid',
		}"
		:rows="(filteredRows as [])"
		:progress="{ color: 'primary', animation: 'carousel' }"
	>
	</UTable>
</template>
