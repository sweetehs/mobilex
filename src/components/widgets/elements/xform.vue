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
       ::-webkit-input-placeholder {
        color: #999;
      }
    }
    .x-radio{
      input[type=radio]{
        position: absolute;
        opacity: 0;
      }
      span{
        display: inline-block;
        vertical-align: middle;
      }
      div{
        display: inline-block;
        width: 0.28rem;
        height: 0.28rem;
        border-radius: 0.4rem;
        border: 0.02rem solid #ffe100;
        vertical-align: middle;
        margin-right: 0.2rem;
        position: relative;
        &:after{
          content: "";
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 0.18rem;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
      }
      input[type=radio]:checked + div{
        &:after{
          background: #ffe100;
        }
      }
    }
    .action {
      margin-top: 0.4rem;
      a {
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
        <div v-if="item.type=='radio'">
          <label v-for="radio in item.values" :key="radio" class="x-radio">
            <span>{{radio}}</span>
            <input :value="radio" v-model="item.value" type="radio" :name="item.label">
            <div></div>
          </label>
        </div>
        <div v-if="item.type=='select'">
          <xselect v-model="item.value" :placeholder="`请选择${item.label}`" :options="item.values"/>
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
    created() {
      this.setInit()
    },
    watch: {
      formitems() {
        this.setInit()
      }
    },
    methods: {
      setInit() {
        this.forms = clone(this.formitems.map((data) => {
          data.value = ""
          return data
        }))
      },
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

