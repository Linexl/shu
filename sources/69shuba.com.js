/**
* 搜索
* @params {string} key
* @returns {[{name, author, cover, detail}]}
*/
const search = (key) => {
let response = POST("https://69shuba.com/modules/article/search.php", {
data: `searchkey=${ENCODE(key,"gbk")}&submit=Search`
})
let array = []
array.push({
name: "苟在女魔头身边偷偷修炼",
author: "怕辣的红椒",
cover: "https://static.69shuba.com/files/article/image/51/51618/51618s.jpg",
detail: "https://www.69shuba.com/book/51618.htm"
})
let $ = HTML.parse(response)
$('div.newbox > ul > li').forEach((child) => {
let $ = HTML.parse(child)
// array.push({
// name: $('h3 > a:nth-child(2)').text(),
// author: $('div.labelbox > label:nth-child(1)').text(),
// cover: $('img').attr('data-src'),
// detail: $('a').attr('href')
// })
})
return JSON.stringify(array)
}

/**
* 详情
* @params {string} url
* @returns {[{summary, status, category, words, update, lastChapter, catalog}]}
*/
const detail = (url) => {
let response = GET(url)
let $ = HTML.parse(response)
let book = {
    summary: $('.navtxt > p:nth-child(1)').text(),
    status: $('div.booknav2 > p:nth-child(4)').text().replace(/.+ | /, ""),
    category: $('div.booknav2 > p:nth-child(3) > a').text(),
    words: $('div.booknav2 > p:nth-child(4)').text().replace(/字.+/, ""),
    update: $('div.booknav2 > p:nth-child(5)').text().replace(/更新：/, ""),
    lastChapter: $('.qustime > ul > li:nth-child(1) > a > span').text(),
    catalog: $("a.more-btn").attr("href")
}
return JSON.stringify(book)
}

/**
* 目录
* @params {string} url
* @returns {[{name, url, vip}]}
*/
const catalog = (url) => {
let response = GET(url)
let $ = HTML.parse(response)
let array = []
$('#catalog > ul > li').forEach((chapter) => {
let $ = HTML.parse(chapter)
array.push({
name: $("a").text(),
url: $("a").attr("href")
})
})
return JSON.stringify(array.reverse())
}

/**
* 章节
* @params {string} url
* @returns {string}
*/
const chapter = (url) => {
let response = GET(url).replace("(本章完)","")
let $ = HTML.parse(response)
return $(".txtnav").remove("div,h1")
}

var bookSource = JSON.stringify({
name: "69书吧-69shuba.com-女魔头",
url: "69shuba.com",
version: 100
})
