<script setup lang="ts">
import { storage } from '~/lib/appwrite'
import { storageID } from '~/DbConstants'

const bgImage = useCookie('bgImagePath', {
	default: () => ({ bgImageID: '' }),
	watch: true,
})

const bgUrl = ref<URL>()
provide('bgImage', bgImage) // use it in /components/userProfile/ChangeBackGround.vue

const updateBgImage = async () => {
	if (bgImage.value.bgImageID != '') {
		bgUrl.value = storage.getFileView(storageID, bgImage.value.bgImageID)
	}
}
watch(bgImage, newVal => {
	updateBgImage()
})

onMounted(() => updateBgImage())
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
