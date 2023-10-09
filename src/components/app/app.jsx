import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetailsModal from "../ingredient-details/ingredient-details-modal";
import clsx from "clsx";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={clsx(styles.main, "pt-10")}>
        <h1 className="text text_type_main-large">
          Соберите бургер
        </h1>
        <div className={clsx(styles.content, "pt-5")}>
          <BurgerIngredients />
          <BurgerConstructor constructorIngredients={data} />
        </div>
      </main>
      <IngredientDetailsModal />
    </div>
  );
}

export default App;
