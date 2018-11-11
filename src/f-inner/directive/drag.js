const getParent = (el) => {
  const $parent = el.parentNode
  if ($parent) {
    const position = $parent.style ? $parent.style.position : ""
    if (
      $parent.className &&
      $parent.className.indexOf("item-control-wrapper") !== -1 &&
      (position != "" || position != "static")
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
  bind: function (el, binding) {
    var offsetX = 0
    var offsetY = 0
    el.setAttribute("x-drag", binding.value.canDrag)

    function down(e) {
      if (el.getAttribute("x-drag") == "false") {
        return
      }
      getParent(el).style.backgroundColor = "rgba(255,228,181,0.7)"
      offsetX = (e.pageX - el.offsetLeft)
      offsetY = (e.pageY - el.offsetTop)
      el.style.cursor = "move"
      addEventListener("mousemove", move)
      addEventListener("mouseup", up)
    }

    function move(e) {
      el.style.left = (e.pageX - offsetX) + "px"
      el.style.top = (e.pageY - offsetY) + "px"
    }

    function up() {
      getParent(el).style.backgroundColor = ""
      binding.value.dragEnd && binding.value.dragEnd()
      removeEventListener("mousemove", move)
      removeEventListener("mouseup", up)
    }
    el.addEventListener("mousedown", down)
  },
  update(el, binding) {
    if (binding.value.canDrag !== binding.oldValue.canDrag) {
      el.setAttribute("x-drag", binding.value.canDrag)
    }
  }
}
