<style lang="less">
  .xform-wrapper {
    padding: 0.4rem;
    overflow: hidden;
    .form-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.6rem;
      &:not(:last-child) {
        margin-bottom: 0.2rem;
      }
      >span {
        width: 1.2rem;
        text-align: right;
        margin-right: 0.2rem;
      }
      >div {
        flex: 1;
      }
    }
    .action {
      text-align: center;
      a {
        color: #333;
        display: inline-block;
        padding: 0.2rem;
      }
    }
    .x_input {
      box-sizing: border-box;
      padding: 0 0.2rem;
      height: 0.6rem;
      width: 100%;
      border: 0.02rem solid #b6b6b6;
      border-radius: 0.1rem;
    }
    .x_select {
      min-width: 2rem;
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
      <a href="javascript:;" @click="submit">提交</a>
    </div>
  </div>
</template>

<script>
  import {
    clone
  } from "../utils/util"
  export default {
    props: ["formitems"],
    data() {
      return {
        forms: clone(this.formitems) || [],
        rules: {
          required(value) {
            if (!value) {
              return false
            }
            return true
          },
          phone(value) {
            if (value.replace(/\s/g, "").length !== 11 && !value.test(/^\d{10}\d$/)) {
              return false
            }
            return true
          },
          email() {
            return;
          }
        }
      }
    },
    watch: {
      formitems() {
        this.forms = clone(this.formitems)
      }
    },
    methods: {
      submit() {
        let error = ""
        this.forms.forEach((_data) => {
            if (!error) {
              if(_data.value || !this.rules[_data.rule](_data.value)) {
              error = "请输入正确的" + _data.label
            }
          }
        })
      if (error) {
        alert(error)
      }
    }
  }
  }
</script>

