<style lang="less">
  .controls-inner {
    .el-tabs__nav-wrap {
      padding: 0 5px;
    }
    .el-tab-pane {
      padding: 0 10px;
    }
    .el-input,
    .el-select {
      width: 100%;
    }
  }
</style>

<template>
  <div class="controls-inner">
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="基础" name="0">
        <Controlbase @change="peventChangeBaseData" :bdata="baseData" />
      </el-tab-pane>
      <el-tab-pane label="样式" name="1" v-if="currentWidget ? true : false">
        <Controlstyle @change="peventChangeStyleData" :bdata="currentWidget.style" :tdata="currentWidget.temp" />
      </el-tab-pane>
      <el-tab-pane label="操作" name="2" v-if="currentWidget ? true : false">
        <Controlaction @change="preventChangeActionData" :bdata="currentWidget.action" />
      </el-tab-pane>
      <el-tab-pane label="个性化" name="3" v-if="currentWidget ? true : false">
        <component @change="peventChangePropsData" :is="currentWidget.wid" :bdata="(currentWidget) ? currentWidget.props : {}" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Controlstyle from "./style"
  import Controlbase from "./base"
  import Controlaction from "./action"
  import mixinlist from "@/components/widgets/list-controls"
  import {
    clone
  } from "@/util/util"
  export default {
    mixins: [mixinlist],
    components: {
      Controlstyle,
      Controlbase,
      Controlaction
    },
    data() {
      return {
        tabIndex: "0"
      }
    },
    computed: {
      currentWidget() {
        return this.$store.state.$widget.currentWidget
      },
      baseData() {
        return this.$store.state.$widget.widget.base
      }
    },
    methods: {
      peventChangeStyleData(data) {
        this.$emit("change", {
          style: clone(data)
        })
      },
      peventChangePropsData(data) {
        this.$emit("change", {
          props: clone(data)
        })
      },
      preventChangeActionData(data) {
        this.$emit("change", {
          action: clone(data)
        })
      },
      peventChangeBaseData(data) {
        this.$emit("changeBase", {
          base: clone(data)
        })
      }
    }
  }
</script>

