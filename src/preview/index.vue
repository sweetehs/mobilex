<template>
  <div class="preview-wrapper">
    <previewinner :datas="datas"/>
  </div>
</template>

<script>
  import previewinner from "./index.js"
  import axios from "axios"
  export default {
    components: {
      previewinner
    },
    data(){
      return {
        datas: []
      }
    },
    created(){
      axios({
        url: "/mobilex/subject/get",
        params: {
          id: "5bd29730e3cd3d3c7387b36d"
        }
      }).then((ajaxData)=>{
        this.datas = JSON.parse(ajaxData.data.data).datas
      })
    }
  }
</script>

