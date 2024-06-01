<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore()
</script>


<template>
  <span class="py-2 px-3 rounded-lg bg-white">{{ authStore.getName }} - {{ authStore.getGroups }}</span>
</template>


<style scoped>

</style>