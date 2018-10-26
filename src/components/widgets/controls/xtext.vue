<template>
  <div class="control-text-wrapper">
    <el-form>
      <el-form-item label="文字" label-width="50px">
        <el-input type="textarea" v-model="props.text"></el-input>
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
        props: {
          text: ""
        }
      }
    }
  }
</script>
