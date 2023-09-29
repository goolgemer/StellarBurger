import styles from "./order-details.module.css";

const OrderDetails = () => {
  return (
    <div className={styles.container}>
      <div className="text text_type_digits-large">034536</div>
      <div className="text text_type_main-medium mt-8">
        идентификатор заказа
      </div>
      <img className="mt-15" src="./checkmark.svg" alt="" />
      <div className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </div>
      <div
        className="text text_type_main-default mt-2"
        style={{ color: "#8585AD" }}
      >
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  );
};

export default OrderDetails;
