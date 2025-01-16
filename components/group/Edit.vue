<script setup lang="ts">
import { useSelectedGroupStore } from '~/stores/groups.store'
import { text } from './group.lang'

const groupStore = useSelectedGroupStore()
const selectedGroup = groupStore.getGroup
</script>

<template>
	<div class="group-edit">
		<div class="group-edit__form p-3">
			<div
				class="group-edit__top flex justify-between items-center max-w-screen-md"
			>
				<h1 class="group-edit__title mb-3 text-xl">
					{{ text.editGroup }} - "{{ selectedGroup.name }}"
				</h1>
			</div>
			<div class="group-edit__container max-w-screen-md">
				<GroupForm
					@isSuccess="$emit('closeSlideOver', true)"
					type="edit"
					:completeFields="true"
				/>
			</div>
		</div>
	</div>
</template>
