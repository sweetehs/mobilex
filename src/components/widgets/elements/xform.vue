<style lang="less">
  .xform-wrapper {
    padding: 10px;
    overflow: hidden;
    .form-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      >span {
        width: 60px;
        text-align: right;
        margin-right: 10px;
      }
      >div {
        flex: 1;
      }
    }
    .action{
      text-align: center;
      a{
        color: #333;
        display: inline-block;
        padding: 10px;
      }
    }
    .x_input {
      box-sizing: border-box;
      padding: 0 10px;
      height: 30px;
      width: 100%;
      border: 1px solid #b6b6b6;
      border-radius: 5px;
    }
    .x_select{
      min-width: 100px;
    }
  }
</style>

<template>
  <div class="xform-wrapper">
    <div class="form-item" v-for="(item,i) in forms" :key="i">
      <span>{{item.label}}：</span>
      <div>
        <input v-if="item.type=='input'" class="x_input" type="text">
        <div v-if="item.type=='radio'" class="x_radio">
          <label v-for="radio in item.values" :key="radio">
            <input type="radio" :name="item.label">{{radio}}
          </label>
        </div>
        <div v-if="item.type=='select'" class="x_select">
          <select>
            <option value="">请选择</option>
            <option :value="select" v-for="select in item.values" :key="select">{{select}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="action">
      <a href="javascript:;">提交</a>
    </div>
  </div>
</template>

<script>
  import { clone } from "../utils/util"
  export default {
    props: ["formitems"],
    data() {
      return {
        forms: clone(this.formitems) || []
      }
    },
    watch: {
      formitems(){
        this.forms = clone(this.formitems)
      }
    }
  }
</script>

