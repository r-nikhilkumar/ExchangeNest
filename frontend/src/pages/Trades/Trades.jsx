import React, { useEffect, useRef, useState } from "react";
import CandlestickChart from "./CandlestickChart";
import CompanyIcons from "../../common/icons/CompanyIcons";
import data from "../../common/data/data";
import SearchBar from "../../components/searchBar/SearchBar";
import TradingIcons from "../../common/icons/TradingIcons";
import ProgressCircle from "../../common/Progress/ProgressCircle";
import Notification, {
  handleNotification,
} from "../../common/Notification/Notification";
import DialogBox from "../../components/Dialog/DialogBox";
import StockTrading from "../../components/Stock/StockTrading";
import CountCard from "../../components/Card/CountCard";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import TradingView from "../Trading/TradingView";
import { request } from "../../common/api/config";
import { fetchUserAPI } from "../../common/api/apiCall";

const Trades = () => {
  const [loading, setLoading] = useState(false);
  const [tradeHeading, setTradeHeading] = useState("AAPL");
  const [showBSDialog, setShowBSDialog] = useState(false);
  const [ENP, setENP] = useState(0);
  useEffect(() => {
    request(fetchUserAPI).then((response) => {
      setENP(response.userData.Points);
    });
  }, []);

  const handleDialog = () => {
    setShowBSDialog(!showBSDialog);
  };

  const handleSearch = (query) => {
    // Simulate loading for 2 seconds
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTradeHeading(query);
    }, 2000);
    // Perform search logic here
  };

  const handleIconClick = (companyName) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTradeHeading(companyName);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      {loading ? (
        <div className="flex justify-center">
          <ProgressCircle percentage={100} />
        </div>
      ) : (
        <div>
          <div className=" mt-2 mb-2 grid grid-cols-4 align-items-center">
            <div className="col-span-3">
              <TradingIcons onclick={handleIconClick} />
            </div>
            <CountCard label="Total Points" count={ENP} icon={faCoins} />
          </div>
          <div className="grid grid-rows-2 md:grid-rows-2 gap-8">
            <div className="w-full">
              <h3 className="bg-gray-600 rounded-lg shadow-md p-2 text-xl font-semibold mb-1">{tradeHeading}</h3>
              <TradingView symbol={tradeHeading} />
              <div className="flex justify-start mt-5">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block justify-end"
                  onClick={handleDialog}
                >
                  Trade
                </button>
              </div>
            </div>
            <div className="h-fit">
              <CompanyIcons onClick={handleIconClick} />
            </div>
          </div>
          <div>
            <DialogBox show={showBSDialog} setShow={setShowBSDialog}>
              <StockTrading heading={tradeHeading} setENP={setENP} setShow={setShowBSDialog} />
            </DialogBox>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trades;
