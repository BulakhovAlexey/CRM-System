<script setup lang="ts">
const props = defineProps({
  description: {
    type: String,
    default: ''
  }
})
</script>


<template>
  <div class="task-view__item border-b py-3">
    <div class="task-view__text">
      Описание задачи:
    </div>
    <p class="task-view__value">{{ description }}</p>
  </div>
</template>


<style scoped>

</style>