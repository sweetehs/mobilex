<style lang="less">
	.f-inner-wrapper {
		background: #fff;
		min-height: 100%;
		transition: all .25s ease;
		padding: 1px;
		box-sizing: border-box;
		&.dark {
			background: #b6b6b6;
		}
	}
</style>

<template>
	<div :style="base.style" class="f-inner-wrapper" :class="isDialog ? 'dark' : ''">
		<controlwrapper :isDialog="isDialog" :datas="datas||[]" :currentId="currentId" :copyId="copyId" />
	</div>
</template>

<script>
	import Vue from "vue"
	import widgetlist from "@/components/widgets/list-elements"
	import postMessage from "@/util/postMessage"
	import event from "./components/event"
	import controlwrapper from "./components/control-wrapper"
	import rem from "@/util/rem"
	import {
		clone,
		parseToRem,
		handelCssData
	} from "@/util/util"
	// 全局注册component widget
	const setGlobalComponents = () => {
		widgetlist.forEach((data) => {
			data.list.forEach((_c)=>{
				Vue.component(_c.wid, _c.component)
			})
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
				base: {},
				currentId: '',
				copyId: '',
				isDialog: ''
			}
		},
		mounted() {
			// 设置尺寸
			rem(750)
			this.$source = new postMessage(window.parent, window)
			this.$source.send("widgetnav", widgetlist.map((_data) => {
				return this.cloneWidgetRemoveComponent(_data)
			}))
			this.$source.receive("widgetlist", (data) => {
				const list = clone(data.list)
				handelCssData(data.base.style)
				parseToRem(list)
				this.datas = list
				this.base = data.base
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

