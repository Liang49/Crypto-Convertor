import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [coin, setCoin] = useState([]);
  const [num, setNum] = useState([]);
  const [price, setPrice] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const coin = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const json = await coin.json();

      setCoin(json);
      setPrice(json.current_price);

      console.log(json);
    };

    fecthData();
  }, []);

  const handleClick = (e) => {
    console.log(e.target.value);
    setPrice(e.target.value);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="App">
      <h1>Converter</h1>

      <form>
        <div>
          <label>Enter Amount</label>
          <div>
            <input
              className="cyrpto"
              type="number"
              onChange={(e) => {
                setNum(e.target.value);
              }}
            />

            <select
              className="cyrpto"
              onChange={handleClick}
              style={{ textTransform: "uppercase" }}
            >
              <option>Select Cyrptocurrency</option>

              {coin.map((item, index) => (
                <option key={item.id} value={item.current_price}>
                  {item.id} - {item.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 60 }}>=</label>
          <div>
            <input
              className="money"
              onChange={handleClick}
              value={isNaN(num * price) ? "" : num * price}
              readOnly
            />

            <select
              className="money"
              onChange={handleChange}
              style={{ textTransform: "uppercase" }}
            >
              <option>USD</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
