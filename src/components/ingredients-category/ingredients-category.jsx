import BurgerIngredient from "../burger-igredient/burger-igredient";
import styles from "./ingredients-category.module.css";
import { ingredientsCategoryPropType } from "../../utils/prop-types";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { api } from "../../services/api";

const IngredientsCategory = ({ title, category }) => {
  const ref = useRef(null);
  const { data } = api.endpoints.getIngredients.useQuery();
  const currentTab = useSelector(state => state.currentTab.value);

  
  const ingredients = data !== undefined ? data.filter((item) => item.type === category) : [];

  useEffect(() => {
    if (currentTab === category && ref.current && ref.current.parentElement) {
      ref.current.parentElement.scrollTo({
        top: ref.current.offsetTop - ref.current.parentElement.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [currentTab, category]);

  return (
    <>
      <h3 ref={ref} className=" text text_type_main-medium mt-10 mb-6" id={category}>
        {title}
      </h3>
      <div className={styles.item}>
        {ingredients.map((ingredient) => {
          return (
            <BurgerIngredient
              ingredientData={ingredient}
              key={ingredient._id}
              count={1}
            />
          );
        })}
      </div>
    </>
  );
};

IngredientsCategory.propTypes = ingredientsCategoryPropType;

export default IngredientsCategory;
