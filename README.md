# mobilex

```javascript
{
  base:{
    style: {}
  },
  datas:[{
    id: "",             // 唯一ID,自生成
    name: "",           // * 组件名字 
    wid: "",            // * 组件id名字
    label: "",          // 组件描述 可以进行修改
    isWrapper: "",      // 是否是容器
    controls: {         
      base: {
        isLock: ""      // 是否被锁定
      },                // 基础数据
      actions: {},      // 操作数据
      props: {}         // 属性  内容根据组件需要自定义
      style: {
        block: ""       // *
      }                 
    }
  }],
  hidden: []
}
```