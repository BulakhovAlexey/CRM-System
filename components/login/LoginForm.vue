<script setup lang="ts">
import { useLogin } from './useLogin';

useSeoMeta({
  title: "Login | CRM-System",
})

const startRotate = ref<boolean>(false)

const rotating = () => {
  startRotate.value = !startRotate.value
}
const { login, register, errorMessage, meta, email, emailAttrs, password, passwordAttrs, name, nameAttrs, isSubmitting, errors } = useLogin()

</script>

<template>
  <div class="p-4 w-full h-screen flex flex-col overflow-hidden justify-center items-center">
    <div :class="{rotate : startRotate}" class="login w-5/12 p-4 bg-slate-800 bg-opacity-40 text-center text-textMain rounded">
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
          <UButton @click="rotating" trailing type="button" class="uppercase bg-gray-600">
            Регистрация
          </UButton>
        </div>
        <div v-if="errorMessage.length > 0" class="text-red-800 text-center text-lg">{{ errorMessage }}</div>
      </UForm>
    </div>
    <div :class="{rotate : startRotate}" class="register w-5/12 p-4 bg-slate-800 bg-opacity-40 text-center text-textMain rounded">
      <h1 class="text-2xl text-black py-3">Регистрация</h1>
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
        <div class="buttons flex justify-center gap-3">
          <UButton trailing :disabled="!meta.touched" :loading="isSubmitting" type="submit" class="uppercase">
            Регистрация
          </UButton>
          <UButton @click="rotating" trailing type="button" class="uppercase bg-gray-600">
            Войти в систему
          </UButton>
        </div>
        <div v-if="errorMessage.length > 0" class="text-red-800 text-center text-lg">{{ errorMessage }}</div>
      </UForm>
    </div>
  </div>
</template>
<!-- loading -->

<style scoped>
.login,
.register{
  overflow: hidden;
  backface-visibility: hidden;
  position: absolute;
  /* top: 50%;
  left: 50%; */
  transition: transform .8s linear;
}

.login{
  transform: perspective(600px) scale(1) rotateY(0deg);
}

.register{
  transform: perspective(600px) scale(1.5) rotateY(180deg);
  background-color: #f1f1f1;
}

.login.rotate{
    transform: perspective(600px) scale(1.5) rotateY(-180deg);
}
.register.rotate{
    transform: perspective(600px) scale(1) rotateY(0deg);
}

</style>
