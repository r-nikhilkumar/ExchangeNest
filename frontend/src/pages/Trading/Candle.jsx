import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "./Candle.css";

const Candle = () => {
  const [symbol, setSymbol] = useState("BTCUSDT"); // Default symbol is BTCUSDT
  const [intervalValue, setIntervalValue] = useState("1d"); // Default interval is 1 day
  const [limitValue, setLimitValue] = useState(30); // Default limit is 30
  const [maxLimit, setMaxLimit] = useState(30); // Maximum limit based on interval
  const [series, setSeries] = useState([{ data: [] }]);
  const [intervalId, setIntervalId] = useState(null);

  const companies = [
    { symbol: "BTCUSDT", name: "Bitcoin (BTC)" },
    { symbol: "ETHUSDT", name: "Ethereum (ETH)" },
    { symbol: "BNBUSDT", name: "Binance Coin (BNB)" },
    // Add more cryptocurrency pairs here
    { symbol: "AAPL", name: "Apple Inc. (AAPL)" },
    { symbol: "MSFT", name: "Microsoft Corporation (MSFT)" },
    { symbol: "GOOGL", name: "Alphabet Inc. (GOOGL)" },
    // Add more companies here
    { symbol: "^NSEI", name: "Nifty 50" },
    { symbol: "^BSESN", name: "BSE Sensex" }
    // Add more indices here
  ];

  useEffect(() => {
    clearInterval(intervalId); // Clear interval before fetching new data

    const fetchData = async () => {
      try {
        let startDate = new Date();

        if (intervalValue === "1m") {
          startDate.setMinutes(startDate.getMinutes() - limitValue); // Past selected number of minutes
        } else if (intervalValue === "1h") {
          startDate.setHours(startDate.getHours() - limitValue); // Past selected number of hours
        } else if (intervalValue === "1d") {
          startDate.setDate(startDate.getDate() - limitValue); // Past selected number of days
        } else if (intervalValue === "1w") {
          startDate.setDate(startDate.getDate() - limitValue * 7); // Past selected number of weeks
        } else if (intervalValue === "1M") {
          startDate.setMonth(startDate.getMonth() - limitValue); // Past selected number of months
        } else if (intervalValue === "3M") {
          startDate.setMonth(startDate.getMonth() - limitValue * 3); // Past selected number of months
        } else if (intervalValue === "1Y") {
          startDate.setFullYear(startDate.getFullYear() - limitValue); // Past selected number of years
        }

        const response = await fetch(`/api/candlestick?symbol=${symbol}&interval=${intervalValue}&startTime=${startDate.getTime()}&limit=${limitValue}`);
        console.log(response)
        const data = await response.json();
        console.log(data)
        const seriesData = data.map(item => ({
          x: item[0],
          y: [parseFloat(item[1]), parseFloat(item[2]), parseFloat(item[3]), parseFloat(item[4])]
        }));
        setSeries([{ data: seriesData }]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data initially

    // const interval = setInterval(fetchData, intervalValue === '1m' ? 60000 : (intervalValue === '1h' ? 3600000 : 86400000) * parseInt(limitValue)); // Fetch data based on selected interval
    // setIntervalId(interval);

    // // Cleanup function
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (intervalValue === "1m") {
      setMaxLimit(30 * 24 * 60); // Maximum limit of 1 month
      if (limitValue > 30 * 24 * 60) setLimitValue(30 * 24 * 60);
    } else if (intervalValue === "1h") {
      setMaxLimit(24 * 30); // Maximum limit of 1 month
      if (limitValue > 24 * 30) setLimitValue(24 * 30);
    } else if (intervalValue === "1d") {
      setMaxLimit(365 * 5); // Maximum limit of 5 years
      if (limitValue > 365 * 5) setLimitValue(365 * 5);
    } else if (intervalValue === "1w") {
      setMaxLimit(52 * 5); // Maximum limit of 5 years
      if (limitValue > 52 * 5) setLimitValue(52 * 5);
    } else if (intervalValue === "1M" || intervalValue === "3M" || intervalValue === "1Y") {
      setMaxLimit(10); // Maximum limit of 10
      if (limitValue > 10) setLimitValue(10);
    }
  }, [intervalValue]);

  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setIntervalValue(event.target.value);
  };

  const handleLimitChange = (event) => {
    const value = parseInt(event.target.value);
    setLimitValue(value > maxLimit ? maxLimit : value);
  };

  return (
    <div className="container">
      <div className="filter">
        <label htmlFor="symbol">Choose a symbol:</label>
        <select id="symbol" value={symbol} onChange={handleSymbolChange}>
          {companies.map((company) => (
            <option key={company.symbol} value={company.symbol}>{company.name}</option>
          ))}
        </select>
      </div>
      <div className="filter">
        <label htmlFor="interval">Choose interval:</label>
        <select id="interval" value={intervalValue} onChange={handleIntervalChange}>
          <option value="1m">1 minute</option>
          <option value="3m">3 minutes</option>
          <option value="5m">5 minutes</option>
          <option value="10m">10 minutes</option>
          <option value="15m">15 minutes</option>
          <option value="30m">30 minutes</option>
          <option value="1h">1 hour</option>
          <option value="1d">1 day</option>
          <option value="1w">1 week</option>
          <option value="1M">1 month</option>
          <option value="3M">3 months</option>
          <option value="1Y">1 year</option>
          <option value="max">Max</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="limit">Choose past time limit:</label>
        <select id="limit" value={limitValue} onChange={handleLimitChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={30}>1 month</option>
          <option value={30 * 2}>2 months</option>
          <option value={30 * 4}>4 months</option>
          <option value={52}>1 year</option>
          <option value={52 * 3}>3 years</option>
          <option value={52 * 5}>5 years</option>
          <option value={maxLimit}>Max</option>
        </select>
      </div>
      <div className="chart">
        <ReactApexChart options={options} series={series} type="candlestick" height={350} />
      </div>
    </div>
  );
};

export default Candle;
