import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../header/app-header";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pt-25 pr-5`}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor constructorIngredients={data} />
      </main>
    </div>
  );
}

export default App;
