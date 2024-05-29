<script setup lang="ts">
useSeoMeta({
  title: "Вход в систему | CRM-System",
})
const startRotate = ref<boolean>(false)

const rotate = () => {
  startRotate.value = !startRotate.value
}


</script>

<template>
  <div class="relative p-4 w-full h-screen flex flex-col overflow-hidden justify-center items-center">
    <div :class="{rotate : startRotate}" class="login">
      <EnterLoginForm @rotating="rotate"/>
    </div>
    <div :class="{rotate : startRotate}" class="register">
      <EnterRegisterForm @rotating="rotate"/>
    </div>
  </div>
</template>

<style scoped>
.login,
.register{
  backface-visibility: hidden;
  transition: transform .8s linear;
  max-width: 550px;
  @apply bg-gray-500 text-center text-textMain rounded py-5 px-9 w-full absolute overflow-hidden
}

.login{
  transform: perspective(600px) scale(1) rotateY(0deg);
}

.register{
  transform: perspective(600px) scale(1.5) rotateY(180deg);
}

.login.rotate{
  transform: perspective(600px) scale(1.5) rotateY(-180deg);
}

.register.rotate{
  transform: perspective(600px) scale(1) rotateY(0deg);
}

</style>