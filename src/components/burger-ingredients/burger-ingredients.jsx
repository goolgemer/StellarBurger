/*jshint esversion: 6 */

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import styles from "./burger-ingredients.module.css";
import { useSelector } from "react-redux";
import { useRef } from "react";

const BurgerIngredients = () => {
  const currentTab = useSelector(state => state.currentTab.value);
  const containerRef = useRef(null);
  const ingredientRef = useRef({
    bun: null,
    main: null,
    sauce: null,
  });

  const onClick = (tab) => {
    if (containerRef.current && ingredientRef.current[tab]) {
      containerRef.current.scrollTo({
        top: ingredientRef.current[tab].offsetTop - ingredientRef.current[tab].parentElement.offsetTop,
        behavior: 'smooth',
      });
    }
  }

  return (
    <section className={`${styles.burgerIngredients}`}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={currentTab === "bun"}
            onClick={() => onClick("bun")}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={currentTab === "main"}
            onClick={() => onClick("main")}
          >
            Начинка
          </Tab>
          <Tab
            value="sauce"
            active={currentTab === "sauce"}
            onClick={() => onClick("sauce")}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div ref={containerRef} className={styles.content}>
        <IngredientsCategory
          title="Булки"
          category="bun"
          ref={ref => ingredientRef.current.bun = ref}
          containerRef={containerRef}
        />
        <IngredientsCategory
          title="Начинка"
          category="main"
          ref={ref => ingredientRef.current.main = ref}
          containerRef={containerRef}
        />
        <IngredientsCategory
          title="Соусы"
          category="sauce"
          ref={ref => ingredientRef.current.sauce = ref}
          containerRef={containerRef}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
