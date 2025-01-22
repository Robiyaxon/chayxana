import React from 'react';
import style from "./FavooriteFood.module.css";
import img from "../../assert/favorite.png";
import Menu from '../menu/Menu';

const FavooriteFood = () => {
  return (
    <div className={style.wrapper}>
      <div
        className={style.favorite_food}
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative", // Rasm ustida overlay joylashishini ta'minlash
        }}
      >
        {/* Bu yerga matn yoki boshqa kontent qo'shishingiz mumkin */}
        <h1>Oyning eng <br />yaxshi taomi</h1>
<p>Ko‘za Sho‘rva-eng mazali, tobida qaynab pishgan taomlardan biridir. Ko’zachalarda pishirilgan sho’rva ta’mi oddiy qozonda pishirilganidan keskin farq qiladi.</p>
        {/* Qoraytiruvchi div */}
        <div
          style={{
            position: "absolute", // Rasm ustida joylashish
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Qoraytirish effekti
            padding: "25px", // padding qo'shish, rasmning ichiga joylashtiriladi
            borderRadius: "15px",
            boxSizing: "border-box", // Paddingni hisobga olish
          }}
        ></div>
      </div>
      <Menu/>
    </div>
  );
};

export default FavooriteFood;
