var express = require("express");
const TradeDetail = require("../models/tradeDetail");
var router = express.Router();
var Fetchuser = require("../middleware/Fetchuser");
const user = require("../models/user");

// const apiKey1 = "1984ce589f14415ab52bbfa45a1f5e42"
const apiKey1 = "35a3f7d79b8a40dc964f7fdd6303bf85";
// const apiKey1 = "4a962d49ab9e403a9ca523bfb7912ace"

let tophead =
  "https://newsapi.org/v2/top-headlines?q=business&apiKey=" + apiKey1;
let every = "https://newsapi.org/v2/everything?q=business&apiKey=" + apiKey1;
/* GET home page. */
router.get("/api/news", async function (req, res, next) {
  try {
    let topNews = await fetch(tophead);
    let resp = await topNews.json();
    res.send(resp);
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/allNews", async (req, res) => {
  try {
    let allNews = await fetch(every);
    let resp = await allNews.json();
    res.send(resp);
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/symbols_search", async (req, res) => {
  const { text } = req.query;

  try {
    const response = await fetch(
      `https://www.tradingview.com/api/v1/symbols_search/?text=${text}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/trade", Fetchuser, async (req, res) => {
  try {
    const { buyOrSell, tradeAmount } = req.body;
    const id = req.user.id;
    const u = await user.findOne({ _id: id }).select("-password");
    const trade = await TradeDetail.create({
      user: id, // Accessing user from req.user
      ...req.body
    });
    let newPoints = u.Points;
    if (buyOrSell === "Buy") {
      newPoints -= tradeAmount;
    } else {
      newPoints += tradeAmount;
    }

    // Update user's points
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { Points: newPoints },
      { new: true }
    );
    res.status(201).json({ message: "success", points: updatedUser.Points });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
