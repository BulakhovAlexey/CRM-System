<template>
  <div class="h-screen w-screen bg-bgMain bg-opacity-60">
    <div class="container relative">
      <NuxtLayout name="main" v-if="authStore.isAuth" />
      <NuxtLayout v-else />
    </div>
  </div>
  <LoadingFullScreenLoading v-if="FSloading.isFSLoading" />
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth.store';
import { account } from './lib/appwrite';
import { useFSloadingStore } from './stores/fsLoading.store';

const authStore = useAuthStore()
const FSloading = useFSloadingStore()

onMounted(async () => {
  try {
    const user = await account.get()
    if(user) authStore.set(user)
  } catch (error) {
  } finally {
    FSloading.set(false)
  }
})
</script>

<style scoped>
.container{
  max-width: 2000px;
  margin: 0 auto;
  padding: 0px 10px;
}
</style>