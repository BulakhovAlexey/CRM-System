<script setup lang="ts">
const search = defineModel({type: String})
</script>

<template>
  <div class="search flex justify-center items-center gap-2">
    <UInput v-model="search" placeholder="Поиск..." />
    <Transition name="appear">
      <Icon 
      v-if="search && search.length > 0" 
      @click="search = ''"
      name="ic:sharp-clear" 
      size="25" 
      class="hover:rotate-90 transition-all duration-700" />
    </Transition>
  </div>
</template>

<style scoped>

</style>