<template>
  <header class="top-0 left-0 w-full absolute bg-slate-300">
    <div class="header__inner p-3 flex justify-between items-center gap-6">
      <div class="header__date py-2 px-3 rounded-lg bg-white">
        <HeaderClock />
      </div>
      <div class="header__user flex-1 flex justify-center">
        <span class="py-2 px-3 rounded-lg bg-white">{{ authStore.getName }}</span>
      </div>
      <div class="header__logOut">
        <button class="transition-colors hover:text-textMain">
          <Icon name="line-md:log-out" @click="logOut" size="26" />
        </button>
      </div>
    </div>
  </header>
</template>

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

<style scoped>

</style>