import React, { useEffect, useState } from "react";
import "./StockTrading.css";
import { request } from "../../common/api/config";
import { tradeAPI } from "../../common/api/apiCall";
import Notification, {
  handleNotification,
} from "../../common/Notification/Notification";

function StockTrading({ heading, setENP, setShow }) {
  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const [total, setTotal] = useState(0);
  const [tradeType, setTradeType] = useState("Intraday"); // Default trade type
  const [currentPrice, setCurrentPrice] = useState(null);
  const APIKEY = "con3hi9r01qp4op3rp60con3hi9r01qp4op3rp6g";
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${heading}&token=${APIKEY}`
        );
        const data = await response.json();
        setCurrentPrice(data.c);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Fetch every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, [heading, APIKEY]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
    updateTotal(value, price);
  };

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    setPrice(value);
    updateTotal(quantity, value);
  };

  const handleTradeTypeChange = (e) => {
    setTradeType(e.target.value);
  };

  const updateTotal = (quantity, price) => {
    const total = !price ? quantity * currentPrice : price;
    setTotal(total);
  };

  const handleTrade = async (e) => {
    e.preventDefault();
    var buyOrSell = e.target.name === "buy" ? "Buy" : "Sell";
    const tradeAmount = total;
    const body = { buyOrSell, tradeAmount, quantity, tradeName: heading, tradeType };
    const response = await request(tradeAPI, body);
    response.message === "success"
      ? (handleNotification(
          `Trade successfully ${buyOrSell === "Buy" ? "bought" : "sold"}`,
          "success",
          setNotification
        ),
        setENP(response.points),
        setTimeout(()=>{
          setShow(false)
        },1000))

      : handleNotification(`Something went wrong`, "error", setNotification);
  };

  return (
    <div className="stock-trading-container">
      <div className="trade-panel">
        <h2>{heading}</h2>
        <h3>Current Price: {currentPrice}</h3>
        <div className="input-group">
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              className="text-black"
              type="number"
              id="quantity"
              placeholder="0"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              className="text-black"
              type="number"
              id="price"
              placeholder="0"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="trade-type">Trade Type:</label>
          <select
            className="text-black"
            id="trade-type"
            value={tradeType}
            onChange={handleTradeTypeChange}
          >
            <option value="Intraday">Intraday</option>
            <option value="Options">Options</option>
            <option value="Swing">Swing</option>
            {/* Add more trade types as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="total">Total:</label>
          <span id="total">{total}</span>
        </div>
        <div className="button-group">
          <button className="buy-button" name="buy" onClick={handleTrade}>
            Buy
          </button>
          <button className="sell-button" name="sell" onClick={handleTrade}>
            Sell
          </button>
        </div>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
      </div>
    </div>
  );
}

export default StockTrading;
