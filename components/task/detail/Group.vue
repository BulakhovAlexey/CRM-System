<script setup lang="ts">
const props = defineProps({
  group: {
    type: String,
    default: ''
  }
})
</script>


<template>
  <div class="task-view__item border-b py-3">
    <div class="task-view__group">Задача в группе (проекте): 
      <NuxtLink :to="`/groups/?q=${group}`" class="group-link">{{ group }}</NuxtLink>
    </div>
  </div>
</template>


<style scoped>
.group-link{
  @apply opacity-60 hover:opacity-100 transition-all
}
</style>