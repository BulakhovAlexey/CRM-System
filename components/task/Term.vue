<script setup lang="ts">
import { dateFormatterShort } from '~/lib/supportFunctions';

const props = defineProps({
  term: {
    type: String,
    required: true
  }
})

const today = new Date()
const termDate = new Date(props.term)
let colorValue = termDate < today ? 'rose' : 'teal'
</script>


<template>
  <UBadge :color="colorValue" variant="soft" :label="dateFormatterShort(term)" />
</template>


<style scoped>

</style>