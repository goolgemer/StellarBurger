import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../../services/activeIngredientSlice";
import { Modal } from "../modal/modal";
import IngredientDetails from "./ingredient-details";

export const IngredientDetailsModal = () => {
  const data = useSelector((state) => state.activeIngredient.value);
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(remove());
  }, []);

  return (
    <Modal
      title="Детали ингредиента"
      isOpen={data !== null}
      onClose={onClose}
    >
      {data && (
        <IngredientDetails data={data} />
      )}
    </Modal>
  );
}

export default IngredientDetailsModal;
