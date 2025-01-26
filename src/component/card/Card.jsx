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

  const handleDecrement = (item) => {
    setClickedItems((prevCounts) => {
      const count = prevCounts[item.id] || 1;
      if (
        !clickedItems[item.id] ||
        clickedItems[item.id] - 1 == 0 ||
        clickedItems[item.id] == 0
      ) {
        setSelectedItems((prev) => ({ ...prev, [item.id]: false }));
      }
      return {
        ...prevCounts,
        [item.id]: count > 1 ? count - 1 : 1,
      };
    });
  };
  const handleIncrement = (item) => {
    setClickedItems((prevClickedItems) => {
      const count = prevClickedItems[item.id] || 1;
      return {
        ...prevClickedItems,
        [item.id]: count + 1,
      };
    });
  };
  // Mahsulotni tanlash
  const handleAddToCart = (item) => {
    console.log(item);
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedItems = [...existingItems];

    const itemIndex = updatedItems.findIndex((i) => i.id === item.id);
    if (itemIndex > -1) {
      updatedItems[itemIndex].quantity += 1;
    } else {
      updatedItems.push({ ...item, item_order: item?.id, amount: item?.price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setSelectedItems((prevClickedItems) => ({
      ...prevClickedItems,
      [item.id]: !prevClickedItems[item.id],
    }));
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
    // if()
    console.log(itemIndex);
  };

  // Umumiy summa hisoblash
  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Buyurtmani tasdiqlash

  const p_type = window.location.href.split("=")[1]?.substring(0, 4);
  const p_num = window.location.href.split("=")[2]?.substring(0, 4);
  const handleConfirmOrder = () => {
    // message.success("Buyurtmangiz qabul qilindi!");
    const getStorage = JSON.parse(localStorage.getItem("cart"));
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
  if (!data) {
    return <>Hozircha Maxsulot mavjud emas! </>;
  } else {
    console.log(selectedItems);
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          {data.map((item) => (
            <div className={style.card} key={item.id}>
              <img
                src={"https://back-end.muvaffaqiyatsirlari.uz/" + item.image}
                alt={item.title}
              />
              <h1>{item.title}</h1>
              <p>{item?.price?.toLocaleString("uz-UZ")} so‘m</p>
              <div className={style.click}>
                {selectedItems[item.id] ? (
                  <div className={style.counter}>
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{clickedItems[item.id] || 1}</span>
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
                            onClick={() => handleRemoveFromCart(item)}
                            style={{ marginRight: "5px" }}
                          >
                            -
                          </button>
                          <button onClick={() => handleAddToCart(item)}>
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
