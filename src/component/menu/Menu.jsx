import React, { useEffect, useState } from "react";
import style from "./Menu.module.css";
import { Tabs } from "antd";
import Card from "../card/Card";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { GET_PRODUCTS } from "../../redux/actions/types";
import { getAction } from "../../redux/actions/readAction";

const Menu = () => {
  const [isF_Product, setF_Product] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  const { data } = useAppSelector((state) => state?.products?.data);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getAction("get-catalog", GET_PRODUCTS));
  }, [isF_Product, dispatch]);

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

  return (
    <div className={style.wrapper}>
      <Tabs
        className={style.tabs}
        defaultActiveKey="1"
        items={data?.categories}
        onChange={onChange}
      />

      {isFilter ? <Card data={isF_Product} /> : <Card data={data?.products} />}
    </div>
  );
};

export default Menu;
