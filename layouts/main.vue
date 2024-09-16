<script setup lang="ts">
import { storage } from '~/lib/appwrite'
import { storageID } from '~/DbConstants'
import { Query } from 'appwrite'

const bgImageCookie = useCookie<string | undefined>('bgImagePath', {
	maxAge: 1500000,
})

const bgImage = ref<string | undefined>(undefined)

console.log(bgImageCookie.value)
const getDefaultImage = async () => {
	if (!bgImageCookie.value) {
		const response = await storage.listFiles(storageID, [Query.limit(1)])
		if (response.files[0]) {
			bgImage.value = response.files[0].$id
		}
	} else {
		bgImage.value = bgImageCookie.value
	}
}
const bgUrl = ref<URL>()
provide('bgImage', bgImage) // use it in /components/userProfile/ChangeBackGround.vue

const updateBgImage = async () => {
	if (bgImage.value) {
		bgUrl.value = storage.getFileView(storageID, bgImage.value)
	}
}
watch(bgImage, newVal => {
	updateBgImage()
})

onMounted(() => {
	getDefaultImage()
	updateBgImage()
})
</script>

<template>
	<div>
		<div class="flex justify-between items-start">
			<Sidebar class="bar z-50 relative" />
			<div class="content bg-white h-screen">
				<div class="page-container relative min-h-screen">
					<Header />
					<div
						class="py-3 px-2 cnt overflow-auto relative"
						:style="`background-image:url(${bgUrl});`"
					>
						<NuxtPage />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.bar {
	flex: 0 0 250px;
}
.content {
	flex: 1 1 100%;
}
.cnt {
	height: calc(100vh - 64px);
	background-position: center center;
	background-size: cover;
	background-repeat: no-repeat;
	overflow: hidden;
}
.test {
	@apply bg-white bg-opacity-20;
}
</style>
