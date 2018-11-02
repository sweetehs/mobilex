<style lang="less">
	.f-inner-wrapper{
		min-height: 100%;
		transition: all .25s ease;
		&.dark{
			background: #b6b6b6;
		}
	}
</style>

<template>
	<div class="f-inner-wrapper" :class="isDialog ? 'dark' : ''">
		<controlwrappero :isDialog="isDialog" :datas="datas||[]" :currentId="currentId" :copyId="copyId" />
	</div>
</template>

<script>
	import Vue from "vue"
	import widgetlist from "@/components/widgets/list-elements"
	import postMessage from "@/util/postMessage"
	import event from "./components/event"
	import controlwrappero from "./components/control-wrapper-o"
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
			// controlwrapper,
			controlwrappero
		},
		data() {
			return {
				datas: [],
				currentId: '',
				copyId: '',
				isDialog: ''
			}
		},
		mounted() {
			this.$source = new postMessage(window.parent, window)
			this.$source.send("widgetnav", widgetlist.map((_data) => {
				return this.cloneWidgetRemoveComponent(_data)
			}))
			this.$source.receive("widgetlist", (data) => {
				this.datas = clone(data.list)
				this.isDialog = data.type === "hidden"
			})
			this.$source.receive("widgetcurrent", (currentwidget) => {
				this.currentId = currentwidget.id
			})
			this.$source.receive("widgetcopy", (copyWidget) => {
				this.copyId = copyWidget.id
			})
			event.$on("setControl", (id) => {
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

