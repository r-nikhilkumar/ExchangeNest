import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const TradingIcons = ({ onclick, className }) => {
  const handleIconClick = (name) => {
    onclick(name)
  };

  return (
    <div className={"flex justify-evenly items-center"+className}>
      <button className="flex items-center cursor-pointer hover:bg-gray-600 rounded-lg p-2" onClick={() => handleIconClick('NIFTY50')}>
        <FontAwesomeIcon icon={faChartLine} className="text-blue-500 text-xl mr-2" />
        <span className="font-semibold">NIFTY50</span>
      </button>
      <button className="flex items-center cursor-pointer hover:bg-gray-600 rounded-lg p-2" onClick={() => handleIconClick('NIFTY')}>
        <FontAwesomeIcon icon={faChartLine} className="text-blue-500 text-xl mr-2" />
        <span className="font-semibold">NIFTY100</span>
      </button>
      <button className="flex items-center cursor-pointer hover:bg-gray-600 rounded-lg p-2" onClick={() => handleIconClick('SENSEX')}>
        <FontAwesomeIcon icon={faChartLine} className="text-blue-500 text-xl mr-2" />
        <span className="font-semibold">SENSEX</span>
      </button>
    </div>
  );
};

export default TradingIcons;
