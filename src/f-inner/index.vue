<template>
	<div class="f-inner-wrapper">
		<control :class="item.id == currentId ? 'active' : ''" v-for="(item,i) in datas" :key="i" @click="eventSetCurrentControls(item)">
			<component :is="item.wid" :style="item.controls.style" v-bind="item.controls.props" />
		</control>
	</div>
</template>

<script>
	import Vue from "vue"
	import widgetlist from "@/components/widgets/list-elements"
	import control from "./components/item-control"
	import postMessage from "@/util/postMessage"
	import {
		clone
	} from "@/util/util"
	// 全局注册component widget
	const setGlobalComponents = () => {
		widgetlist.forEach((_c) => {
			Vue.component(_c.wid, _c.component)
		});
	}
	setGlobalComponents()
	// const getMixinComponents = () => {
	// 	return {
	// 		components: widgetlist.reduce((r, n) => {
	// 			r[n.wid] = n.component
	// 			return r
	// 		}, {})
	// 	}
	// }
	export default {
		// mixins: [getMixinComponents()],
		components: {
			control
		},
		data() {
			return {
				datas: [],
				currentId: ''
			}
		},
		mounted() {
			this.$source = new postMessage(window.parent, window)
			this.$source.send("widgetnav", widgetlist.map((_data) => {
				return this.cloneWidgetRemoveComponent(_data)
			}))
			this.$source.receive("widgetlist", (widgetdata) => {
				this.datas = widgetdata.datas
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
			eventSetCurrentControls(widget) {
				this.currentId = widget.id
				this.$source.send("widgetcontrol", widget.id)
			}
		}
	}
</script>

