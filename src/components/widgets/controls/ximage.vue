<template>
  <div class="ximage-wrapper">
    <el-form>
      <el-form-item label="地址" label-width="50px">
        <el-input v-model="props.url"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import mixin from "../mixin-control"
  export default {
    mixins: [mixin],
    data() {
      return {
        props: {}
      }
    }
  }
</script>
