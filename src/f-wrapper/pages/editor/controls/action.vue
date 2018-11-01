<template>
  <div class="control-action-wrapper">
    <el-form>
      <el-form-item label="操作" label-width="50px">
        <el-select v-model="props.type">
          <el-option value="">请选择操作</el-option>
          <el-option v-for="item in list" :key="item.value" :value="item.value" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="props.type == 'xdialog'" label="弹层" label-width="50px">
        <el-select v-model="props.value">
          <el-option value="">请选择操作</el-option>
          <el-option v-for="item in $store.state.$widget.widget.hidden" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import mixin from "@/components/widgets/mixin-control"
  export default {
    mixins: [mixin],
    data() {
      return {
        props: {
          type: "",
          value: ""
        },
        list: [{
          name: "弹窗",
          value: "xdialog"
        },{
          name: "链接",
          value: "xlink"
        }]
      }
    }
  }
</script>
