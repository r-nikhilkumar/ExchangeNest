import React, { useEffect, useRef, useState, memo } from "react";

function TradingView({ symbol }) {
  const container = useRef();
  var mounted = false;

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "width": "100%",
          "height": "610",
          "symbol": "${symbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": true,
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com",
          "details": true,
          "overrides": {
            "mainSeriesProperties.showLastValue": true
          }
        }`;

    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }
    container.current.appendChild(script);
    mounted = true;
  }, [symbol]);

  return (
    <div>
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingView);
