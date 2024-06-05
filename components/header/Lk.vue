<script setup lang="ts">
const sideBarIsOpen = ref<boolean>(false)

const items = [
	{
		slot: 'profile',
		label: 'Профиль',
	},
	{
		slot: 'tasks',
		label: 'Задачи',
	},
]
</script>

<template>
	<div class="header__lk">
		<button class="transition-colors hover:text-textMain">
			<Icon
				name="line-md:account"
				@click="sideBarIsOpen = !sideBarIsOpen"
				size="26"
			/>
		</button>
	</div>

	<USlideover v-model="sideBarIsOpen">
		<div class="p-4 flex-1 bg-gray-400">
			<h3 class="text-center mb-4">Профиль</h3>
			<UTabs :items="items">
				<template #profile="{ item }">
					<UserProfile />
				</template>
				<template #tasks="{ item }"> Tasks </template>
			</UTabs>
		</div>
	</USlideover>
</template>

<style scoped></style>
