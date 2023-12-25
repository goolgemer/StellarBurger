import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./ingredients-category.module.css";
import { categoryPropType } from "../../utils/prop-types";
import React from "react";
import { useGetIngredientsQuery } from "../../services/api";
import PropTypes from "prop-types";
import { InView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { setVisible } from "../../services/currentTabSlice";

const IngredientsCategory = React.forwardRef(({ title, category, containerRef }, ref) => {
  const { data } = useGetIngredientsQuery();
  const dispatch = useDispatch();

  const ingredients =
    data !== undefined ? data.filter((item) => item.type === category) : [];

  if (data === undefined) {
    return null;
  }

  return (
    <>
      <div ref={ref} />
      <InView
        onChange={(inView) => dispatch(setVisible({ category, isVisible: inView }))}
        root={containerRef.current}
        threshold={[0.15, 0.85]}
      >
        <h3 className=" text text_type_main-medium mt-10 mb-6" id={category}>
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
      </InView>
    </>
  );
});

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  category: categoryPropType.isRequired,
};

export default IngredientsCategory;
