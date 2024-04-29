import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';

const Chart = () => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      // Add your code to update the chart with received data
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const chart = createChart('chart-container', {
      width: 800,
      height: 400,
    });

    const candleSeries = chart.addCandlestickSeries();

    // Add initial data to chart if needed

    return () => {
      chart.remove();
    };
  }, []);

  return <div id="chart-container" />;
};

export default Chart;
