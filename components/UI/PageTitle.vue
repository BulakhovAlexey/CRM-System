<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>


<template>
  <h1 class="text-2xl mb-4">{{ title }}</h1>
</template>


<style scoped>

</style>