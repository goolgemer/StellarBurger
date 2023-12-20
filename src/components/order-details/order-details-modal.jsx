import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearOrderDetails } from "../../services/orderDetailsSlice";
import { Modal } from "../modal/modal";
import OrderDetails from "./order-details";

export const OrderDetailsModal = () => {
  const data = useSelector((state) => state.orderDetails.details);
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(clearOrderDetails());
  }, [dispatch]);

  if (data === null) {
    return null;
  }

  return (
    <Modal
      title="Детали ингредиента"
      onClose={onClose}
    >
      {data && (
        <OrderDetails data={data} />
      )}
    </Modal>
  );
}

export default OrderDetailsModal;
