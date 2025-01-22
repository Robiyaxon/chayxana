import React, { useState } from "react";
import { Drawer,  message } from "antd";
import style from "./Card.module.css";
import img1 from "../../assert/dolma.png";
import img2 from "../../assert/chuchvara.png";
import img3 from "../../assert/mastava.png";

const Card = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const map = [
    { id: 1, title: "Do`lma sho`rva", narxi: 28000, img: img1 },
    { id: 2, title: "Qovurma lag'mon", narxi: 30000, img: img2 },
    { id: 3, title: "Somsa", narxi: 12000, img: img3 },
  ];

  // Mahsulotni tanlash
  const handleAddToCart = (item) => {
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedItems = [...existingItems];

    const itemIndex = updatedItems.findIndex((i) => i.id === item.id);
    if (itemIndex > -1) {
      updatedItems[itemIndex].quantity += 1;
    } else {
      updatedItems.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setSelectedItems(updatedItems);
  };

  // Miqdorni kamaytirish
  const handleRemoveFromCart = (item) => {
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedItems = [...existingItems];

    const itemIndex = updatedItems.findIndex((i) => i.id === item.id);
    if (itemIndex > -1) {
      if (updatedItems[itemIndex].quantity > 1) {
        updatedItems[itemIndex].quantity -= 1;
      } else {
        updatedItems.splice(itemIndex, 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setSelectedItems(updatedItems);
  };

  // Umumiy summa hisoblash
  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + item.narxi * item.quantity, 0);
  };

  // Buyurtmani tasdiqlash
  const handleConfirmOrder = () => {
    message.success("Buyurtmangiz qabul qilindi!");
    localStorage.removeItem("cart");
    setSelectedItems([]);
    setIsDrawerOpen(false);
  };

  // Drawer’ni ochish
  const showDrawer = () => {
    const itemsFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setSelectedItems(itemsFromStorage);
    setIsDrawerOpen(true);
  };

  // Drawer’ni yopish
  const onClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {map.map((item) => (
          <div className={style.card} key={item.id}>
            <img src={item.img} alt={item.title} />
            <h1>{item.title}</h1>
            <p>{item.narxi.toLocaleString("uz-UZ")} so‘m</p>
            <div className={style.click}>
              <button
                className={style.addButton}
                onClick={() => handleAddToCart(item)}
              >
                Buyurtmaga qo‘shish
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className={style.fixedButton} onClick={showDrawer}>
        Buyurtmani tasdiqlash
      </button>

      {/* Ant Design Drawer */}
      <Drawer
        title="Sizning buyurtmangiz"
        placement="right"
        onClose={onClose}
        open={isDrawerOpen}
         width="90%"
      >
        {selectedItems.length > 0 ? (
          <div>
            <ul>
              {selectedItems.map((item) => (
                <li key={item.id} className={style.choose} style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                 <div  className={style.title_sum}>
                 <div className={style.sum_mitti}>
                    <span className={style.name} style={{ flexGrow: 1 }}>
                    {item.title}
                  </span>
                <span>{item.narxi.toLocaleString("uz-UZ")} so‘m</span>
                  </div>
                  
                  <div className={style.button_click} style={{ display: "flex", alignItems: "center" }}>
                  <span className={style.quality}>  {item.quantity}x</span>
                    
                    <div className={style.click_butons}>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      style={{ marginRight: "5px" }}
                    >
                      -
                    </button>
                    <button onClick={() => handleAddToCart(item)}>+</button>

                    </div>
                    
                   
                  </div>
                 </div>
                </li>
              ))}
            </ul>
            <div className={style.result}>
              <h4>Umumiy hisob </h4>
              <h3>{calculateTotal().toLocaleString("uz-UZ")} so‘m</h3>
            </div>
            
            <button
              className={style.confirmButton}
              style={{ marginTop: "1rem", padding: "10px 20px" }}
              onClick={handleConfirmOrder}
            >
              Buyurtmani tasdiqlash
            </button>
          </div>
        ) : (
          <p>Buyurtma qo‘shilmagan!</p>
        )}
      </Drawer>
    </div>
  );
};

export default Card;
