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
export default [{
  name: "布局",
  wid: "layout",
  isWrapper: true,
  children: [],
  controls: {
    style: {
      "display": "block",
      "padding": "10px 10px 10px 10px",
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
      "display": "inline-block"
    }
  },
  component: xbutton
}, {
  name: "图片",
  wid: "ximage",
  controls: {
    style: {
      "display": "inline-block",
      "margin": "10px 10px 10px 10px",
      "color": "#abcdef",
      "width": "100px",
      "height": "100px",
      "border-radius": "100px"
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
        type: "input"
      }, {
        label: "地址",
        type: "input"
      }, {
        label: "性别",
        type: "radio",
        values: ["男", "女"]
      }, {
        label: "城市",
        type: "select",
        values: ["北京", "上海"]
      }]
    }
  },
  component: xform
}]
