import React, { useCallback, useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { Modal } from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
  addBun,
  addIngredient,
  removeBun,
  removeIngredient,
} from "../../services/burgerConstructorSlice";
import { useDrop } from "react-dnd";

const BurgerConstructor = () => {
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const ingredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );

  const dispatch = useDispatch();

  const price =
    (bun?.price ?? 0) * 2 +
    ingredients.reduce((sum, item) => sum + item.price, 0);

  const [isOpen, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const [canDropTop, topBunDrop] = useDrop({
    accept: "bun",
    drop: (data) => dispatch(addBun(data)),
    collect: (monitor) => monitor.canDrop(),
  });

  const [canDropBottom, bottomBunDrop] = useDrop({
    accept: "bun",
    drop: (data) => dispatch(addBun(data)),
    collect: (monitor) => monitor.canDrop(),
  });

  const [canDropIngredient, ingredientDrop] = useDrop({
    accept: "ingredient",
    drop: (data) => dispatch(addIngredient(data)),
    collect: (monitor) => monitor.canDrop(),
  });

  return (
    <section>
      <ul className={styles.elements}>
        <li className={clsx(styles.element, "pl-8")}>
          {bun !== null ? (
            <ConstructorElement
              extraClass={styles.constructorElement}
              type="top"
              text={`${bun.name} (вверх)`}
              price={bun.price}
              thumbnail={bun.image}
              isLocked={ingredients.length > 0}
              handleClose={() => dispatch(removeBun())}
            />
          ) : (
            <div
              ref={topBunDrop}
              className={clsx(
                styles.burgerSkeleton,
                styles.burgerSkeletonTop,
                canDropTop && styles.burgerSkeletonOver
              )}
            />
          )}
        </li>
        {bun !== null &&
          ingredients.length > 0 &&
          ingredients.map((item, index) => {
            return (
              <li
                className={styles.element}
                key={item._id}
              >
                <span
                  className={clsx(styles.dragHandle, "mr-2")}
                >
                  <DragIcon />
                </span>
                <ConstructorElement
                  extraClass={styles.constructorElement}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={() => dispatch(removeIngredient(index))}
                />
              </li>
            );
          })}
        {bun !== null && (ingredients.length === 0 || canDropIngredient) && (
          <li ref={ingredientDrop} className={clsx(styles.element, "pl-8")}>
            <div
              className={clsx(
                styles.burgerSkeleton,
                canDropIngredient && styles.burgerSkeletonOver
              )}
            />
          </li>
        )}
        <li className={clsx(styles.element, "pl-8")}>
          {bun !== null ? (
            <ConstructorElement
              extraClass={styles.constructorElement}
              type="bottom"
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              isLocked={ingredients.length > 0}
              handleClose={() => dispatch(removeBun())}
            />
          ) : (
            <div
              ref={bottomBunDrop}
              className={clsx(
                styles.burgerSkeleton,
                styles.burgerSkeletonBottom,
                canDropBottom && styles.burgerSkeletonOver
              )}
            />
          )}
        </li>
      </ul>
      <div className={clsx(styles.bottom, "mt-10")}>
        <p className="text text_type_digits-medium">{price}</p>
        <span className={clsx(styles.currencyIcon, "ml-2 mr-10")}>
          <CurrencyIcon />
        </span>
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
