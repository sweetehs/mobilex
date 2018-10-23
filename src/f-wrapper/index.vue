<style lang="less">
	.f-wrapper-wrapper{
		height: 100%;
		display: flex;
		flex-direction: column;
		.top-wrapper{
			height: 60px;
			background: #aaa;
			flex-shrink: 0;
		}
		.bottom-wrapper{
			flex: 1;
			overflow: auto;
		}
	}
</style>

<template>
  <div class="f-wrapper-wrapper">
		<div class="top-wrapper"></div>
		<div class="bottom-wrapper">
			<router-view/>
		</div>
	</div>
</template>
