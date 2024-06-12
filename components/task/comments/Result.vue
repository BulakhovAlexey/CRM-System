<script setup lang="ts">
import type { PropType } from 'vue'
import type { IComment } from '~/types/types'

const emits = defineEmits(['removeResultEmit'])
const isDisabled = defineModel()
const props = defineProps({
	resultCommentIndex: {
		type: String,
	},
	resultComment: {
		type: Object as PropType<IComment>,
	},
})
const removeResultHandler = () => emits('removeResultEmit')
</script>

<template>
	<div class="comments__result result p-3">
		<div class="result__top flex justify-between items-center mb-2">
			<div class="result__title">Результат</div>
			<UBadge
				label="Удалить результат"
				@click="removeResultHandler"
				:class="{ disabled: isDisabled }"
				class="cursor-pointer bg-red-400 hover:scale-105 transition-all"
			/>
		</div>
		<TaskCommentsItem
			:isResult="resultCommentIndex && resultCommentIndex !== null"
			:comment="resultComment"
			:key="resultComment?.$id"
		/>
	</div>
</template>

<style scoped>
.comments__result {
	@apply border rounded bg-orange-100 mb-2;
}
.disabled {
	@apply pointer-events-none opacity-50;
}
</style>
