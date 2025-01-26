import React, { useEffect } from 'react';
import style from "./Menu.module.css";
import { Tabs } from 'antd';
import Card from '../card/Card';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { GET_PRODUCTS } from '../../redux/actions/types';
import { getAction } from '../../redux/actions/readAction';

const onChange = (key) => {
    console.log(key);
};

// const items = [
//     { key: '1', label: 'Suyuq ovqatlar', children:    <Card/> },
//     { key: '2', label: 'Qo‘yiq ovqatlar', children: 'Backend ulansa qoyiq ovqatlar bolimi qoshiladi' },
//     { key: '3', label: 'Ichimliklar', children: 'Backend ulansa qoyiq ovqatlar bolimi qoshiladi' },
//     { key: '4', label: 'Shashliklar', children: 'Backend ulansa qoyiq ovqatlar bolimi qoshiladi' },
//     { key: '5', label: 'Desert', children: 'Backend ulansa qoyiq ovqatlar bolimi qoshiladi' },
//     { key: '6', label: 'Dietichiskiy ovqatlar', children: 'Backend ulansa qoyiq ovqatlar bolimi qoshiladi' },
// ];

const Menu = () => {
      const { data } = useAppSelector((state) => state?.products?.data);
      const dispatch = useAppDispatch();

      console.log(data)
    
      useEffect(() => {
        dispatch(getAction("get-catalog", GET_PRODUCTS));
      }, [dispatch]);
    return (
        <div className={style.wrapper}>
            <Tabs className={style.tabs} defaultActiveKey="1" items={data?.categories} onChange={onChange} />
        </div>
    );
}

export default Menu;
