<style lang="less">
  .control-xform {
    padding-right: 10px;
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .item-common,
      .item-special {
        position: relative;
        .fa {
          position: absolute;
          right: -15px;
          top: 8px;
          font-size: 12px;
          &:hover {
            color: #fff;
          }
        }
      }
      .item-common {
        display: flex;
        >div:not(:last-child) {
          flex: 1;
          margin-right: 10px;
        }
      }
      .item-special {
        p {
          margin-bottom: 10px;
          position: relative;
        }
      }
    }
  }
</style>

<template>
  <div class="control-xform">
    <div class="item" v-for="(item,i) in props.formitems" :key="i">
      <el-form label-width="40px">
        <el-form-item label="项">
          <div class="item-common">
            <a v-if="item.type !== 'input'" href="javascript:;" class="fa fa-plus" @click="eventAddItem(item)"></a>
            <el-input v-model="item.label"></el-input>
            <el-select v-model="item.type">
              <el-option v-for="(t,i) in formType" :key="i" :value="t.value" :label="t.name"></el-option>
            </el-select>
          </div>
          <div class="item-rule">
            <el-radio-group v-model="item.rule">
              <el-radio v-for="(item,i) in formRule" :label="item.value" :key="i">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          <div v-if="item.type !== 'input'" class="item-special">
            <p v-for="(t,i) in item.values" :key="i">
              <el-input v-model="item.values[i]"></el-input>
              <a href="javascript:;" class="fa fa-remove" @click="item.values.splice(i,1)"></a>
            </p>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>''

<script>
  import mixin from "../mixin-control"
  export default {
    mixins: [mixin],
    data() {
      return {
        test: "",
        props: {},
        formType: [{
          name: "文本框",
          value: "input"
        }, {
          name: "单选框",
          value: "radio"
        }, {
          name: "下拉菜单",
          value: "select"
        }],
        formRule: [{
          name: "无",
          value: ""
        }, {
          name: "必填",
          value: "required"
        }, {
          name: "手机",
          value: "phone"
        }, {
          name: "邮箱",
          value: "email"
        }]
      }
    },
    methods: {
      eventAddItem(data) {
        if (!data.values) {
          this.$set(data, "values", [])
        }
        data.values.push('')
      }
    }
  }
</script>
