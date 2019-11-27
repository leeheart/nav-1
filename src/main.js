const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.bilibili.com"},
  { logo: "Z", url: 'https://www.zhihu.com'},
  { logo: "J", url: 'https://juejin.im'},
  { logo: "G", url: 'https://github.com'},
];
const simplifyUrl = url => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除以 / 开头的内容，正则表达式
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
            <div class="site">
              <div class="logo">${node.logo}</div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="deleteSite">
                <svg class="icon">
                  <use xlink:href="#icon-delete3"></use>
                </svg>
              </div>
            </div>
      </li>`).insertBefore($lastLi);
    $li.on('click', ()=>{
      window.open(node.url)
    })
    $li.on('click', '.deleteSite', (e)=>{
      e.stopPropagation() //阻止冒泡
      hashMap.splice(index, 1)
      localStorage.setItem('x', JSON.stringify(hashMap))
      render()
    })
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  localStorage.setItem('x', JSON.stringify(hashMap))
  render();
});

$(document).on('keypress', (e)=>{
  const {key} = e
  hashMap.forEach(node => {
    if(node.logo.toLowerCase() === key){
      window.open(node.url)
    }
  })
})

$('.searchForm>input').on('keypress', (e)=>{
  e.stopPropagation() //阻止搜索框键盘冒泡
})