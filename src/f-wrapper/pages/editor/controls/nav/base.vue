<template>
  <div class="control-base-wrapper">
    <el-form>
      <el-form-item label="名称" label-width="50px">
        <el-input v-model="list.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { clone } from "@/util/util"
  export default {
    props: ["bdata"],
    data(){
      return {
        list: {}
      }
    },
    watch: {
      bdata: {
        deep: true,
        handler() {
          this.$parseData && this.$parseData(this.bdata)
        }
      },
      list: {
        deep: true,
        handler() {
          this.$emit("change", this.$reverseData())
        }
      }
    },
    created() {
      this.$parseData && this.$parseData(this.bdata)
    },
    methods: {
      $parseData() {
        this.list = clone(this.bdata)
      },
      $reverseData(){
        return clone(this.list)
      }
    }
  }
</script>

