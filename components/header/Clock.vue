<template>
  <div>{{ hourRef }}:{{ minRef }}:{{ secRef }}</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
const zero = (number:number) => {
  return number < 10 ? '0' + number : number.toString()
}

const getDate = () => new Date

const hourRef = ref<string>('00')
const minRef = ref<string>('00')
const secRef = ref<string>('00')

const startClock = () => {
  setInterval(() => {
    hourRef.value = zero(getDate().getHours())
    minRef.value = zero(getDate().getMinutes())
    secRef.value = zero(getDate().getSeconds())
  }, 1000)
}

onMounted(startClock)
</script>

<style scoped>

</style>