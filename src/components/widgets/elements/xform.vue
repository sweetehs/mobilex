<style lang="less" scoped>
  .xform-wrapper {
    padding: 0.4rem;
    overflow: hidden;
    .form-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.88rem;
      &:not(:last-child) {
        margin-bottom: 0.2rem;
      }
      >span {
        width: 1rem;
        text-align: right;
        margin-right: 0.3rem;
      }
      >div {
        flex: 1;
      }
    }
    .x-input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f4f5f6;
      border: none;
      border-radius: 0.04rem;
      box-sizing: border-box;
      height: 0.88rem;
      padding: 0 0.24rem;
      position: relative;
      width: 100%;
      input {
        color: #999;
        background: #f4f5f6;
        width: 100%;
        font-size: 0.28rem;
      }
      ::-webkit-input-placeholder{
        color: #999;
      }
    }
    .x-select {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f4f5f6;
      border: none;
      border-radius: 0.04rem;
      box-sizing: border-box;
      color: #999;
      height: 0.88rem;
      padding: 0 0.24rem;
      position: relative;
      width: 100%;
      select{
        color: #999;
        width: 100%;
        font-size: 0.28rem;
        &:focus{
          outline: none;
        }
      }
    }
    .action{
      margin-top: 0.4rem;
      a{
        font-weight: bold;
        display: block;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        border: 0.02rem solid #eee;
        border-radius: 0.02rem;
        background: #ffe100;
        border-radius: 0.1rem;
        color: #333;
        text-align: center;
      }
    }
  }
</style>

<template>
  <div class="xform-wrapper">
    <div class="form-item" v-for="(item,i) in forms" :key="i">
      <span>{{item.label}}</span>
      <div>
        <div class="x-input" v-if="item.type=='input'">
          <input :placeholder="`请填写${item.label}`" v-model="item.value" type="text">
        </div>
        <div v-if="item.type=='radio'" class="x_radio">
          <label v-for="radio in item.values" :key="radio">
            <input type="radio" :name="item.label">{{radio}}
          </label>
        </div>
        <div v-if="item.type=='select'" class="x-select">
          <select :placeholder="`请选择${item.label}`" v-model="item.value">
            <option value="">请选择</option>
            <option :value="select" v-for="select in item.values" :key="select">{{select}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="action">
      <a href="javascript:;" @click="submit">提交信息</a>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import {
    clone
  } from "../utils/util"
  export default {
    props: ["formitems", "url"],
    data() {
      return {
        forms: clone(this.formitems) || [],
        rules: {
          required(value) {
            if (value) {
              return true
            }
            return false
          },
          phone(value) {
            if (value && value.replace(/\s/g, "").length == 11 && /^\d{10}\d$/.test(value)) {
              return true
            }
            return false
          },
          email() {
            return;
          }
        }
      }
    },
    watch: {
      formitems() {
        this.forms = clone(this.formitems.map((data) => {
          data.value = ""
          return data
        }))
      }
    },
    methods: {
      submit() {
        const that = this
        let error = ""
        this.forms.forEach((_data) => {
          if (!error) {
            if (_data.rule && !that.rules[_data.rule](_data.value)) {
              error = "请输入正确的" + _data.label
            }
          }
        })
        if (error) {
          alert(error)
        } else {
          axios({
            url: this.url,
            method: "post",
            data: this.forms
          })
        }
      }
    }
  }
</script>

