import React from 'react';
import style from "./Menu.module.css";
import { Tabs } from 'antd';
import Card from '../card/Card';

const onChange = (key) => {
    console.log(key);
};

const items = [
    { key: '1', label: 'Suyuq ovqatlar', children:    <Card/> },
    { key: '2', label: 'Qo‘yiq ovqatlar', children: 'Backend ulansa qoyiq ovqatlar bolimi qoshiladi' },
    { key: '3', label: 'Ichimliklar', children: 'Backend ulansa qoyiq ovqatlar bolimi qoshiladi' },
    { key: '4', label: 'Shashliklar', children: 'Backend ulansa qoyiq ovqatlar bolimi qoshiladi' },
    { key: '5', label: 'Desert', children: 'Backend ulansa qoyiq ovqatlar bolimi qoshiladi' },
    { key: '6', label: 'Dietichiskiy ovqatlar', children: 'Backend ulansa qoyiq ovqatlar bolimi qoshiladi' },
];

const Menu = () => {
    return (
        <div className={style.wrapper}>
            <Tabs className={style.tabs} defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    );
}

export default Menu;
