import React, { useEffect, useState } from "react";
import { Input, List } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./Home.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { GET_PRODUCTS } from "../../redux/actions/types";
import { getAction } from "../../redux/actions/readAction";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
    const { data } = useAppSelector((state) => state?.products?.data);
    const dispatch = useAppDispatch();
  const items = [];

    
    useEffect(() => {
      dispatch(getAction("get-catalog", GET_PRODUCTS));
    }, [dispatch]);

   // eslint-disable-next-line array-callback-return
   data?.products.map((i)=>{
      items.push(i.title)
    })
    console.log(items)
    


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
        <List
          bordered
          dataSource={filteredItems}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </div>
  );
};

export default Home;
