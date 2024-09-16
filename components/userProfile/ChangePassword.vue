<script setup lang="ts">
import { useChangePassword } from './useChangePassword'

const props = defineProps({
	dividerOrientation: {
		type: String as PropType<'horizontal' | 'vertical'>,
		default: 'horizontal',
	},
})

const {
	password,
	passwordAttrs,
	newPassword,
	newPasswordAttrs,
	errors,
	isSubmitting,
	meta,
	messageRef,
	isSuccess,
	updatePassword,
} = useChangePassword()

const isVisible = ref<boolean>(false)

const togglePasswordVisibility = () => {
	isVisible.value = !isVisible.value
}
</script>

<template>
	<UDivider
		class="mt-4"
		label="Пароль"
		:orientation="props.dividerOrientation"
	/>
	<UForm :state="{}" @submit="updatePassword" class="flex flex-col gap-5">
		<UFormGroup required label="Старый пароль" name="password" size="lg">
			<UInput v-model="password" v-bind="passwordAttrs" type="password" />
			<UIAppearMessage
				:condition="errors.password !== undefined && errors.password.length > 0"
				:message="errors.password"
			/>
		</UFormGroup>
		<UFormGroup required label="Новый пароль" name="newPassword" size="lg">
			<UInput
				v-model="newPassword"
				v-bind="newPasswordAttrs"
				:type="isVisible ? 'text' : 'password'"
				:ui="{ icon: { trailing: { pointer: '' } } }"
			>
				<template #trailing>
					<Icon
						class="cursor-pointer hover:opacity-55"
						name="ion:eye-outline"
						:padded="false"
						@click="togglePasswordVisibility"
					/>
				</template>
			</UInput>
			<UIAppearMessage
				:condition="
					errors.newPassword !== undefined && errors.newPassword.length > 0
				"
				:message="errors.newPassword"
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
			>Изменить Пароль
		</UButton>
	</UForm>
</template>

<style scoped></style>
