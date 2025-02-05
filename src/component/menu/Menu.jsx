import React, { useEffect, useState } from "react";
import style from "./Menu.module.css";
import { Input, Tabs } from "antd"; // ✅ Tabs import qilindi
import Card from "../card/Card";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { GET_PRODUCTS } from "../../redux/actions/types";
import { getAction } from "../../redux/actions/readAction";
import FavooriteFood from "../favorite/FavooriteFood";
import { SearchOutlined } from "@ant-design/icons";

const Menu = () => {
  const [isF_Product, setF_Product] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useAppSelector((state) => state?.products?.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAction("get-catalog", GET_PRODUCTS));
  }, [data, dispatch]);

  const onChange = (key) => {
    setIsFilter(true);
    if (!data?.products.filter((product) => product.category === key).length) {
      setF_Product(data?.product);
    } else {
      setF_Product(
        data?.products.filter((product) => product.category === key)
      );
    }
  };

  const handleSearch = (e) => {
    setIsFilter(true);
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setF_Product(
      data?.products.filter((product) =>
        product.title.toLowerCase().includes(term)
      )
    );
  };

  return (
    <>
      <div className={style.header}>
        <div>
          <h2>
            Assalamu alaykum!
            <br />
            <b style={{ textTransform: "capitalize" }}>
              Qanday taom buyurtma berasiz?
            </b>
          </h2>

          <div className={style.inp}>
            <Input
              placeholder="Tushlik uchun izlang!"
              allowClear
              onChange={handleSearch}
              prefix={
                <SearchOutlined
                  style={{ color: "#aaa", fontSize: "20px", marginRight: "5px" }}
                />
              }
              style={{
                marginBottom: "20px",
                height: "50px",
                padding: "10px",
                fontSize: "20px",
              }}
            />
          </div>
        </div>
      </div>

      <div className={style.wrapper}>
        {searchTerm.length === 0 && <FavooriteFood />}
        {searchTerm.length === 0 && (
          <div className={style.tap}>
            <Tabs
              className={style.tabs}
              defaultActiveKey="1"
              items={data?.categories}
              onChange={onChange}
            />
          </div>
        )}

        {isFilter ? <Card data={isF_Product} /> : <Card data={data?.products} />}
      </div>
    </>
  );
};

export default Menu;
