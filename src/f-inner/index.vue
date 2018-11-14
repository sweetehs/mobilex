<style lang="less">
	.f-inner-wrapper {
		background: #fff;
		min-height: 100%;
		transition: all .25s ease;
		// padding: 2px;
		box-sizing: border-box;
		position: relative;
		.overlay {
			position: absolute;
			height: 100%;
			width: 100%;
			left: 0;
			right: 0;
		}
		&.dark {
			background: #b6b6b6!important;
			background-image: none!important;
		}
	}
</style>

<template>
	<div :style="base.style" class="f-inner-wrapper" :class="isDialog ? 'dark' : ''">
		<div class="overlay"></div>
		<controlwrapper :isDialog="isDialog" :datas="datas||[]" :currentId="currentId" :copyId="copyId" :cutId="cutId" />
	</div>
</template>

<script>
	import Vue from "vue"
	import widgetlist from "@/components/widgets/list-elements"
	import widgetlistcommon from "@/components/widgets/list-elements-common"
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
			data.children.forEach((_c) => {
				Vue.component(_c.wid, _c.component)
			})
		});
	}
	setGlobalComponents()
	const setGlobalCommonComponents = () => {
		for (let i in widgetlistcommon) {
			Vue.component(i, widgetlistcommon[i])
		}
	}
	setGlobalCommonComponents()
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
				cutId: '',
				isDialog: '',
				tryOne: true
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
				this.tryOne = false
				setTimeout(() => {
					// 强制刷新所有组件
					this.tryOne = true
				})
				const list = clone(data.list)
				handelCssData(data.base.style)
				parseToRem(list)
				this.datas = list
				this.base = clone(data.base)
				this.isDialog = data.type === "hidden"
				// 设置外框的颜色
				this.setItemBorder()
			})
			this.$source.receive("widgetcurrent", (currentwidget) => {
				this.currentId = currentwidget.id
			})
			this.$source.receive("widgetcopy", (copyWidget) => {
				this.copyId = copyWidget.id
			})
			this.$source.receive("widgetcut", (cutWidget) => {
				this.cutId = cutWidget.id
			})
			this.$source.receive("cutstart", () => {
				let $overlay = document.querySelectorAll(".overlay")
				for (let i = 0; i < $overlay.length; i++) {
					$overlay[i].style.border = "none"
				}
				this.$source.send("cutover")
			})
			event.$on("setControl", (id) => {
				this.$source.send("widgetcontrol", id)
			})
			event.$on("update", (data) => {
				this.$source.send("updateitem", data)
			})
		},
		methods: {
			setItemBorder() {
				if (this.base.borderColor) {
					var head = document.getElementsByTagName('head')[0];
					var s = document.createElement('style');
					const css = `
								.item-control-wrapper div.overlay{
									border: 1px dashed ${this.base.borderColor};
								}
							`
					s.setAttribute('type', 'text/css');
					s.appendChild(document.createTextNode(css));
					head.appendChild(s);
				}
			},
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

