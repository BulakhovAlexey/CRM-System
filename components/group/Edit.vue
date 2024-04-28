<template>
  <div>
    {{ data }}
  </div>
</template>

<script setup lang="ts">
import { useGroupList } from './useGroupList';
const route = useRoute()
const id = route.params.id as string
const { getGroupInfo } = useGroupList()
const { data, isLoading } = getGroupInfo(id)

</script>

<style scoped>

</style>