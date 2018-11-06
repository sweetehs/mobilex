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
const mapList = [{
  name: "布局",
  list: [{
    name: "布局",
    wid: "layout",
    isWrapper: true,
    children: [],
    style: {
      "display": "block",
      "padding": "20px",
      "min-height": "60px"
    },
    component: layout
  }]
}, {
  name: "基础",
  list: [{
    name: "文字",
    wid: "xtext",
    component: xtext,
    ajaxkey: "text",
    style: {
      "display": "block"
    },
    props: {
      text: "默认文字"
    }
  }, {
    name: "图片",
    wid: "ximage",
    ajaxkey: "url",
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
    },
    component: ximage
  }, {
    name: "按钮",
    wid: "xbutton",
    style: {
      "display": "inline-block",
      "padding": "24px 40px",
      "border-radius": "20px",
      "background-color": "#409eff",
      "color": "#fff"
    },
    component: xbutton
  }]
}, {
  name: "复合",
  list: [{
    name: "表单",
    wid: "xform",
    style: {
      "display": "block",
    },
    props: {
      url: "www.baidu.com",
      formitems: [{
        label: "名字",
        key: "name",
        type: "input",
        rule: "required"
      }, {
        label: "手机",
        key: "phone",
        type: "input",
        rule: "phone"
      }, {
        label: "性别",
        key: "sex",
        type: "radio",
        values: ["男", "女"],
        rule: "required"
      }, {
        label: "城市",
        key: "city",
        type: "select",
        values: ["北京", "上海"]
      }]
    },
    component: xform
  }]
}]
mapList.forEach((data1) => {
  data1.list.forEach((data2) => {
    extendDeep({
      key: "",
      style: {},
      props: {},
      action: {},
      ajax: {},
      base: {
        isLock: false
      }
    }, data2)
  })
})
export default mapList
