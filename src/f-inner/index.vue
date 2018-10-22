<template>
	<div class="f-inner-wrapper">
		<controlwrapper :datas="datas||[]" :currentId="currentId"/>
	</div>
</template>

<script>
	import Vue from "vue"
	import widgetlist from "@/components/widgets/list-elements"
	import postMessage from "@/util/postMessage"
	import event from "./components/event"
	import controlwrapper from "./components/control-wrapper"
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
	export default {
		components: {
			controlwrapper
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
			event.$on("setControl",(id)=>{
				debugger
				this.currentId = id
				this.$source.send("widgetcontrol", id)
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
			}
		}
	}
</script>

