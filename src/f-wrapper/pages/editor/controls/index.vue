<style lang="less">
  .controls-inner {
    .el-tabs__nav-wrap {
      padding: 0 5px;
    }
    .el-tab-pane {
      padding: 0 10px;
    }
    .el-input.small {
      width: 50px;
      margin-right: 2px;
      .el-input__inner {
        padding: 0 5px;
        text-align: center;
      }
    }
  }
</style>

<template>
  <div class="controls-inner">
    <el-tabs v-if="currentWidget">
      <el-tab-pane label="样式" name="0">
        <Controlstyle @change="peventChangeData" :styledata="currentWidget.controls.style" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Controlstyle from "./style"
  export default {
    components: {
      Controlstyle
    },
    computed: {
      currentWidget() {
        return this.$store.state.$widget.currentWidget
      }
    },
    methods: {
      peventChangeData(data) {
        this.$emit("change", {
          controls: data
        })
      }
    }
  }
</script>

