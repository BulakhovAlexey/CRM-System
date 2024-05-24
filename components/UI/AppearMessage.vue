<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: false
  },
  color: {
    type: String,
    default: 'text-red-700'
  },
  condition: {
    type: Boolean,
    required: true
  }
})
</script>
<template>
  <Transition name="appear">
    <span v-if="condition" :class="color" class="mb-1 text-sm text-center absolute left-1">{{ message }}</span>
  </Transition>
</template>
