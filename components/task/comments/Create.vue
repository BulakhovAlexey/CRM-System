<script setup lang="ts">
const props = defineProps({
	loading: {
		type: Boolean,
		default: false,
	},
	isEditAction: {
		type: Boolean,
		default: false,
	},
	commentToEditMessage: {
		type: String,
		default: '',
	},
	taskHasResult: {
		type: Boolean,
		required: true,
	},
})

const commentText = ref<string>('')
const isTaskResult = ref<boolean>(false)
const taskHasResultRef = ref<boolean>(false)

watch(
	() => props.commentToEditMessage,
	newVal => (commentText.value = newVal)
)
watch(
	() => props.taskHasResult,
	newVal => (taskHasResultRef.value = newVal)
)

const isEmptyComment = ref<boolean>(false)
const emit = defineEmits(['addComment'])

const commentAction = () => {
	isEmptyComment.value = false
	if (commentText.value.length !== 0) {
		emit('addComment', commentText.value, isTaskResult.value)
		commentText.value = ''
		isTaskResult.value = false
	} else {
		isEmptyComment.value = true
	}
}

watch(commentText, newVal =>
	newVal !== '' ? (isEmptyComment.value = false) : true
)
</script>

<template>
	<div class="create-comment flex flex-col gap-5 mt-7">
		<UFormGroup
			name="Комментарий"
			required
			label="Комментарий"
			:ui="{ label: { base: 'text-black' } }"
		>
			<UTextarea
				placeholder="Комментарий.."
				v-model="commentText"
				:rows="2"
				:autofocus="false"
			/>
			<UIAppearMessage
				:message="'Пустой комментарий!!'"
				:condition="isEmptyComment"
			/>
		</UFormGroup>
		<div class="create-comment__button flex justify-end items-end gap-5">
			<UCheckbox
				v-if="!taskHasResultRef"
				v-model="isTaskResult"
				name="notifications"
				label="отметить как результат"
				class="cursor-pointer hover:opacity-70 transition-all"
			/>
			<UButton :loading="props.loading" @click="commentAction">
				{{ isEditAction ? 'Изменить комментарий' : 'Добавить комментарий' }}
			</UButton>
		</div>
	</div>
</template>

<style scoped></style>
