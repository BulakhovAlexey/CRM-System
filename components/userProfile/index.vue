<template>
	<div class="mt-4">
		<UDivider label="Имя" :orientation="dividerOrientation" />
		<UserProfileChangeName />
		<UDivider label="Email" :orientation="dividerOrientation" />
		<UserProfileChangeEmail />
		<UDivider label="Пароль" :orientation="dividerOrientation" />
		<UserProfileChangePassword />
		<UDivider label="Фон" :orientation="dividerOrientation" />
		<UserProfileChangeBackGround />
	</div>
</template>
<script setup lang="ts">
const dividerOrientation = 'horizontal'
</script>
