<script setup lang="ts">
import { dateFormatter } from '@/lib/supportFunctions'
import VueDatePicker from '@vuepic/vue-datepicker'
import { useDatePickerConfig } from '@/lib/supportFunctions'
import { useDeadLineChanges } from './useDeadLineChanges'

const props = defineProps({
	taskId: {
		type: String,
		required: true,
	},
	created: {
		type: String,
		required: true,
	},
	endDate: {
		type: String,
		required: true,
	},
})

const { date, format, startTime } = useDatePickerConfig()
const { mutate: updateDeadLine, taskID, isPending } = useDeadLineChanges(date)

watch(date, (date, prevDate) => {
	taskID.value = props.taskId
	date !== undefined ? updateDeadLine() : false
})
</script>

<template>
	<div class="aside__title bg-slate-600 text-stone-50 rounded-t-xl p-2 text-sm">
		Ожидает выполнения с {{ dateFormatter(props.created) }}
	</div>
	<div class="aside__row p-2 text-sm border-b mb-2">
		<span class="inline-block mb-2">Крайний срок:</span>
		<Transition name="appear">
			<VueDatePicker
				v-if="!isPending"
				:placeholder="dateFormatter(props.endDate)"
				:enable-minutes="true"
				v-model="date"
				:format="format"
				:day-names="['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']"
			/>
			<USkeleton v-else class="h-[38px] w-full" />
		</Transition>
	</div>
</template>

<style scoped></style>
