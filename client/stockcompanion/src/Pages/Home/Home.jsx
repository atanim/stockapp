import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import ApexChart from "../../Chart/ApexChart";
import Default from "../../Components/Layout/Default";
import Stock from "../../Components/stock";

import "./home.css";
import TickerSearch from "../../Components/TickerSearch/TickerSearch";

const Home = () => {
  const intervals = [
    {
      name: "1M",
    },
    {
      name: "5M",
    },
    {
      name: "30M",
    },
    {
      name: "1HR",
    },
    {
      name: "1WK",
    },
  ];

  const ranges = [
    {
      name: "1D",
    },
    {
      name: "1WK",
    },
    {
      name: "1M",
    },
    {
      name: "6M",
    },
    {
      name: "1YR",
    },
  ];

  const [isInWatchList, setIsInWatchList] = useState(false);
  const [changeInterval, setChangeInterval] = useState("1m");
  const [changeRange, setChangeRange] = useState("1d");

  const storedTicker = localStorage.getItem("ACTIVE_TICKER") || "TSLA";
  const stock = new Stock(storedTicker);

  const handleInterval = (interval) => {
    setChangeInterval(interval);
  };

  const handleRange = (range) => {
    setChangeRange(range);
  };

  const handleWatchlist = () => {
    try {
      const storedTicker = localStorage.getItem("ACTIVE_TICKER") || "TSLA";
      var tickersWatchList =
        JSON.parse(localStorage.getItem("tickersWatchList")) || [];

      // tickersWatchList.push(storedTicker);
      const indexOfTicker = tickersWatchList.indexOf(storedTicker);
      if (indexOfTicker !== -1) {
        tickersWatchList.splice(indexOfTicker, 1);
        setIsInWatchList(false)
      } else {
        tickersWatchList.push(storedTicker);
        setIsInWatchList(true)
      }
      console.log(tickersWatchList);

      localStorage.setItem(
        "tickersWatchList",
        JSON.stringify(tickersWatchList)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    stock.getData();
  });


  useEffect(() => {
    var tickersWatchList =
      JSON.parse(localStorage.getItem("tickersWatchList")) || [];
    const indexOfTicker = tickersWatchList.indexOf(storedTicker);
    if(indexOfTicker !== -1) {
      setIsInWatchList(true);
    }
  },[]);

  return (
    <Fragment>
      <Default>
        <TickerSearch />
        <div className="container my-4 chart__position">
          <div className="d-flex justify-content-between">
            <div className="select-interval">
              <p className="mb-1 font-12 text-white">Interval</p>
              <div className="mb-3">
                {intervals.map((interval, i) => (
                  <span
                    className="interval"
                    onClick={() => {
                      handleInterval(interval.name.toLocaleLowerCase());
                    }}
                    style={{
                      background:
                        changeInterval === interval.name.toLocaleLowerCase()
                          ? "#0a063e"
                          : "white",
                      color:
                        changeInterval === interval.name.toLocaleLowerCase()
                          ? "white"
                          : "#0a063e",
                    }}
                    key={i}
                  >
                    {interval.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="date-range">
              <p className="mb-1 font-12 text-white">Date Range</p>
              <div className="mb-3">
                {ranges.map((range, i) => (
                  <span
                    className="range"
                    onClick={() => {
                      handleRange(range.name.toLocaleLowerCase());
                    }}
                    style={{
                      background:
                        changeRange === range.name.toLocaleLowerCase()
                          ? "#0a063e"
                          : "white",
                      color:
                        changeRange === range.name.toLocaleLowerCase()
                          ? "white"
                          : "#0a063e",
                    }}
                    key={i}
                  >
                    {range.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ApexChart
                Stock={stock}
                range={changeRange}
                interval={changeInterval}
              />
            </div>
          </div>
          <div className="add-watchlist mt-4">
            <button
              className="btn btn-secondary me-3"
              onClick={handleWatchlist}
            >
              { !isInWatchList ? "Add To Watchlist" : "Remove from Watchlist" }
            </button>
            <button className="btn btn-secondary">Set Notification</button>
          </div>
          <div className="mb-5">
            <h3 className="text-white">Footnotes</h3>
            <div className="d-flex">
              <input
                type="text"
                className="form-control w-50 me-3"
                placeholder="Enter Footnotes ..."
              />
              <button type="submit" className="btn btn-primary px-4">
                Post
              </button>
            </div>
          </div>
        </div>
      </Default>
    </Fragment>
  );
};

export default Home;
