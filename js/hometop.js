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
// 存数据
function saveData(name, data) { localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data })) };
// 取数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (-1 < t && t < (time * 60000)) return d.data;
    }
    return 0;
};

let talkTimer = null;
function indexTalk() {
    if (talkTimer) {
        clearInterval(talkTimer)
        talkTimer = null;
    }
    if (!document.getElementById('bber-talk')) return

    function toText(ls) {
        let text = []
        ls.forEach(item => {
            text.push(item.content.replace(/#(.*?)\s/g, '').replace(/\{(.*?)\}/g, '').replace(/\!\[(.*?)\]\((.*?)\)/g, '<i class="fa-solid fa-image"></i>').replace(/\[(.*?)\]\((.*?)\)/g, '<i class="fa-solid fa-link"></i>'))
        });
        return text
    }

    function talk(ls) {
        let html = ''
        ls.forEach((item, i) => { html += `<li class="item item-${i + 1}">${item}</li>` });
        let box = document.querySelector("#bber-talk .talk-list")
        box.innerHTML = html;
        talkTimer = setInterval(() => {
            box.appendChild(box.children[0]);
        }, 3000);
    }

    let d = loadData('talk', 10);
    if (d) talk(d);
    else {
        fetch('https://memos.nesxc.com/api/v1/memo?creatorId=71&tag=说说&limit=10').then(res => res.json()).then(data => { // 更改地址和ID
            data = toText(data)
            talk(data);
            saveData('talk', data);
        })
    }
}

function damn() {
    indexTalk();
}
damn()
document.addEventListener("pjax:complete", damn)



whenDOMReady()
document.addEventListener("pjax:complete", whenDOMReady)