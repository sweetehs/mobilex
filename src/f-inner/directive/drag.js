export default {
  bind(el, binding) {
    var x = 0;
    var y = 0;
    var l = 0;
    var t = 0;
    var isDown = false;
    el.setAttribute("x-drag", binding.value)
    el.addEventListener("mousedown", (e) => {
      if(el.getAttribute("x-drag") == "false"){
        return 
      }
      //获取x坐标和y坐标
      x = e.clientX;
      y = e.clientY;

      //获取左部和顶部的偏移量
      l = el.offsetLeft;
      t = el.offsetTop;
      //开关打开
      isDown = true;
      //设置样式  
      el.style.cursor = 'move';
    })
    window.onmousemove = function (e) {
      if (isDown == false) {
        return;
      }
      //获取x和y
      var nx = e.clientX;
      var ny = e.clientY;
      //计算移动后的左偏移量和顶部的偏移量
      var nl = nx - (x - l);
      var nt = ny - (y - t);

      el.style.left = nl + 'px';
      el.style.top = nt + 'px';
    }
    //鼠标抬起事件
    el.onmouseup = function () {
      //开关关闭
      isDown = false;
      el.style.cursor = 'default';
    }
  },
  update(el, binding) {
    if (binding.value !== binding.oldValue) {
      el.setAttribute("x-drag", binding.value)
    }
  }
}
