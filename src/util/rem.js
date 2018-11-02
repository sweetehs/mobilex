export default function (uiWidth) {
  ! function (e, t) {
    uiWidth = uiWidth || 375
    var i = e.documentElement,
      n = "orientationchange" in window ? "orientationchange" : "resize",
      a = navigator.userAgent.match(/iphone|ipad|ipod/i),
      d = function () {
        var e = i.clientWidth,
          t = i.clientHeight;
        e && (uiWidth <= e && (e = uiWidth), i.style.fontSize = e / uiWidth * 100 + "px", i.dataset.percent = e / uiWidth *
          100, i.dataset.width = e, i.dataset.height = t)
      };
    d(), a && e.documentElement.classList.add("iosx" + t.devicePixelRatio), e.addEventListener && t.addEventListener(
      n, d, !1)
  }(document, window)
}
