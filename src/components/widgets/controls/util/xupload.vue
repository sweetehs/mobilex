<style lang="less">
  .xupload-wrapper {
    position: relative;
    >div:first-child {
      display: flex;
      align-items: center;
      input[type=file] {
        position: absolute;
        opacity: 0;
        display: none;
      }
      .el-input {
        flex: 1;
        margin-right: 10px;
      }
      .fa {
        font-size: 18px;
        margin-right: 10px;
      }
    }
  }
</style>

<template>
  <div class="xupload-wrapper">
    <div>
      <el-input v-model="image"></el-input>
      <input @change="fileChange" ref="file" type="file" accept="image/*">
      <div @click="fileChoose" class="fa fa-cloud-upload"></div>
    </div>
    <div>
       <el-radio-group v-model="sizex">
          <el-radio :label="1">1X</el-radio>
          <el-radio :label="2">2X</el-radio>
          <el-radio :label="3">3X</el-radio>
        </el-radio-group>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import {
    clone
  } from "@/util/util"
  export default {
    props: ["value"],
    data() {
      return {
        image: this.value,
        sizex: 1
      }
    },
    watch: {
      value() {
        this.image = this.value
      },
      image() {
        this.$emit("input", this.image)
      }
    },
    methods: {
      fileChoose() {
        this.$refs.file.click()
      },
      fileChange() {
        const formData = new FormData()
        formData.append("file", this.$refs.file.files[0])
        axios({
          url: "/mobilex/upload",
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: "post",
          data: formData
        }).then((ajaxData) => {
          this.image = ajaxData.data.url
          const image = new Image()
          image.src = this.image
          image.onload = (e) => {
            this.$emit("change", {
              width: e.target.width/this.sizex,
              height: e.target.height/this.sizex
            })
            this.sizex = 1
          }
        })
      }
    }
  }
</script>

