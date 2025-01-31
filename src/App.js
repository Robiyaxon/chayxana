import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./component/home/Home";
import FavooriteFood from "./component/favorite/FavooriteFood";
import Menu from "./component/menu/Menu";
import { useAppDispatch, useAppSelector } from "./redux/app/hooks";
import { GET_PRODUCTS } from "./redux/actions/types";
import { useEffect, useState } from "react";
import { getAction } from "./redux/actions/readAction";
import { Input, List } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import style from './component/home/Home.module.css'
import React from "react";

function App() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  // const items = [];
  
  const { data } = useAppSelector((state) => state?.products?.data);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getAction("get-catalog", GET_PRODUCTS));
    setItems(data)
  }, [data, dispatch]);

     // eslint-disable-next-line array-callback-return
    console.log(items)
    


  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value.toLowerCase());
  //   data?.products.filter((data=> data))

  // };

  // const filteredItems = items.filter((item) =>
  //   item.toLowerCase().includes(searchTerm)
  // );
  return (
    <BrowserRouter>
      <div className="app">
        <Home />
        
    {/* <div className={style.wrapper}>
      <h2>
        Assalamu alaykum!
        <br />
        <b style={{ textTransform: "capitalize" }}>Qanday taom buyurtma berasiz?</b>
      </h2>

      <div>
        <Input
          placeholder="Tushlik uchun izlang!"
          allowClear
          onChange={handleSearch}
          prefix={<SearchOutlined style={{ color: "#aaa", fontSize: "20px", marginRight:"5px" }} />}
          style={{ marginBottom: "20px", height: "50px", padding: "10px",  fontSize: "20px" }}
        />
      </div>
    </div>
     */}
        <div className={"wrapper"}>
          <FavooriteFood />
          <Menu />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
