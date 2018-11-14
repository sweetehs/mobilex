<template>
  <div class="control-base-wrapper">
    <xformall :formlist="formlist" :props="props.style||{}" @send="$send"/>
    <el-form>
      <el-form-item label="组件边框颜色" label-width="100px">
        <el-input @change="$send" v-model="props.borderColor"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    clone
  } from "@/util/util"
  import mixin from "@/components/widgets/mixin-control"
  export default {
    mixins: [mixin],
    data() {
      return {
        formlist: [{
          name: "文字颜色",
          key: "color",
          type: "input",
          disabled: false
        },{
          name: "内边距",
          key: "padding",
          type: "input",
          disabled: false
        },{
          name: "背景颜色",
          key: "background-color",
          type: "input",
          disabled: false
        },{
          name: "背景URL",
          key: "background-image",
          type: "upload",
          disabled: false
        },{
          name: "背景重复",
          key: "background-repeat",
          type: "radio",
          values: ["repeat", "no-repeat"],
          disabled: false
        }],
        props: {}
      }
    }
  }
</script>

