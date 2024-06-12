<script setup lang="ts">
import type { IComment } from '~/types/types'
import { EnumStatus } from '~/types/types'
import { useComments } from './useComments'

const props = defineProps({
	taskID: {
		type: String as PropType<string>,
		required: true,
	},
	taskStatus: {
		type: String as PropType<EnumStatus>,
		required: true,
	},
})

const {
	getCommentsByTask,
	addComment,
	commentMessage,
	deleteComment,
	commentToDel,
	commentToEditID,
	commentToEditMessage,
	updateComment,
	isEditAction,
	resultCommentIndex,
	commentIsTaskResult,
	removeResult,
	removingResult,
} = useComments(props.taskID)
const { data: comments, isFetching } = getCommentsByTask

const addCommentHandler = (commentText: string, isTaskResult: boolean) => {
	commentIsTaskResult.value = isTaskResult
	if (!isEditAction.value) {
		commentMessage.value = commentText
		addComment()
	} else {
		commentToEditMessage.value = commentText
		updateComment()
	}
}

const commentActionHandler = (comment: IComment, actionType: 'upd' | 'del') => {
	switch (actionType) {
		case 'del':
			commentToDel.value = comment.$id
			deleteComment()
			break
		case 'upd':
			isEditAction.value = true
			commentToEditID.value = comment.$id
			commentToEditMessage.value = comment.text
			break
		default:
			throw new Error('Unknown action in child component')
	}
}

const cancelEditHandler = () => {
	isEditAction.value = !isEditAction.value
	commentToEditMessage.value = ''
}

const toast = useToast()
const isDisabled = ref<boolean>(false)
const removeResultErrorText = 'Ошибка!'
const removeResultErrorDescription = `У задачи в статусе - "${props.taskStatus}" нельзя удалить результат..`
const removeResultAction = () => {
	if (props.taskStatus === EnumStatus.in_process) {
		removeResult()
	} else {
		isDisabled.value = true
		toast.add({
			title: removeResultErrorText,
			description: removeResultErrorDescription,
			callback: () => (isDisabled.value = false),
		})
	}
}
</script>

<template>
	<div class="task-view__comments comments py-3">
		<div v-if="comments && comments.length > 0" class="">
			<TaskCommentsTitle :itemsCount="comments.length" />
			<div
				:class="{ fetching: isFetching || removingResult }"
				class="comments__body mt-4 transition-all"
			>
				<div class="comments__items flex flex-col gap-5">
					<TaskCommentsResult
						v-if="resultCommentIndex !== null"
						:resultComment="comments[resultCommentIndex]"
						@removeResultEmit="removeResultAction"
						v-model="isDisabled"
					/>
					<TaskCommentsItem
						v-for="comment in comments"
						:comment="comment"
						@commentAction="commentActionHandler"
						:key="comment.$id"
					/>
				</div>
			</div>
		</div>
		<TaskCommentsCreate
			:commentToEditMessage="commentToEditMessage"
			:isEditAction="isEditAction"
			:taskHasResult="resultCommentIndex !== null"
			:loading="isFetching"
			@addComment="addCommentHandler"
			@cancelEditAction="cancelEditHandler"
		/>
	</div>
</template>

<style scoped>
.fetching {
	@apply blur-sm pointer-events-none transition-all;
}
</style>
