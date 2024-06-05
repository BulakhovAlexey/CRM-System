<script setup lang="ts">
import { useAuth } from './useAuth'
import { roles } from '~/types/types'
import { text } from './enter.lang'

const emit = defineEmits(['rotating'])
const {
	register,
	roleRef,
	errorMessage,
	meta,
	email,
	emailAttrs,
	password,
	passwordAttrs,
	name,
	nameAttrs,
	isSubmitting,
	errors,
} = useAuth()

const rotate = () => {
	emit('rotating')
}
</script>

<template>
	<h1 class="text-2xl py-3">{{ text.title.register }}</h1>
	<UForm :state="{}" @submit="register">
		<UFormGroup required :label="text.labels.email" name="email" size="lg">
			<UInput v-model="email" immediate v-bind="emailAttrs" type="text" />
			<UIAppearMessage
				:condition="errors.email !== undefined && errors.email.length > 0"
				:message="errors.email"
			/>
		</UFormGroup>
		<UFormGroup required :label="text.labels.name" name="name" size="lg">
			<UInput
				v-model="name"
				immediate
				autocomplete="off"
				v-bind="nameAttrs"
				type="text"
			/>
			<UIAppearMessage
				:condition="errors.name !== undefined && errors.name.length > 0"
				:message="errors.name"
			/>
		</UFormGroup>
		<UFormGroup
			required
			:label="text.labels.password"
			name="password"
			size="lg"
		>
			<UInput
				v-model="password"
				immediate
				autocomplete="off"
				v-bind="passwordAttrs"
				type="password"
			/>
			<UIAppearMessage
				:condition="errors.password !== undefined && errors.password.length > 0"
				:message="errors.password"
			/>
		</UFormGroup>
		<UFormGroup required :label="text.labels.role.label" size="lg">
			<USelectMenu
				v-model="roleRef"
				class="cursor-pointer"
				:options="roles"
				:placeholder="text.labels.role.placeholder"
				value-attribute="id"
				option-attribute="role"
			/>
		</UFormGroup>
		<div class="buttons flex justify-center gap-3">
			<UButton
				trailing
				:disabled="!meta.touched"
				:loading="isSubmitting"
				type="submit"
				class="uppercase"
			>
				{{ text.registerButton }}
			</UButton>
			<UButton
				@click="rotate"
				trailing
				type="button"
				class="uppercase bg-gray-600"
			>
				{{ text.enterButton }}
			</UButton>
		</div>
		<div
			v-if="errorMessage.length > 0"
			class="text-red-800 text-center text-lg"
		>
			{{ errorMessage }}
		</div>
	</UForm>
</template>

<style scoped></style>
