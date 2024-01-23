var heo = {
  hideTodayCard: function() {
    document.getElementById("todayCard") && document.getElementById("todayCard").classList.add("hide")
  }
}
function whenDOMReady() {
  $(".topGroup").hover((function() {}
  ), (function() {
        document.getElementById("todayCard").classList.remove("hide"),
        document.getElementById("todayCard").style.zIndex = 1
    }
  ))
}

whenDOMReady() // 打开网站先执行一次
document.addEventListener("pjax:complete", whenDOMReady) // pjax加载完成（切换页面）后再执行一次