<style lang="less">
	.keytree-wrapper{
		ul{
			padding-left:30px;
			&.padding0{
				padding: 0;
			}
			li{
				margin-bottom: 10px;
			}
		}
	}
</style>

<template>
	<div class="keytree-wrapper">
		<ul :class="{padding0:index == 1}">
			<li v-for="(item) in datas" :key="item.id">
				<div>
					<el-input v-model="item.key" v-if="!item.isWrapper" class="middle"></el-input>
					<span>{{item.name}}->{{item.label||'暂无描述'}}</span>
				</div>
				<keytree v-if="item.children" :datas="item.children" />
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "keytree",
		props: ["datas","index"]
	}
</script>

