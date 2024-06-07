<script setup lang="ts">
import type { IComment, IUser } from '~/types/types'
import { useComments } from './useComments'

const props = defineProps({
	taskID: {
		type: String as PropType<string>,
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
const { data: comments, isFetching, isPending } = getCommentsByTask

const addHandler = (commentText: string, isTaskResult: boolean) => {
	commentIsTaskResult.value = isTaskResult
	if (!isEditAction.value) {
		commentMessage.value = commentText
		addComment()
	} else {
		commentToEditMessage.value = commentText
		updateComment()
	}
}

const commentHandler = (comment: IComment, actionType: 'upd' | 'del') => {
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
</script>

<template>
	<div class="task-view__comments comments py-3">
		<div class="comments__title">
			Комментарии{{
				comments && comments.length > 0 ? `(${comments.length})` : ''
			}}
		</div>
		<div
			:class="{ fetching: isFetching || removingResult }"
			class="comments__body mt-4 transition-all"
		>
			<div
				v-if="comments && comments.length > 0"
				class="comments__items flex flex-col gap-5"
			>
				<div
					class="comments__result result p-3"
					v-if="resultCommentIndex !== null"
				>
					<div class="result__top flex justify-between items-center mb-2">
						<div class="result__title">Результат</div>
						<UBadge
							label="удалить результат"
							@click="removeResult"
							class="cursor-pointer bg-red-400 hover:scale-105 transition-all"
						/>
					</div>
					<TaskCommentsItem
						:isResult="resultCommentIndex && resultCommentIndex !== null"
						:comment="comments[resultCommentIndex]"
						:key="comments[resultCommentIndex].$id"
					/>
				</div>
				<TaskCommentsItem
					v-for="comment in comments"
					:comment="comment"
					@commentAction="commentHandler"
					:key="comment.$id"
				/>
			</div>
		</div>
		<TaskCommentsCreate
			:commentToEditMessage="commentToEditMessage"
			:isEditAction="isEditAction"
			:taskHasResult="resultCommentIndex !== null"
			:loading="isFetching"
			@addComment="addHandler"
		/>
	</div>
</template>

<style scoped>
.fetching {
	@apply blur-sm pointer-events-none transition-all;
}
.comments__result {
	@apply border rounded bg-orange-100 mb-2;
}
.result__title {
	@apply text-sm mb-1;
}
</style>
