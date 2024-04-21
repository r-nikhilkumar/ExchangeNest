import React, { useState, useEffect } from 'react';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { timeFormat } from 'd3-time-format';
import { scaleTime } from 'd3-scale';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { MouseCoordinateX, MouseCoordinateY } from 'react-stockcharts/lib/coordinates';
import { CandlestickSeries } from 'react-stockcharts/lib/series'; // Updated import
import * as d3 from 'd3';
import { generateRandomPrices } from '../../common/data/data';

const CandlestickChart = (props) => {
  const [data, setData] = useState([...(props.data)]); // State for chart data
  const [containerWidth, setContainerWidth] = useState(null); // State for container width
  const [currentIndex, setCurrentIndex] = useState(0); // State for current index of data

  useEffect(() => {
    // Simulate real-time data feed
    const interval = setInterval(() => {
      if (currentIndex < 1000) {
        // Add new data point
        const dataPoint = generateRandomPrices()
        const newDataPoint = {
          date: new Date(),
          ...dataPoint
        };
        setData((prevData) => [...prevData, newDataPoint]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval); // Stop interval when all data points are added
      }
    }, 1000); // Interval time in milliseconds

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]); // Only re-run effect when currentIndex changes

  useEffect(() => {
    // Update container width when window is resized
    const handleResize = () => {
      const width = document.getElementById('chart-container').clientWidth;
      setContainerWidth(width);
    };
    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const xAccessor = (d) => d.date;
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
  const { data: trimmedData, xScale, xAccessor: xAccessorTrimmed, displayXAccessor } = xScaleProvider(data);

  const margin = { left: 50, right: 50, top: 10, bottom: 30 };

  return (
    <div id="chart-container" style={{ width: '100%', height: '400px' }}>
      {containerWidth && (
        <ChartCanvas
          width={containerWidth}
          height={400}
          ratio={1}
          margin={margin}
          type="svg"
          seriesName="MSFT"
          data={trimmedData}
          xAccessor={xAccessorTrimmed}
          xScale={xScale}
          displayXAccessor={displayXAccessor}
        >
          <Chart id={0} yExtents={(d) => [d.high, d.low]}>
            <XAxis axisAt="bottom" orient="bottom" ticks={6} />
            <YAxis axisAt="left" orient="left" ticks={5} />
            <CandlestickSeries />
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat('%Y-%m-%d')}
            />
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={d3.format('.2f')}
            />
          </Chart>
        </ChartCanvas>
      )}
    </div>
  );
};

export default CandlestickChart;
