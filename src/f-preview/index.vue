<template>
  <div class="preview-wrapper">
    <previewinner :datas="datas" @changeParent="changeData" />
    <previewinner :datas="hidden" @changeParent="changeData" type="xdialog" />
  </div>
</template>

<script>
  import previewinner from "./index.js"
  import axios from "axios"
  import Vue from "vue"
  import widgetlistcommon from "@/components/widgets/list-elements-common"
  import widgetlist from "@/components/widgets/list-elements"
  import rem from "@/util/rem"
  import { parseToRem } from "@/util/util"
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
    mounted() {
      axios({
        url: "/mobilex/subject/get",
        params: {
          id: "5bd29730e3cd3d3c7387b36d"
        }
      }).then((ajaxData) => {
        rem(750)
  
        const datas = JSON.parse(ajaxData.data.data).datas
        parseToRem(datas)
        this.datas = datas
  
        const hidden = JSON.parse(ajaxData.data.data).hidden
        parseToRem(hidden)
        this.hidden = hidden
  
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

