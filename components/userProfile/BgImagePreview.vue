<script setup lang="ts">
import type { IFile } from '~/types/types'

const props = defineProps({
	image: {
		type: Object as PropType<IFile>,
		required: true,
	},
})

const selectedBgImage = useCookie('bgImagePath', {
	default: () => ({ bgImageID: '' }),
	watch: true,
})
const emits = defineEmits(['bgActionEmit'])

const setBgAction = () => {
	emits('bgActionEmit', props.image.$id)
}

const isSelected = () => {
	return selectedBgImage.value.bgImageID === props.image.$id
}
</script>

<template>
	<div class="item-image relative flex justify-center items-center">
		<UTooltip
			:text="isSelected() ? 'Уже выбран' : 'Установить как фон'"
			:popper="{ offsetDistance: 2 }"
		>
			<img
				:src="image.path"
				@click="setBgAction"
				:key="image.$id"
				class="image"
				:class="{ selected: isSelected() }"
				:alt="image.$id"
			/>
		</UTooltip>
	</div>
</template>

<style scoped>
.image {
	@apply max-w-[200px] h-auto block cursor-pointer;
}
.selected {
	@apply pointer-events-none cursor-default;
}
</style>
