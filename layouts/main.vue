<template>
	<div>
		<div class="flex justify-between items-start">
			<Sidebar class="bar z-50 relative" />
			<div class="content bg-white h-screen">
				<div class="page-container relative min-h-screen">
					<Header />
					<div class="py-3 px-2 cnt overflow-auto relative">
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
}
</style>
