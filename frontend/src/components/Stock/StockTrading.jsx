import React, { useState } from "react";
import "./StockTrading.css";

function StockTrading(props) {
  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const [total, setTotal] = useState(0);
  const [tradeType, setTradeType] = useState("Intraday"); // Default trade type

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
    const total = quantity && price ? quantity * price : 0;
    setTotal(total);
  };

  return (
    <div className="stock-trading-container">
      <div className="trade-panel">
        <h2>{props.heading}</h2>
        <div className="input-group">
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
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
          <button className="buy-button">Buy</button>
          <button className="sell-button">Sell</button>
        </div>
      </div>
    </div>
  );
}

export default StockTrading;
