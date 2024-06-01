<script setup lang="ts">
import { account } from '@/lib/appwrite';
import { useAuthStore } from '@/stores/auth.store';
import { useFSloadingStore } from '~/stores/fsLoading.store';

const router = useRouter()
const authStore = useAuthStore()
const FSloading = useFSloadingStore()

const logOut = async () => {
  FSloading.set(true)
  await account.deleteSession('current')
  authStore.clear()
  router.push('/')
  FSloading.set(false)
}
</script>


<template>
  <div class="header__logOut">
    <button class="transition-colors hover:text-textMain">
      <Icon name="line-md:log-out" @click="logOut" size="26" />
    </button>
  </div>
</template>


<style scoped>

</style>