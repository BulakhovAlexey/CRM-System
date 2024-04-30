
<script setup lang="ts">
import { useAuth } from './useAuth';
import { EnumRole , roles } from '~/types/types';

const selected = ref(roles[0].id)

const { register, errorMessage, meta, email, emailAttrs, password, passwordAttrs, name, nameAttrs, isSubmitting, errors } = useAuth(selected)


</script>

<template>
  <h1 class="text-2xl py-3">Регистрация</h1>
  <UForm :state="{}" @submit="register" class=" flex flex-col gap-5">
    <UFormGroup required label="Email" name="email" size="lg">
      <UInput v-model="email" immediate v-bind="emailAttrs" type="text" />
      <span class="mt-1 text-red-800 text-sm caption-bottom">{{ errors.email }}</span>
    </UFormGroup>
    <UFormGroup required label="Имя" name="name" size="lg">
      <UInput v-model="name" immediate autocomplete="off" v-bind="nameAttrs" type="text" />
      <span class="mt-1 text-red-800 text-sm caption-bottom">{{ errors.name }}</span>
    </UFormGroup>
    <UFormGroup required label="Пароль" name="password" size="lg">
      <UInput v-model="password" immediate autocomplete="off" v-bind="passwordAttrs" type="password" />
      <span class="mt-1 text-red-800 text-sm caption-bottom">{{ errors.password }}</span>
    </UFormGroup>
    <UFormGroup required label="Роль" size="lg">
      <USelectMenu
        v-model="selected"
        class="cursor-pointer"
        :options="roles"
        placeholder="Выберите роль"
        value-attribute="id"
        option-attribute="role"
      />
    </UFormGroup>
    <div class="buttons flex justify-center gap-3">
      <UButton trailing :disabled="!meta.touched" :loading="isSubmitting" type="submit" class="uppercase">
        Регистрация
      </UButton>
      <UButton @click="$emit('rotating')" trailing type="button" class="uppercase bg-gray-600">
        Авторизация
      </UButton>
    </div>
    <div v-if="errorMessage.length > 0" class="text-red-800 text-center text-lg">{{ errorMessage }}</div>
  </UForm>
</template>

<style scoped>

</style>