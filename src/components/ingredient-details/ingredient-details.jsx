import clsx from "clsx";
import styles from "./ingredient-details.module.css";

const IngredientDetails = ({ data }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={data.image_large} alt="" />
      <div className="text text_type_main-medium mt-4">{data.name}</div>
      <div className={clsx(styles.details, "text text_type_main-default mt-8")}>
        <div className={styles.detailItem}>
          <div>Калории,ккал</div>
          <div className="mt-2">{data.calories}</div>
        </div>
        <div className={styles.detailItem}>
          <div>Белки, г</div>
          <div className="mt-2">{data.proteins}</div>
        </div>
        <div className={styles.detailItem}>
          <div>Жиры, г</div>
          <div className="mt-2">{data.fat}</div>
        </div>
        <div className={styles.detailItem}>
          <div>Углеводы, г</div>
          <div className="mt-2">{data.carbohydrates}</div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
