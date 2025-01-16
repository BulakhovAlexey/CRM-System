<script setup lang="ts">
import type { IFile } from '~/types/types'

const props = defineProps({
	image: {
		type: Object as PropType<IFile>,
		required: true,
	},
})

const selectedBgImage = useCookie<string | undefined>('bgImagePath', {
	watch: true,
	maxAge: 1500000,
})
const emits = defineEmits(['bgActionEmit'])

const setBgAction = () => {
	emits('bgActionEmit', props.image.$id)
}

const isSelected = () => {
	return selectedBgImage.value === props.image.$id
}
</script>

<template>
	<UTooltip
		class="h-[120px] w-[220px]"
		:text="isSelected() ? 'Уже выбран' : 'Установить как фон'"
		:popper="{ offsetDistance: 2 }"
	>
		<img
			:src="image.path"
			@click="setBgAction"
			:key="image.$id"
			class="w-full h-full absolute top-0 left-0 object-cover cursor-pointer"
			:class="{ selected: isSelected() }"
			:alt="image.$id"
		/>
	</UTooltip>
</template>

<style scoped>
.selected {
	@apply pointer-events-none cursor-default;
}
</style>
