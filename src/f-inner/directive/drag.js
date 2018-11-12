const getParent = (el) => {
  const $parent = el.parentNode
  if ($parent) {
    const position = $parent.style ? $parent.style.position : ""
    if (
      $parent.className &&
      $parent.className.indexOf("item-control-wrapper") !== -1 &&
      (position != "" && position != "static")
    ) {
      return $parent
    } else if ($parent.parentNode) {
      return getParent($parent)
    }
  }
  if ($parent === document) {
    return document.querySelector(".f-inner-wrapper .overlay")
  }
}
export default {
  inserted: function (el, binding) {
    var offsetX = 0
    var offsetY = 0
    let isMove = false
    const $parent = getParent(el)
    el.setAttribute("x-drag", binding.value.canDrag)
    function down(e) {
      if (el.getAttribute("x-drag") == "false") {
        return
      }
      $parent.style.backgroundColor = "rgba(255,228,181,0.7)"
      offsetX = (e.pageX - el.offsetLeft)
      offsetY = (e.pageY - el.offsetTop)
      el.style.cursor = "move"
      addEventListener("mousemove", move)
      addEventListener("mouseup", up)
      e.stopPropagation()
    }

    function move(e) {
      isMove = true
      el.style.left = (e.pageX - offsetX) + "px"
      el.style.top = (e.pageY - offsetY) + "px"
    }

    function up() {
      $parent.style.backgroundColor = ""
      removeEventListener("mousemove", move)
      removeEventListener("mouseup", up)
      if(!isMove){
        return 
      }
      isMove = false
      let left = 0
      let top = 0
      if (el.style.left.indexOf("px") !== -1) {
        left = -~el.style.left.replace("px", "") * 2
        top = -~el.style.top.replace("px", "") * 2
      } else {
        left = -~el.style.left.replace("rem", "") * 100
        top = -~el.style.top.replace("rem", "") * 100
      }
      binding.value.dragEnd && binding.value.dragEnd(left + "px", top + "px")
    }
    el.addEventListener("mousedown", down)
  },
  update(el, binding) {
    if (binding.value.canDrag !== binding.oldValue.canDrag) {
      el.setAttribute("x-drag", binding.value.canDrag)
    }
  }
}
