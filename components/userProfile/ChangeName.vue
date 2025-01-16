<script setup lang="ts">
import { useChangeName } from './useChangeName'

const props = defineProps({
	dividerOrientation: {
		type: String as PropType<'horizontal' | 'vertical'>,
		default: 'horizontal',
	},
})

const {
	name,
	nameAttrs,
	errors,
	isSubmitting,
	isSuccess,
	meta,
	messageRef,
	updateName,
} = useChangeName()
</script>

<template>
	<UDivider class="mt-4" label="Имя" :orientation="props.dividerOrientation" />
	<UForm :state="{}" @submit="updateName" class="flex flex-col gap-2 py-2">
		<UFormGroup required label="Имя" name="name" size="lg">
			<UInput v-model="name" immediate v-bind="nameAttrs" type="text" />
			<UIAppearMessage
				:condition="errors.name !== undefined && errors.name.length > 0"
				:message="errors.name"
			/>
			<UIAppearMessage
				:color="isSuccess ? 'text-green-600' : 'text-red-600'"
				:condition="messageRef.length > 0"
				:message="messageRef"
			/>
		</UFormGroup>
		<UButton
			:disabled="!meta.valid"
			class="my-3 inline-flex justify-center"
			type="submit"
			:loading="isSubmitting"
			>Изменить имя</UButton
		>
	</UForm>
</template>

<style scoped></style>
