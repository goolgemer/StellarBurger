import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../services/activeIngredientSlice";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { useMemo } from "react";

const BurgerIngredient = ({ ingredientData }) => {
  const { image, price, name } = ingredientData;
  const constructorIngredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );
  const constructorBuns = useSelector((state) => state.burgerConstructor.bun);

  const count = useMemo(() => {
    const ingredients = [
      ...constructorIngredients,
      ...(constructorBuns ? [constructorBuns] : []),
    ];
    return ingredients.filter((item) => item._id === ingredientData._id).length;
  }, [constructorIngredients, constructorBuns, ingredientData._id]);

  const dispatch = useDispatch();

  const [, drag] = useDrag(
    () => ({
      type: ingredientData.type === "bun" ? "bun" : "ingredient",
      item: ingredientData,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [ingredientData]
  );

  return (
    <article
      ref={drag}
      className={styles.article}
      onClick={() => dispatch(add(ingredientData))}
    >
      {count > 0 && <Counter count={count} />}
      <img className={styles.image} src={image} alt={image.name} />
      <div className={`${styles.cost} mt-2 mb-2`}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon />
      </div>
      <p className={`${styles.text} text text_type_main-default`}>{name}</p>
    </article>
  );
};

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropType.isRequired,
  count: PropTypes.number.isRequired,
};

export default BurgerIngredient;
