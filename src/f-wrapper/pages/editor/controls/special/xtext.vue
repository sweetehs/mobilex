<template>
  <div class="control-text-wrapper">
    <el-form>
      <el-form-item label="文字" label-width="50px">
        <el-input v-model="list.text"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import mixin from "../mixin"
  export default {
    mixins: [mixin],
    data() {
      return {
        list: {
          text: ""
        }
      }
    },
    methods: {
      $parseData(data) {
        if(data){
          this.list = data
        }
      },
      $reverseData() {
        debugger
        return {
          props: this.list
        }
      }
    }
  }
</script>
