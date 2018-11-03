import {
  extendDeep,
} from "@/util/util.js"

import layout from "./elements/layout"
import xtext from "./elements/xtext"
import xbutton from "./elements/xbutton"
import ximage from "./elements/ximage"
import xform from "./elements/xform"
/*
  默认一定要写的属性
  style: {
    display: ""
  }
*/
const list = [{
  name: "布局",
  wid: "layout",
  isWrapper: true,
  children: [],
  controls: {
    style: {
      "display": "block",
      "padding": "10px",
    }
  },
  component: layout
}, {
  name: "文字",
  wid: "xtext",
  component: xtext,
  controls: {
    style: {
      "display": "block"
    }
  }
}, {
  name: "按钮",
  wid: "xbutton",
  controls: {
    style: {
      "display": "inline-block",
      "padding": "24px 40px",
      "border-radius": "20px",
      "background-color": "#409eff",
      "color": "#fff"
    }
  },
  component: xbutton
}, {
  name: "图片",
  wid: "ximage",
  controls: {
    style: {
      "display": "inline-block",
      "margin": "10px",
      "color": "#abcdef",
      "width": "200px",
      "height": "200px",
      "border-radius": "200px"
    },
    props: {
      url: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1296403907,1724068158&fm=26&gp=0.jpg"
    }
  },
  component: ximage
}, {
  name: "表单",
  wid: "xform",
  controls: {
    style: {
      "display": "block",
    },
    props: {
      formitems: [{
        label: "名字",
        type: "input",
        rule: "required"
      }, {
        label: "手机",
        type: "input",
        rule: "phone"
      }, {
        label: "性别",
        type: "radio",
        values: ["男", "女"],
        rule: "required"
      }, {
        label: "城市",
        type: "select",
        values: ["北京", "上海"]
      }]
    }
  },
  component: xform
}]
list.forEach((data) => {
  extendDeep({
    controls: {
      style: {},
      props: {},
      action: {},
      base: {
        isLock: false
      }
    }
  }, data)
})
export default list
