
<script setup lang="ts">
import type { PropType } from 'vue';
import { EnumStatus } from '~/types/types';

const getTaskStatusColor = (status: EnumStatus) : string => {
  switch (status) {
    case EnumStatus.in_process:
      return 'lime'
    case EnumStatus.control:
      return 'amber'
    case EnumStatus.done:
      return 'gray'
  }
}
const props = defineProps({
  status: {
    type: String as PropType<EnumStatus>,
    required: true,
  }
})
</script>

<template>
  <UBadge 
  :color="getTaskStatusColor(status)"
  :label="status" />
</template>

<style scoped>

</style>