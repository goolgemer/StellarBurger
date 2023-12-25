import styles from "./burger-igredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { add } from "../../services/activeIngredientSlice";
import { useDrag } from "react-dnd";

const BurgerIngredient = ({ ingredientData, count }) => {
  const { image, price, name } = ingredientData;

  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ingredientData.type === "bun" ? "bun" : "ingredient",
    item: ingredientData,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [ingredientData]);

  return (
    <article ref={drag} className={styles.article} onClick={() => dispatch(add(ingredientData))}>
      {count && <Counter count={count} />}
      <img className={styles.image} src={image} alt="" />
      <div className={`${styles.cost} mt-2 mb-2`}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon />
      </div>
      <p className={`${styles.text} text text_type_main-default`}>{name}</p>
    </article>
  );
};

// BurgerIngredient.propTypes = {
//   // ingredientData: ingredientPropType.isRequired,
//   //   count: PropTypes.number.isRequired,
// };

export default BurgerIngredient;
