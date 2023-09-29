import styles from "./burger-igredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";

const BurgerIngredient = ({ ingredientData, count, onSelect }) => {
  const { image, price, name } = ingredientData;
  

  return (
    <article className={styles.article} onClick={() => onSelect(ingredientData)}>
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
