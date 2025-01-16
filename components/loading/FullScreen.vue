<template>
	<div
		class="loading w-screen h-screen bg-black z-50 fixed top-0 left-0 flex justify-center items-center"
	>
		<span class="loader"></span>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loader {
	width: 16px;
	height: 16px;
	box-shadow: 0 30px, 0 -30px;
	border-radius: 4px;
	background: currentColor;
	display: block;
	margin: -50px auto 0;
	position: relative;
	color: #284e62;
	transform: translateY(30px);
	box-sizing: border-box;
	animation: animloader 2s ease infinite;
}
.loader::after,
.loader::before {
	content: '';
	box-sizing: border-box;
	width: 16px;
	height: 16px;
	box-shadow: 0 30px, 0 -30px;
	border-radius: 4px;
	background: currentColor;
	color: #fff;
	position: absolute;
	left: 30px;
	top: 0;
	animation: animloader 2s 0.2s ease infinite;
}
.loader::before {
	animation-delay: 0.4s;
	left: 60px;
}

@keyframes animloader {
	0% {
		top: 0;
		color: white;
	}
	50% {
		top: 30px;
		color: rgba(255, 255, 255, 0.2);
	}
	100% {
		top: 0;
		color: white;
	}
}
</style>
