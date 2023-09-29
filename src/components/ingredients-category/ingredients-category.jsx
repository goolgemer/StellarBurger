import BurgerIngredient from "../burger-igredient/burger-igredient";
import styles from "./ingredients-category.module.css";
import { ingredientsCategoryPropType } from "../../utils/prop-types";
import { useEffect, useRef } from "react";

const IngredientsCategory = ({ title, titleId, ingredients, scrollTo, onSelect }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (scrollTo && ref.current && ref.current.parentElement) {
      console.dir(ref.current);
      ref.current.parentElement.scrollTo({
        top: ref.current.offsetTop - ref.current.parentElement.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [scrollTo]);

  

  return (
    <>
      <h3 ref={ref} className=" text text_type_main-medium mt-10 mb-6" id={titleId}>
        {title}
      </h3>
      <div className={styles.item}>
        {ingredients.map((ingredient) => {
          return (
            <BurgerIngredient
              ingredientData={ingredient}
              key={ingredient._id}
              count={1}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </>
  );
};

IngredientsCategory.propTypes = ingredientsCategoryPropType;

export default IngredientsCategory;
