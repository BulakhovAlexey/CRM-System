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
const { date, format, startTime } = useDatePickerConfig()
const isEditActionStore = useIsEditTaskAction()

const {
	name,
	nameAttrs,
	description,
	descriptionAttrs,
	executorRef,
	groupRef,
	errors,
	createTask,
	meta,
	creating,
	updating,
	created,
	updated,
} = useCreateTask(date)

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
						isEditActionStore.isEditAction
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
			<UFormGroup required label="Группа" size="lg">
				<USkeleton v-if="isFetching" class="w-full h-[40px]" />
				<USelectMenu
					v-else
					v-model="groupRef"
					class="cursor-pointer"
					:options="(groups as unknown as IGroup[])"
					placeholder="Выберите группу"
					value-attribute="id"
					option-attribute="label"
				/>
			</UFormGroup>
			<UFormGroup required label="Исполнитель" size="lg">
				<!-- <USkeleton v-if="pending" class="w-full h-[40px]" /> -->
				<USelectMenu
					v-model="executorRef"
					class="cursor-pointer"
					:options="(executors as Executor[])"
					placeholder="Выберите исполнителя"
					value-attribute="id"
					option-attribute="label"
				/>
			</UFormGroup>
			<UFormGroup required label="Дата готовности" name="end_date" size="lg">
				<VueDatePicker
					no-minutes-overlay
					placeholder="Выберите дату"
					:enable-minutes="false"
					v-model="date"
					:format="format"
					:day-names="['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']"
				/>
				<!-- :disabled-week-days="[6, 0]"  -->
			</UFormGroup>
			<UButton
				:loading="updating || creating"
				type="submit"
				class="justify-center"
				>{{ isEditActionStore.isEditAction ? 'Сохранить' : 'Создать' }}
			</UButton>
		</UForm>
	</UCard>
</template>
