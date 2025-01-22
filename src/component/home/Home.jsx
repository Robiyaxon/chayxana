import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./Home.module.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const items = ["Apple", "Banana", "Cherry", "Date", "Fig", "Grape"];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm)
  );

  return (
    <div className={style.wrapper}>
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
        {/* <List
          bordered
          dataSource={filteredItems}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        /> */}
      </div>
    </div>
  );
};

export default Home;
