<template>
	<div class="f-inner-wrapper">
		<component v-for="(item,i) in datas" :key="i" :is="item.component" />
	</div>
</template>

<script>
	import widgets from "./mixins/widgets"
	import hoc from "./widgets/hoc"
	export default {
		data() {
			var datas = [{
				name: "layout",
				datas: {
					test: "test"
				}
			}]
			return {
				datas: datas.map((_data) => {
					_data.component = hoc(widgets.components[_data.name], _data.datas)
					return _data
				})
			}
		}
	}
</script>

