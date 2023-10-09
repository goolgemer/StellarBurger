/*jshint esversion: 6 */

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import styles from "./burger-ingredients.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../../services/currentTabSlice";

const BurgerIngredients = () => {
  const currentTab = useSelector(state => state.currentTab.value);
  const dispatch = useDispatch();

  return (
    <section className={`${styles.burgerIngredients}`}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={currentTab === "bun"}
            onClick={() => dispatch(setTab("bun"))}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={currentTab === "main"}
            onClick={() => dispatch(setTab("main"))}
          >
            Начинка
          </Tab>
          <Tab
            value="sauce"
            active={currentTab === "sauce"}
            onClick={() => dispatch(setTab("sauce"))}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={styles.content}>
        <IngredientsCategory
          title="Булки"
          category="bun"
        />
        <IngredientsCategory
          title="Начинка"
          category="main"
        />
        <IngredientsCategory
          title="Соусы"
          category="sauce"
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
