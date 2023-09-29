/*jshint esversion: 6 */

import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Tab, Tdb } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import styles from "./burger-ingredients.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { current } from "@reduxjs/toolkit";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";

const BurgerIngredients = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = React.useState("buns");

  const buns = ingredients.filter((item) => item.type === "bun");
  const mains = ingredients.filter((item) => item.type === "main");
  const sauces = ingredients.filter((item) => item.type === "sauce");

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.querySelector(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const onSelect = useCallback((ingredient) => {
    setSelectedIngredient(ingredient);
  }, []);

  const onClose = useCallback(() => {
    setSelectedIngredient(null);
  }, []);

  return (
    <section className={`${styles.burgerIngredients}`}>
      <h1 className={`${styles.title} text text_type_main-large mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="buns"
            active={currentTab === "buns"}
            onClick={() => onTabClick("buns")}
          >
            Булки
          </Tab>
          <Tab
            value="mains"
            active={currentTab === "mains"}
            onClick={() => onTabClick("mains")}
          >
            Начинка
          </Tab>
          <Tab
            value="sauces"
            active={currentTab === "sauces"}
            onClick={() => onTabClick("sauces")}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={styles.content}>
        <IngredientsCategory
          title="Булки"
          titleId="buns"
          ingredients={buns}
          scrollTo={currentTab === "buns"}
          onSelect={onSelect}
        />
        <IngredientsCategory
          title="Начинка"
          titleId="mains"
          ingredients={mains}
          scrollTo={currentTab === "mains"}
          onSelect={onSelect}
        />
        <IngredientsCategory
          title="Соусы"
          titleId="sauces"
          ingredients={sauces}
          scrollTo={currentTab === "sauces"}
          onSelect={onSelect}
        />
      </div>
      <Modal
        title="Детали ингредиента"
        isOpen={selectedIngredient !== null}
        onClose={onClose}
      >
        <IngredientDetails data={selectedIngredient} />
      </Modal>
    </section>
  );
};

// BurgerIngredients.propTypes = {
//     ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,

// };

export default BurgerIngredients;
