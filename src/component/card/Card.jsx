import React, { useState } from "react";
import { Drawer } from "antd";
import style from "./Card.module.css";
import { useAppDispatch } from "../../redux/app/hooks";
import { CREATE_ORDER } from "../../redux/actions/types";
import toast from "react-hot-toast";
import { createAction } from "../../redux/actions/createAction";

const Card = ({ data }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [clickedItems, setClickedItems] = useState({});

  const dispatch = useAppDispatch();

  const handleIncrement = (item) => {
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedItems = existingItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        cartItem.quantity += 1;
      }
      return cartItem;
    });
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setSelectedItems(updatedItems);
    setClickedItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleDecrement = (item) => {
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedItems = existingItems
      .map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.quantity -= 1;
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setSelectedItems(updatedItems);
    setClickedItems((prev) => ({
      ...prev,
      [item.id]: Math.max((prev[item.id] || 1) - 1, 0),
    }));
  };

  const handleAddToCart = (item) => {
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = existingItems.findIndex((cartItem) => cartItem.id === item.id);

    if (itemIndex > -1) {
      existingItems[itemIndex].quantity += 1;
    } else {
      existingItems.push({
        ...item,
        item_order: item?.id,
        amount: item?.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingItems));
    setSelectedItems(existingItems);
    setClickedItems((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Buyurtmani tasdiqlash
  const handleConfirmOrder = () => {
    const getStorage = JSON.parse(localStorage.getItem("cart"));
    const p_type = window.location.href.split("=")[1]?.substring(0, 4);
    const p_num = window.location.href.split("=")[2]?.substring(0, 4);

    dispatch(
      createAction("order/", CREATE_ORDER, {
        place: `${p_num}-${p_type}`,
        items: getStorage,
      })
    )
      .then(() => {
        toast.success("Mahsulot muvaffaqiyatli yaratildi!");
        localStorage.removeItem("cart");
        setSelectedItems([]);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        toast.error("Mahsulotni yaratishda xatolik yuz berdi");
        console.error("Xato:", error);
      });
  };

  const showDrawer = () => {
    const itemsFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setSelectedItems(itemsFromStorage);
    setIsDrawerOpen(true);
  };

  const onClose = () => {
    setIsDrawerOpen(false);
  };

  if (!data) {
    return <>Hozircha Maxsulot mavjud emas! </>;
  } else {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          {data.map((item) => (
            <div className={style.card} key={item.id}>
              <img
                src={"https://asaloft.uz/" + item.image}
                alt={item.title}
              />
              <h1>{item.title}</h1>
              <p>{item?.price?.toLocaleString("uz-UZ")} so‘m</p>
              <div className={style.click}>
                {selectedItems.some((cartItem) => cartItem.id === item.id) ? (
                  <div className={style.counter}>
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{
                      selectedItems.find((cartItem) => cartItem.id === item.id)?.quantity || 1
                    }</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                ) : (
                  <button
                    className={style.addButton}
                    onClick={() => handleAddToCart(item)}
                  >
                    Buyurtmaga qo'shish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className={style.fixedButton} onClick={showDrawer}>
          Buyurtmani tasdiqlash
        </button>

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
                  <li
                    key={item.id}
                    className={style.choose}
                    style={{
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={
                        "https://back-end.muvaffaqiyatsirlari.uz/" + item.image
                      }
                      alt={item.title}
                      style={{ width: "50px", marginRight: "10px" }}
                    />
                    <div className={style.title_sum}>
                      <div className={style.sum_mitti}>
                        <span className={style.name} style={{ flexGrow: 1 }}>
                          {item.title}
                        </span>
                        <span>{item.price.toLocaleString("uz-UZ")} so‘m</span>
                      </div>

                      <div
                        className={style.button_click}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <span className={style.quality}> {item.quantity}x</span>

                        <div className={style.click_butons}>
                          <button
                            onClick={() => handleDecrement(item)}
                            style={{ marginRight: "5px" }}
                          >
                            -
                          </button>
                          <button onClick={() => handleIncrement(item)}>
                            +
                          </button>
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
  }
};

export default Card;
