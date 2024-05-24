
<script setup lang="ts">
import { useAuth } from './useAuth';
import { roles } from '~/types/types';

const emit = defineEmits(['rotating'])
const { register, roleRef, errorMessage, meta, email, emailAttrs, password, passwordAttrs, name, nameAttrs, isSubmitting, errors } = useAuth()

const rotate = () => {
  emit('rotating')
}

</script>

<template>
  <h1 class="text-2xl py-3">Регистрация</h1>
  <UForm :state="{}" @submit="register">
    <UFormGroup required label="Email" name="email" size="lg">
      <UInput v-model="email" immediate v-bind="emailAttrs" type="text" />
      <UIAppearMessage :condition="errors.email !== undefined && errors.email.length > 0" :message="errors.email"/>
    </UFormGroup>
    <UFormGroup required label="Имя" name="name" size="lg">
      <UInput v-model="name" immediate autocomplete="off" v-bind="nameAttrs" type="text" />
      <UIAppearMessage :condition="errors.name !== undefined && errors.name.length > 0" :message="errors.name"/>
    </UFormGroup>
    <UFormGroup required label="Пароль" name="password" size="lg">
      <UInput v-model="password" immediate autocomplete="off" v-bind="passwordAttrs" type="password" />
      <UIAppearMessage :condition="errors.password !== undefined && errors.password.length > 0" :message="errors.password"/>
    </UFormGroup>
    <UFormGroup required label="Роль" size="lg">
      <USelectMenu
        v-model="roleRef"
        class="cursor-pointer"
        :options="roles"
        placeholder="Выберите роль"
        value-attribute="id"
        option-attribute="role"
      />
      <!-- <UIAppearMessage :condition="errors.name !== undefined && errors.name.length > 0" :message="errors.name"/> -->
    </UFormGroup>
    <div class="buttons flex justify-center gap-3">
      <UButton trailing :disabled="!meta.touched" :loading="isSubmitting" type="submit" class="uppercase">
        Регистрация
      </UButton>
      <UButton @click="rotate" trailing type="button" class="uppercase bg-gray-600">
        Авторизация
      </UButton>
    </div>
    <div v-if="errorMessage.length > 0" class="text-red-800 text-center text-lg">{{ errorMessage }}</div>
  </UForm>
</template>

<style scoped>

</style>