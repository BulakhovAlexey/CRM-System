<script setup lang="ts">
import { useChangeBackGround } from './useChangeBackGround'

const { refFiles, loadingFiles, uploadAction, getFiles, setNewBg } =
	useChangeBackGround()

onMounted(() => getFiles())

const uploadOwn = ref<boolean>(false)
</script>

<template>
	<UFormGroup class="mb-2 relative" label="Выбрать из загруженных">
		<div v-if="loadingFiles" class="images_cnt">
			<USkeleton class="h-[130px] w-[200px]" />
			<USkeleton class="h-[130px] w-[200px]" />
		</div>
		<div v-else class="images_cnt overflow-x-auto">
			<div v-for="item in refFiles" class="flex justify-between items-center">
				<UserProfileBgImagePreview :image="item" @bgActionEmit="setNewBg" />
			</div>
		</div>
	</UFormGroup>
	<div class="button flex justify-center my-3">
		<UButton @click="uploadOwn = !uploadOwn">
			{{ uploadOwn ? 'Закрыть' : 'Загрузить свой' }}
		</UButton>
	</div>
	<div v-if="uploadOwn" class="file_loader text-center">
		<UFormGroup class="mb-2" label="Загрузить фон">
			<input type="file" id="file" />
		</UFormGroup>
		<UButton @click="uploadAction">Загрузить</UButton>
	</div>
</template>

<style scoped>
.images_cnt {
	@apply flex justify-between items-center gap-3;
}
#file {
	@apply border-0 outline-none;
}
</style>

<!-- todo input type file... -->
<!-- icon="i-heroicons-folder"  size="lg" -->
