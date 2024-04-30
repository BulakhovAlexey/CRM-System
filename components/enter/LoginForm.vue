<script setup lang="ts">
import { useAuth } from './useAuth';

const { login, errorMessage, meta, email, emailAttrs, password, passwordAttrs, isSubmitting, errors } = useAuth()

</script>

<template>
  <h1 class="text-2xl py-3">Войти в систему</h1>
  <UForm :state="{}" @submit="login" class=" flex flex-col gap-5">
    <UFormGroup required label="Email" name="email" size="lg">
      <UInput v-model="email" immediate v-bind="emailAttrs" type="text" />
      <span class="mt-1 text-red-800 text-sm caption-bottom">{{ errors.email }}</span>
    </UFormGroup>
    <UFormGroup required label="Пароль" name="password" size="lg">
      <UInput v-model="password" immediate autocomplete="off" v-bind="passwordAttrs" type="password" />
      <span class="mt-1 text-red-800 text-sm caption-bottom">{{ errors.password }}</span>
    </UFormGroup>
    <div class="buttons flex justify-center gap-3">
      <UButton trailing :disabled="!meta.touched" :loading="isSubmitting" type="submit" class="uppercase">
        Войти в систему
      </UButton>
      <UButton @click="$emit('rotating')" trailing type="button" class="uppercase bg-gray-600">
        Регистрация
      </UButton>
    </div>
    <div v-if="errorMessage.length > 0" class="text-red-800 text-center text-lg">{{ errorMessage }}</div>
  </UForm>
</template>
<!-- loading -->
