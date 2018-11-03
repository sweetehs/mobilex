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
        <el-select v-model="props.xdialog.id">
          <el-option value="">请选择操作</el-option>
          <el-option v-for="item in $store.state.$widget.widget.hidden" :key="item.id" :value="item.id" :label="item.label||item.name"></el-option>
        </el-select>
      </el-form-item>
      <div v-if="props.type == 'xlink'">
        <el-form-item label="url" label-width="50px">
          <el-input v-model="props.xlink.url"></el-input>
        </el-form-item>
        <el-form-item label="窗口" label-width="50px">
          <el-radio-group v-model="props.xlink.target">
            <el-radio label="">在被页面打开</el-radio>
            <el-radio label="_blank">在新页面打开</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
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
          xdialog: {
            id: ""
          },
          xlink: {}
        },
        list: [{
          name: "弹窗",
          value: "xdialog"
        }, {
          name: "链接",
          value: "xlink"
        }]
      }
    }
  }
</script>
