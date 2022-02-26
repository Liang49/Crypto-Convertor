import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [coin, setCoin] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      const coin = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const json = await coin.json();

      setCoin(json);
      console.log(setCoin);
    };

    fecthData();
  }, []);
  return (
    <div className="App">
      <h1>Convert</h1>
      <form>
        <div>
          <label>Cyrptocurrency</label>
          <input />
          <select style={{ textTransform: "uppercase" }}>
            {coin.map((item) => (
              <option value="bitcoin">
                {item.id} - {item.symbol}
              </option>
            ))}
          </select>
        </div>
        <label>money</label>
        <input />
        <select style={{ textTransform: "uppercase" }}>
          <option value="usd">USD</option>
        </select>
      </form>
    </div>
  );
}
