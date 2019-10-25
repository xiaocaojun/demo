var hotMusicListUrl = "http://tingapi.ting.baidu.com/v1/restserver/ting?type=2&size=20&offset=0&method=baidu.ting.billboard.billList",
proxyUrl = "https://bird.ioliu.cn/v1/?url=";
var url = proxyUrl + hotMusicListUrl;
var getResponse = async function () {
try {
  console.log("马上执行fetch");
  let response = await fetch(url);
  let data = await response.json();
  console.log("得到结果啦");
  console.log(data);
} catch (error) {
  console.log("出错了。。。", error);
}
}
getResponse();