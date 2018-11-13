<template>
  <el-form>
    <el-form label-width="100px">
      <el-form-item v-if="!item.disabled" v-for="(item,i) in formlist" :key="i" :label="item.name">
        <el-input @change="itemChange" v-if="item.type=='input'" v-model="props[item.key]"></el-input>
        <el-radio-group @change="itemChange" v-if="item.type=='radio'" v-model="props[item.key]">
          <el-radio :label="r" v-for="r in item.values" :key="r">{{r}}</el-radio>
        </el-radio-group>
        <xupload @change="imgChange" v-if="item.type=='upload'" v-model="props[item.key]" />
      </el-form-item>
    </el-form>
  </el-form>
</template>

<script>
  export default {
    props: ["formlist", "props"],
    methods: {
      itemChange() {
        this.$emit("send")
      },
      imgChange(size) {
        this.$emit("imgChange", size)
        this.$emit("send")
      }
    }
  }
</script>

