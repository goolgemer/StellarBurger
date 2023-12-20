import styles from "./order-details.module.css";
import PropTypes from "prop-types";

const OrderDetails = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className="text text_type_digits-large">{data.order.number}</div>
      <div className="text text_type_main-medium mt-8">
        идентификатор заказа
      </div>
      <img className="mt-15" src="./checkmark.svg" alt="checkmark icon" />
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

OrderDetails.propTypes = {
  data: PropTypes.shape({
    order: PropTypes.shape({
      number: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

export default OrderDetails;
