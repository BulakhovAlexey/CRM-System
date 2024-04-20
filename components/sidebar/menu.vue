<template>
  <nav class="text-lg mt-4 text-center flex flex-col flex-wrap gap-3">
    <NuxtLink class="p-2 flex justify-between rounded border border-transparent cursor-pointer transition-colors hover:border-white"
    v-for="item in MAIN_MENU"  
    :key="item.name"
    :class="{selected: router.path === item.link}"
    :to="item.link">
      {{ item.name }}
      <Icon :name="item.icon" size="26"/> 
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { MAIN_MENU } from '~/seeders/main_menu';

const router = useRoute()

</script>

<style scoped>
.selected{
  @apply border-white pointer-events-none text-slate-50
}
</style>