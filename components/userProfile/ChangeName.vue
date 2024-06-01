
<script setup lang="ts">
import { useChangeName } from './useChangeName';

const { name, nameAttrs, errors, isSubmitting, meta, successMesRef, updateName } = useChangeName()
</script>

<template>
  <UForm :state="{}" @submit="updateName" class="flex flex-col gap-2">
    <UFormGroup required label="Имя" name="name" size="lg">
      <UInput v-model="name" immediate v-bind="nameAttrs" type="text" />
      <UIAppearMessage :condition="errors.name !== undefined && errors.name.length > 0" :message="errors.name"/>
    </UFormGroup>
    <UButton :disabled="!meta.touched || !meta.valid" class="my-3 inline-flex justify-center" type="submit" :loading="isSubmitting">Изменить имя</UButton>
    <UIAppearMessage styles="text-green-600 text-center" :condition="successMesRef.length > 0" :message="successMesRef"/>
  </UForm>
</template>


<style scoped>

</style>