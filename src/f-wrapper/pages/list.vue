<style lang="less">
  .list-wrapper {
    padding: 20px;
    ul {
      li {
        display: flex;
      }
    }
    .box-card {
      flex: 1;
      margin-right: 10px;
      margin-bottom: 10px;
      .el-card__body {
        padding: 0;
        height: 100%;
      }
      &.empty{
        border: 1px solid transparent;
        box-shadow: none;
      }
      .header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .fa {
          margin-left: 5px;
          vertical-align: middle;
          font-size: 16px;
          &:hover {
            color: #409eff;
            cursor: pointer;
          }
        }
        .fa-close {
          margin-top: -2px;
        }
      }
      .content {
        position: relative;
        height: 400px;
        .default {
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          position: absolute;
          background: rgba(0, 0, 0, 0.3);
          font-size: 20px;
          text-align: center;
          padding-top: 50px;
          color: #fff;
          box-sizing: border-box;
        }
        .cover {
          background-size: 100%;
          height: 100%;
        }
      }
    }
    .add {
      height: 100%;
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
      <li v-for="(item,i) in list" :key="i">
        <el-card v-for="(item1,j) in item" :key="j" class="box-card" :class="{empty:item1.type === 'empty'}">
<template v-if="item1.type === 'add'">
  <div class="add">
    <i @click="addDialog = true" class="fa fa-plus-square-o" aria-hidden="true"></i>
  </div>
</template>
<template v-else-if="item1.type !== 'empty'">
  <div slot="header" class="header">
    <div class="action">
      <span class="fa fa-edit" @click="eventEdit(item1)"></span>
      <span class="fa fa-close" @click="eventDelete(item1)"></span>
    </div>
  </div>
  <div class="content">
    <div class="default">{{item1.name}}</div>
    <div class="cover" :style="{backgroundImage: `url(${item1.cover})`}"></div>
  </div>
</template>
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
          name: ""
        }
      }
    },
    mounted() {
      this.ajaxGetList()
    },
    methods: {
      dataGroup() {},
      ajaxGetList() {
        axios({
          url: '/mobilex/subject/all'
        }).then((ajaxData) => {
          ajaxData.data.unshift({
            type: "add"
          })
          let groupCount = 4
          let emptyCount = (groupCount - ajaxData.data.length % groupCount)
          for(let i = 0;i <emptyCount;i++){
            ajaxData.data.push({
              type: "empty"
            })
          }
          const list = []
          let temp = []
          ajaxData.data.forEach((data, i) => {
            if (i % groupCount === 0) {
              temp = []
              list.push(temp)
            }
            temp.push(data)
          })
          debugger
          this.list = list
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

