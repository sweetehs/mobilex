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
		.content-wrapper{
			flex: 1;
			overflow: auto;
		}
	}
</style>

<template>
  <div class="f-wrapper-wrapper">
		<div class="content-wrapper">
			<router-view/>
		</div>
	</div>
</template>
<script>
// import * as monaco from 'monaco-editor';
export default {
	mounted(){
		// monaco.editor.create(this.$refs.editor, {
    //     value: [
    //       'function x() {',
    //       '\tconsole.log("Hello world!");',
    //       '}'
    //     ].join('\n'),
    //     language: 'javascript'
    //   });
	}
}
</script>

