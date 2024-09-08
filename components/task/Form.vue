<script setup lang="ts">
import type { Executor, IGroup, ITask, IUser } from '~/types/types'
import { useGroupList } from '../group/useGroupList'
import { useDatePickerConfig } from '@/lib/supportFunctions'
import { useCreateTask } from './useCreateTask'
import { useSelectedTaskStore, type PropType } from '#imports'
import VueDatePicker from '@vuepic/vue-datepicker'
import { useIsEditTaskAction } from '~/stores/task.store'
import '@vuepic/vue-datepicker/dist/main.css'

const emits = defineEmits(['closeModal'])
const selectedTaskStore = useSelectedTaskStore()
const task: ITask = selectedTaskStore.getTask
const { format } = useDatePickerConfig()
const editActionStore = useIsEditTaskAction()

const {
	name,
	nameAttrs,
	description,
	descriptionAttrs,
	executorID,
	executorIDAttrs,
	groupID,
	groupIDAttrs,
	date,
	dateAttrs,
	errors,
	createTask,
	meta,
	creating,
	updating,
	created,
	updated,
} = useCreateTask()

const { getGroupsListSelector } = useGroupList()

const { data: groups, isFetching } = getGroupsListSelector()

const users = inject('users') as Ref<IUser[]>

const executors: Executor[] = []
users.value.forEach(user => {
	const executor: Executor = {
		id: user.$id,
		label: user.name,
	}
	executors.push(executor)
})

const closeModal = () => {
	emits('closeModal')
}
</script>

<template>
	<UCard class="bg-slate-500 relative">
		<template #header>
			<div class="create-task__top">
				<h3 class="create-task text-center flex-1 text-lg text-white">
					{{
						editActionStore.isEditAction
							? 'Редактировать задачу'
							: 'Создать задачу'
					}}
				</h3>
				<Icon
					@click="closeModal"
					name="radix-icons:cross-2"
					size="25"
					class="absolute top-1 right-2"
				/>
			</div>
		</template>
		<UForm :state="{}" @submit="createTask">
			<UFormGroup required label="Название" name="name" size="lg">
				<UInput
					autocomplete="off"
					:autofocus="true"
					v-model="name"
					immediate
					v-bind="nameAttrs"
					type="text"
				/>
				<UIAppearMessage
					:condition="errors.name !== undefined && errors.name.length > 0"
					:message="errors.name"
				/>
			</UFormGroup>
			<UFormGroup required label="Описание" name="description" size="lg">
				<UTextarea
					v-model="description"
					immediate
					v-bind="descriptionAttrs"
					type="text"
				/>
				<UIAppearMessage
					:condition="
						errors.description !== undefined && errors.description.length > 0
					"
					:message="errors.description"
				/>
			</UFormGroup>
			<UFormGroup required label="Группа" name="group" size="lg">
				<USkeleton v-if="isFetching" class="w-full h-[40px]" />
				<USelectMenu
					v-else
					v-model="groupID"
					v-bind="groupIDAttrs"
					class="cursor-pointer"
					:options="(groups as unknown as IGroup[])"
					placeholder="Выберите группу"
					value-attribute="id"
					option-attribute="label"
				/>
				<UIAppearMessage
					:condition="errors.group !== undefined && errors.group.length > 0"
					:message="errors.group"
				/>
			</UFormGroup>
			<UFormGroup required label="Исполнитель" name="executor" size="lg">
				<USelectMenu
					v-model="executorID"
					v-bind="executorIDAttrs"
					class="cursor-pointer"
					:options="(executors as Executor[])"
					placeholder="Выберите исполнителя"
					value-attribute="id"
					option-attribute="label"
				/>
				<UIAppearMessage
					:condition="
						errors.executor !== undefined && errors.executor.length > 0
					"
					:message="errors.executor"
				/>
			</UFormGroup>
			<UFormGroup required label="Дата готовности" name="date" size="lg">
				<VueDatePicker
					placeholder="Выберите дату"
					v-model="date"
					v-bind="dateAttrs"
					:disabled-week-days="[6, 0]"
					:format="format"
					:day-names="['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']"
				/>
				<UIAppearMessage
					:condition="errors.date !== undefined && errors.date.length > 0"
					:message="errors.date"
				/>
			</UFormGroup>
			<UButton
				:loading="updating || creating"
				:disabled="!meta.valid"
				type="submit"
				class="justify-center"
				>{{ editActionStore.isEditAction ? 'Сохранить' : 'Создать' }}
			</UButton>
		</UForm>
	</UCard>
</template>
