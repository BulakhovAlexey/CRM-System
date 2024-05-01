<template>
  <div>
    <div class="flex justify-between items-start">
      <Sidebar class="bar z-50 relative" />
      <div class="content bg-white h-screen">
        <div class="page-container relative min-h-screen">
          <Header />
          <div class="py-3">
            <NuxtPage />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.bar{
  flex: 0 0 250px;
}
.content{
  flex: 1 1 100%;
}
.page-container{
  padding: 64px 10px 30px;
}
</style>