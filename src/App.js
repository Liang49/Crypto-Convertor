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
  };
  return (
    <div className="App">
      <h1>Convert</h1>
      <form>
        <div>
          <label>Cyrptocurrency</label>
          <input
            type="number"
            onChange={(e) => {
              setNum(e.target.value);
              console.log(num);
            }}
          />

          <select onChange={handleClick} style={{ textTransform: "uppercase" }}>
            {coin.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id} - {item.symbol}
                {num * item.current_price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>money</label>

          <input value={num * price} />

          <select style={{ textTransform: "uppercase" }}>
            <option value="usd">USD</option>
          </select>
        </div>
      </form>
    </div>
  );
}
