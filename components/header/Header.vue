<script setup lang="ts">
</script>

<template>
  <header class="w-full bg-slate-300">
    <div class="header__inner p-3 flex justify-between items-center gap-6">
      <div class="header__date py-2 px-3 rounded-lg bg-white">
        <HeaderClock />
      </div>
      <div class="header__user flex-1 flex justify-center">
        <HeaderUserInfo />
      </div>
      <HeaderLk />
      <HeaderLogOut />
    </div>
  </header>
</template>
