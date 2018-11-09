<template>
  <div class="ximage-wrapper">
    <el-form>
      <el-form-item label="地址" label-width="50px">
        <xupload v-model="props.url"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import xupload from "./util/xupload"
  import mixin from "../mixin-control"
  export default {
    mixins: [mixin],
    components: {
      xupload
    },
    data() {
      return {
        props: {}
      }
    }
  }
</script>
