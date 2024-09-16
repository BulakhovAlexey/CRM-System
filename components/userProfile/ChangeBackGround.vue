<script setup lang="ts">
import { useChangeBackGround } from './useChangeBackGround'

const props = defineProps({
	dividerOrientation: {
		type: String as PropType<'horizontal' | 'vertical'>,
		default: 'horizontal',
	},
})

const {
	refFiles,
	uploadOwn,
	loadingFiles,
	fileInput,
	uploadAction,
	getFiles,
	setNewBg,
} = useChangeBackGround()

onMounted(() => getFiles())
</script>

<template>
	<div class="inner h-vh-80 overflow-y-auto">
		<UDivider
			class="mt-4"
			label="Фон"
			:orientation="props.dividerOrientation"
		/>
		<UFormGroup class="mb-2 relative" label="Выбрать из загруженных">
			<div v-if="loadingFiles" class="images_cnt">
				<USkeleton class="h-[120px] w-[180px]" />
				<USkeleton class="h-[120px] w-[180px]" />
				<USkeleton class="h-[120px] w-[180px]" />
				<USkeleton class="h-[120px] w-[180px]" />
			</div>
			<div v-else class="images_cnt">
				<div
					v-for="item in refFiles"
					class="flex justify-between items-center w-[180px] relative h-[120px]"
				>
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
				<input
					type="file"
					ref="fileInput"
					id="file"
					class="border-0 outline-none"
				/>
			</UFormGroup>
			<UButton @click="uploadAction">Загрузить</UButton>
		</div>
	</div>
</template>

<style scoped>
.images_cnt {
	@apply flex flex-wrap justify-start gap-3;
}
</style>
