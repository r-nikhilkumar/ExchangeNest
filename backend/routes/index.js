var express = require('express');
var router = express.Router();

// const apiKey1 = "1984ce589f14415ab52bbfa45a1f5e42"
const apiKey1 = "35a3f7d79b8a40dc964f7fdd6303bf85"
// const apiKey1 = "4a962d49ab9e403a9ca523bfb7912ace"

let tophead = "https://newsapi.org/v2/top-headlines?q=business&apiKey="+apiKey1
let every = "https://newsapi.org/v2/everything?q=business&apiKey="+apiKey1
/* GET home page. */
router.get('/api/news', async function(req, res, next) {
  let topNews = await fetch(tophead)
  let resp = await topNews.json()
  res.send(resp)
});

router.get('/api/allNews', async (req, res)=>{
  let allNews = await fetch(every)
  let resp = await allNews.json()
  res.send(resp)
})

module.exports = router;
