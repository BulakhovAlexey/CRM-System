<script setup lang="ts">

const searchValue = defineModel<string>();

const clearSearch = () => {
  searchValue.value = '';
};
</script>

<template>
  <div class="search inline-flex justify-center items-center gap-2">
    <UInput v-model="searchValue" placeholder="Поиск..." />
    <Transition name="appear">
      <Icon 
        v-if="searchValue && searchValue.length > 0" 
        @click="clearSearch"
        name="ic:sharp-clear" 
        size="25" 
        class="hover:rotate-90 transition-all duration-700" 
      />
    </Transition>
  </div>
</template>
