<style lang="less">
  .control-xform {
    padding-right: 20px;
    .item {
      margin-bottom: 30px;
      .item-common,
      .item-special {
        position: relative;
        margin-bottom: 5px;
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
    <el-form label-width="100px">
      <el-form-item label="ajax地址">
        <el-input @change="$send" v-model="props.url"></el-input>
      </el-form-item>
      <el-form-item class="item" v-for="(item,i) in props.formitems" :key="i">
        <div slot="label">
          <div class="fn-mb5">
            <el-input v-model="item.label"></el-input>
          </div>
          <div>
            <el-input @change="$send" v-model="item.key"></el-input>
          </div>
        </div>
        <div class="item-common">
          <a v-if="item.type !== 'input'" href="javascript:;" class="fa fa-plus" @click="eventAddItem(item)"></a>
          <el-select @change="$send" v-model="item.type">
            <el-option v-for="(t,i) in formType" :key="i" :value="t.value" :label="t.name"></el-option>
          </el-select>
        </div>
        <div class="item-rule fn-mb5">
          <el-radio-group @change="$send" v-model="item.rule">
            <el-radio v-for="(item,i) in formRule" :label="item.value" :key="i">{{item.name}}</el-radio>
          </el-radio-group>
        </div>
        <div v-if="item.type !== 'input'" class="item-special">
          <p v-for="(t,i) in item.values" :key="i">
            <el-input @change="$send" v-model="item.values[i]"></el-input>
            <a href="javascript:;" class="fa fa-remove" @click="eventDeleteItem(item,i)"></a>
          </p>
        </div>
      </el-form-item>
    </el-form>
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
        this.$send()
      },
      eventDeleteItem(item, i) {
        item.values.splice(i, 1)
        this.$send()
      }
    }
  }
</script>
