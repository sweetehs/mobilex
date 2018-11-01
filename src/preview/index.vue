<template>
  <div class="preview-wrapper">
    <previewinner :datas="datas" :hidden="hidden" @changeParent="changeData" />
  </div>
</template>

<script>
  import previewinner from "./index.js"
  import axios from "axios"
  import Vue from "vue"
  import widgetlistcommon from "@/components/widgets/list-elements-common"
  import widgetlist from "@/components/widgets/list-elements"
  const setGlobalComponents = () => {
    widgetlist.forEach((_c) => {
      Vue.component(_c.wid, _c.component)
    });
  }
  setGlobalComponents()
  export default {
    mixins: [widgetlistcommon],
    components: {
      previewinner
    },
    data() {
      return {
        datas: [],
        hidden: [],
        middle: {}
      }
    },
    created() {
      axios({
        url: "/mobilex/subject/get",
        params: {
          id: "5bd29730e3cd3d3c7387b36d"
        }
      }).then((ajaxData) => {
        this.datas = JSON.parse(ajaxData.data.data).datas
        this.hidden = JSON.parse(ajaxData.data.data).hidden
        // 需要注册弹出层的数据
        this.hidden.forEach((_d) => {
          this.$set(this.middle, _d.id, false)
        })
      })
    },
    methods: {
      changeData(key, value) {
        this.middle[key] = value
      }
    }
  }
</script>

