<template>
  <header class="w-full bg-slate-300">
    <div class="header__inner p-3 flex justify-between items-center gap-6">
      <div class="header__date py-2 px-3 rounded-lg bg-white">
        <HeaderClock />
      </div>
      <div class="header__user flex-1 flex justify-center">
        <span class="py-2 px-3 rounded-lg bg-white">{{ authStore.getName }} - {{ authStore.getGroups }}</span>
      </div>
      <div class="header__lk">
        <button class="transition-colors hover:text-textMain">
          <Icon name="line-md:account" @click="sideBarIsOpen = !sideBarIsOpen" size="26" />
        </button>
      </div>
      <div class="header__logOut">
        <button class="transition-colors hover:text-textMain">
          <Icon name="line-md:log-out" @click="logOut" size="26" />
        </button>
      </div>
    </div>
  </header>
  <USlideover v-model="sideBarIsOpen">
    <div class="p-4 flex-1 bg-gray-400">
      <h3 class="text-center mb-4">Профиль</h3>
      <UTabs :items="items">
        <template #profile="{ item }">
          <Profile/>
        </template>
        <template #tasks="{ item }">
          Tasks
        </template>
      </UTabs>
    </div>
  </USlideover>
</template>

<script setup lang="ts">
import { account } from '@/lib/appwrite';
import { useAuthStore } from '@/stores/auth.store';
import { useFSloadingStore } from '~/stores/fsLoading.store';

const router = useRouter()
const authStore = useAuthStore()
const FSloading = useFSloadingStore()
const sideBarIsOpen = ref<boolean>(false)

const logOut = async () => {
  FSloading.set(true)
  await account.deleteSession('current')
  authStore.clear()
  router.push('/')
  FSloading.set(false)
}

const items = [{
  slot: 'profile',
  label: 'Профиль'
}, {
  slot: 'tasks',
  label: 'Задачи'
}]
</script>

<style scoped>

</style>