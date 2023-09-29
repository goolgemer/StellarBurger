import React, { useCallback, useState } from "react";
import PropType from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { Modal } from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = ({ constructorIngredients }) => {
  const bun = constructorIngredients.find(
    (ingredient) => ingredient.type === "bun"
  );
  const ingredients = constructorIngredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );

  const [isOpen, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <section className={`${styles.burger_constructor} mb-25`}>
      <div className={`${styles.element} ml-15 mr-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (вверх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul className={styles.elements}>
        {ingredients.map((item, index) => {
          return (
            <li className={`${styles.element} mb-4 mr-2`} key={index}>
              <DragIcon />
              <div className={`${styles.element_fullwidth} ml-2`}>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`${styles.element} ml-20 mr-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={`${styles.total} mt-10 mr-4`}>
        <div className={`${styles.cost} mr-10`}>
          <p className={`${styles.text} text mr-2`}>610</p>
          <CurrencyIcon />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          children="Оформить заказ"
          onClick={onOpen}
        />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <OrderDetails />
      </Modal>
    </section>
  );
};

export default BurgerConstructor;
