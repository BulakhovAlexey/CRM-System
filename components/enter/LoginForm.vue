<script setup lang="ts">
import { useAuth } from './useAuth';

const emit = defineEmits(['rotating'])
const { login, errorMessage, meta, email, emailAttrs, password, passwordAttrs, isSubmitting, errors } = useAuth()

const rotate = () => {
  emit('rotating')
}

</script>

<template>
  <h1 class="text-2xl py-3">Войти в систему</h1>
  <UForm :state="{}" @submit="login">
    <UFormGroup required label="Email" name="email" size="lg">
      <UInput v-model="email" immediate v-bind="emailAttrs" type="text" />
      <UIAppearMessage :condition="errors.email !== undefined && errors.email.length > 0" :message="errors.email"/>
    </UFormGroup>
    <UFormGroup required label="Пароль" name="password" size="lg">
      <UInput v-model="password" immediate autocomplete="off" v-bind="passwordAttrs" type="password" />
      <UIAppearMessage :condition="errors.password !== undefined && errors.password.length > 0" :message="errors.password"/>
    </UFormGroup>
    <div class="buttons flex justify-center gap-3">
      <UButton trailing :disabled="!meta.touched" :loading="isSubmitting" type="submit" class="uppercase">
        Войти в систему
      </UButton>
      <UButton @click="rotate" trailing type="button" class="uppercase bg-gray-600">
        Регистрация
      </UButton>
    </div>
    <div v-if="errorMessage.length > 0" class="text-red-800 text-center text-lg">{{ errorMessage }}</div>
  </UForm>
</template>
<!-- loading -->
