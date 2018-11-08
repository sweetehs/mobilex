<style lang="less">
  .list-wrapper {
    padding: 20px;
    ul {
      li {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
    .box-card {
      width: 300px;
      height: 350px;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .content {
        .default {
          font-size: 30px;
          text-align: center;
          margin-top: 50px;
        }
      }
    }
    .add {
      height: 350px;
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      .fa {
        font-size: 80px;
      }
    }
  }
</style>

<template>
  <div class="list-wrapper">
    <ul>
      <li>
        <div class="add">
          <i @click="addDialog = true" class="fa fa-plus-square-o" aria-hidden="true"></i>
        </div>
      </li>
      <li v-for="(item,i) in list" :key="i">
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>{{item.name}}</span>
            <div class="action">
              <span class="fa fa-edit" @click="eventEdit(item)"></span>
              <span class="fa fa-close" @click="eventDelete(item)"></span>
            </div>
          </div>
          <div class="content">
            <div class="default">MobileX</div>
          </div>
        </el-card>
      </li>
    </ul>
    <el-dialog title="添加" :visible.sync="addDialog" width="500px">
      <el-form label-width="90px">
        <el-form-item label="专题标题：">
          <el-input placeholder="请输入专题名称" v-model="addData.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="action fn-center">
        <el-button type="primary" @click="eventAdd()">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    data() {
      return {
        list: [],
        addDialog: false,
        addData: {
          name: "添加测试"
        }
      }
    },
    mounted() {
      this.ajaxGetList()
    },
    methods: {
      ajaxGetList() {
        axios({
          url: '/mobilex/subject/all'
        }).then((ajaxData) => {
          this.list = ajaxData.data
        })
      },
      eventEdit(item) {
        this.$router.push({
          path: '/editor/' + item._id
        })
      },
      eventDelete(item) {
        axios({
          url: '/mobilex/subject/delete',
          method: "post",
          data: {
            id: item._id
          }
        }).then((ajaxData) => {
          this.ajaxGetList()
          this.$message.success("删除成功");
        })
      },
      eventAdd() {
        axios({
          url: '/mobilex/subject/save',
          method: "post",
          data: {
            name: this.addData.name
          }
        }).then((ajaxData) => {
          this.ajaxGetList()
          this.addDialog = false;
          this.$message.success("新建成功");
        })
      }
    }
  }
</script>

