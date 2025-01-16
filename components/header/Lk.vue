<script setup lang="ts">
const sideBarIsOpen = ref<boolean>(false)

const items = [
	{
		slot: 'changeName',
		label: 'Имя',
	},
	{
		slot: 'changeEmail',
		label: 'Email',
	},
	{
		slot: 'changePassword',
		label: 'Пароль',
	},
	{
		slot: 'changeBackGround',
		label: 'Фон',
	},
]
const dividerOrientation = 'horizontal'
</script>

<template>
	<div class="header__lk">
		<button class="transition-colors hover:opacity-50">
			<Icon
				name="line-md:account"
				@click="sideBarIsOpen = !sideBarIsOpen"
				size="26"
			/>
		</button>
	</div>

	<USlideover v-model="sideBarIsOpen" :ui="{ width: 'w-screen max-w-[500px]' }">
		<div class="p-4 flex-1 bg-gray-400">
			<h2 class="text-center pb-2 text-lg">Личный кабинет</h2>
			<UTabs :items="items" class="flex-wrap">
				<template #changeName="{ item }">
					<div class="tab__inner">
						<UserProfileChangeName :dividerOrientation="dividerOrientation" />
					</div>
				</template>
				<template #changeEmail="{ item }">
					<div class="tab__inner">
						<UserProfileChangeEmail :dividerOrientation="dividerOrientation" />
					</div>
				</template>
				<template #changePassword="{ item }">
					<div class="tab__inner">
						<UserProfileChangePassword
							:dividerOrientation="dividerOrientation"
						/>
					</div>
				</template>
				<template #changeBackGround="{ item }">
					<UserProfileChangeBackGround
						:dividerOrientation="dividerOrientation"
					/>
				</template>
			</UTabs>
		</div>
	</USlideover>
</template>

<style scoped>
.tab__inner {
	@apply max-w-[450px] w-full my-auto mx-auto h-vh-80;
}
</style>
