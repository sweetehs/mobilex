<template>
	<div class="f-inner-wrapper">
		<div v-for="(item,i) in datas" :key="i" @click="eventShowControls(item)">
			<component :is="item.component" />
		</div>
	</div>
</template>

<script>
	import widgethoc from "./widgets/common/hoc"
	import widgetlist from "./widgets/common/list"
	import postMessage from "@/util/postMessage"
	import {
		clone
	} from "@/util/util"
	export default {
		data() {
			return {
				datas: []
			}
		},
		mounted() {
			this.$source = new postMessage(window.parent, window)
			this.$source.send("widgetnav", widgetlist.map((_data) => {
				return this.cloneWidgetRemoveComponent(_data)
			}))
			this.$source.receive("widgetlist", (widgetdata) => {
				this.datas = widgetdata.datas.map((_w) => {
					_w.component = widgethoc(this.getComponentById(_w.wid), clone(_w))
					return _w
				})
			})
		},
		methods: {
			cloneWidgetRemoveComponent(data) {
				let _data = clone(data)
				delete _data.component
				return _data
			},
			getComponentById(wid) {
				return widgetlist.find((_data) => _data.wid === wid).component
			},
			eventShowControls(widget) {
				this.$source.send("widgetcontrol", widget.id)
			}
		}
	}
</script>

