<template>
  <div class="control-layout">
    <el-form label-width="80px">
      <el-form-item label="FLex布局">
        <el-checkbox v-model="props.flex.display"></el-checkbox>
      </el-form-item>
      <el-form-item label="方向">
        <el-radio-group v-model="props.flex['flex-direction']">
          <el-radio label="column">column</el-radio>
          <el-radio label="row">row</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="flex值">
        <el-checkbox></el-checkbox>
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
        props: {
          flex: {
            display: false,
            'flex-direction': 'row',
            flex: 'none'
          }
        }
      }
    },
    methods: {
      $parseData(props) {
        if (props.flex) {
          const {
            display
          } = props.flex
          props.flex.display = display === "flex" ? true : false
          this.props = props
        }
      },
      $reverseData(props) {
        if (props.display) {
          props.display = 'flex'
        } else {
          delete props.display
        }
        return props
      }
    }
  }
</script>
