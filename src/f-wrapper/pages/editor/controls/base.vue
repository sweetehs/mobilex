<template>
  <div class="control-base-wrapper">
    <el-form>
      <div v-if="props.style">
        <el-form-item label="文字颜色" label-width="80px">
          <el-input v-model="props.style.color"></el-input>
        </el-form-item>
         <el-form-item label="内边距" label-width="80px">
          <el-input v-model="props.style.padding"></el-input>
        </el-form-item>
        <el-form-item label="背景颜色" label-width="80px">
          <el-input v-model="props.style['background-color']"></el-input>
        </el-form-item>
        <el-form-item label="背景url" label-width="80px">
          <xupload v-model="props.style['background-image']"/>
        </el-form-item>
        <el-form-item label="背景重复" label-width="80px">
          <el-radio-group v-model="props.style['background-repeat']">
            <el-radio label="no-repeat">无重复</el-radio>
            <el-radio label="repeat">重复</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {
    clone
  } from "@/util/util"
  import mixin from "@/components/widgets/mixin-control"
  import xupload from "@/components/widgets/controls/util/xupload"
  export default {   
    mixins: [mixin],
    components: {
      xupload
    },
    data() {
      return {
        props: {}
      }
    },
    methods: {
      $parseData(data) {
        if (!data.style) {
          data.style = {
            "padding": "",
            "color": "",
            "background-image": "",
            "background-color": "",
            "background-size": "100%",
            "background-repeat": "no-repeat"
          }
        }
        this.props = data
      }
    }
  }
</script>

