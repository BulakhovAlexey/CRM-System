<script setup lang="ts">
import { text } from './group.lang';
</script>

<template>
  <div class="group-create text-qwe-50">
    <div class="group-create__top flex justify-center items-center">
      <h2 class="group-create__title flex-1 text-center text-2xl">{{ text.createGroup }}</h2>
    </div>
    <GroupForm @isSuccess="$emit('closeSlideOver', true)" type="addNew" :completeFields="false"/>
  </div>
</template>
