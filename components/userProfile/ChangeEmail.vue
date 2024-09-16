<script setup lang="ts">
import { useChangeEmail } from './useChangeEmail'

const props = defineProps({
	dividerOrientation: {
		type: String as PropType<'horizontal' | 'vertical'>,
		default: 'horizontal',
	},
})

const {
	email,
	emailAttrs,
	password,
	passwordAttrs,
	errors,
	isSubmitting,
	meta,
	messageRef,
	isSuccess,
	updateEmail,
} = useChangeEmail()
</script>

<template>
	<UDivider
		class="mt-4"
		label="Email"
		:orientation="props.dividerOrientation"
	/>
	<UForm :state="{}" @submit="updateEmail" class="flex flex-col gap-5">
		<UFormGroup required label="Email" name="email" size="lg">
			<UInput v-model="email" v-bind="emailAttrs" type="text" />
			<UIAppearMessage
				:condition="errors.email !== undefined && errors.email.length > 0"
				:message="errors.email"
			/>
		</UFormGroup>
		<UFormGroup required label="Пароль" name="password" size="lg">
			<UInput v-model="password" v-bind="passwordAttrs" type="password" />
			<UIAppearMessage
				:condition="errors.password !== undefined && errors.password.length > 0"
				:message="errors.password"
			/>
			<UIAppearMessage
				:color="isSuccess ? 'text-green-600' : 'text-red-600'"
				:condition="messageRef.length > 0"
				:message="messageRef"
			/>
		</UFormGroup>
		<UButton
			type="submit"
			class="my-3 inline-flex justify-center"
			:disabled="!meta.touched || !meta.valid"
			:loading="isSubmitting"
			>Изменить email</UButton
		>
	</UForm>
</template>
