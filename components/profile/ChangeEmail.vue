
<script setup lang="ts">
import { useChangeEmail } from './useChangeEmail';

const { email, emailAttrs, password, passwordAttrs, errors, errorMesRef, isSubmitting, meta, successMesRef, isSuccess, updateEmail } = useChangeEmail()
</script>

<template>
  <UForm :state="{}" @submit="updateEmail" class="flex flex-col gap-2">
    <UFormGroup required label="Email" name="email" size="lg">
      <UInput v-model="email" v-bind="emailAttrs" type="text" />
      <UIAppearMessage :condition="errors.email !== undefined && errors.email.length > 0" :message="errors.email"/>
    </UFormGroup>
    <!-- todo hide pass filed after success submit -->
    <UFormGroup v-if="meta.touched || (meta.touched && !isSuccess)" required label="Пароль" name="password" size="lg">
      <UInput v-model="password" v-bind="passwordAttrs" type="password" />
      <UIAppearMessage :condition="errors.password !== undefined && errors.password.length > 0" :message="errors.password"/>
    </UFormGroup>
    <UButton type="submit" class="my-3 inline-flex justify-center" :disabled="!meta.touched || !meta.valid" :loading="isSubmitting">Изменить email</UButton>
    <UIAppearMessage color="text-green-600" :condition="successMesRef.length > 0" :message="successMesRef"/>
    <UIAppearMessage :condition="errorMesRef.length > 0" :message="errorMesRef"/>
  </UForm>
</template>
