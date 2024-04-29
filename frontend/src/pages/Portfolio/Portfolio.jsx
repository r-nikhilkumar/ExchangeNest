import React, { useEffect, useState } from "react";
import "./Portfolio.css"; // Import CSS file for styling
import { request } from "../../common/api/config";
import { fetchPortfolioAPI, squareOffPortAPI } from "../../common/api/apiCall";

const Portfolio = ({flag, setFlag, ENP}) => {
  const [portfolio, setPortfolio] = useState([]);
  const APIKEY = "con3hi9r01qp4op3rp60con3hi9r01qp4op3rp6g";

  const handleSquareOff = async (asset) => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${asset.tradeName}&token=${APIKEY}`
      );
      const data = await response.json();
      console.log(asset._id);
      console.log(asset.tradeName);
      const body = {
        id: asset._id,
        curr: data.c,
      };
      await request(squareOffPortAPI, body);
      setFlag((prev)=>!prev)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    request(fetchPortfolioAPI).then((res) => {
      setPortfolio(res);
    //   console.log(res[0]._id);
    });
  }, [flag, ENP]);

  return (
    <div className="portfolio-container mt-4 pt-3">
      <h1>My Portfolio</h1>
      <table className="portfolio-table">
        <thead className="text-black">
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Asset Type</th>
            <th>Price</th>
            <th>Action</th>
            <th>SO</th>
          </tr>
        </thead>
        {portfolio.length>0 && (
          <tbody>
            {portfolio.map((asset) => (
              <tr key={asset._id}>
                <td>{asset.tradeName}</td>
                <td>{asset.quantity}</td>
                <td>{asset.tradeType}</td>
                <td>{asset.tradeAmount.toFixed(1)}</td>
                <td>
                  {asset.buyOrSell === "Buy" ? (
                    <span>BOUGHT</span>
                  ) : (
                    <span>SOLD</span>
                  )}
                </td>
                <td>
                  {asset.status === "SO" ? (
                    <span role="img" aria-label="Square Off">
                      &#x274C;
                    </span>
                  ) : (
                    <button onClick={() => handleSquareOff(asset)}>
                      <span role="img" aria-label="Square Off">
                        &#x2714;
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Portfolio;
