import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
  addBun,
  addIngredient,
  removeBun,
} from "../../services/burgerConstructorSlice";
import { useDrop } from "react-dnd";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import { useMakeOrderMutation } from "../../services/api";
import { setOrderDetails, setOrderDetailsError } from "../../services/orderDetailsSlice";
import OrderDetailsModal from "../order-details/order-details-modal";

const BurgerConstructor = () => {
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const ingredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );
  const [makeOrder, { isLoading: isOrdering }] = useMakeOrderMutation();

  const dispatch = useDispatch();

  const price =
    (bun?.price ?? 0) * 2 +
    ingredients.reduce((sum, item) => sum + item.price, 0);

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

  const onClick = async () => {
    if (bun !== null) {
      const ingredientIds = [
        bun._id,
        ...ingredients.map((item) => item._id),
        bun._id,
      ];
      try {
        const orderDetails = await makeOrder({
          ingredients: ingredientIds,
        }).unwrap();
        dispatch(setOrderDetails(orderDetails));
      } catch (err) {
        dispatch(setOrderDetailsError(err.message));
      }
    }
  };

  return (
    <section>
      <ul className={styles.elements}>
        <li ref={topBunDrop} className={clsx(styles.element, "pl-8")}>
          {bun !== null ? (
            <ConstructorElement
              extraClass={styles.constructorElement}
              type="top"
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              isLocked={false}
              handleClose={() => dispatch(removeBun())}
            />
          ) : (
            <div
              className={clsx(
                styles.burgerSkeleton,
                styles.burgerSkeletonTop,
                canDropTop && styles.burgerSkeletonOver
              )}
            />
          )}
        </li>
        {ingredients.length > 0 &&
          ingredients.map((item, index) => {
            return (
              <BurgerConstructorIngredient
                key={item.uniqueId}
                item={item}
                index={index}
              />
            );
          })}
        {(ingredients.length === 0 || canDropIngredient) && (
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
              isLocked={false}
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
          onClick={onClick}
          disabled={bun === null || isOrdering}
        />
      </div>
      <OrderDetailsModal />
    </section>
  );
};

export default BurgerConstructor;
