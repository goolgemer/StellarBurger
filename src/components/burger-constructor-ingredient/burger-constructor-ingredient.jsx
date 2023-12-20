import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor/burger-constructor.module.css";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { moveIngredient, removeIngredient } from "../../services/burgerConstructorSlice";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

const BurgerConstructorIngredient = ({ item, index }) => {
  const ref = useRef(null);

  const dispatch = useDispatch();

  const [{ handlerId }, sortDrop] = useDrop({
    accept: "sort",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      dispatch(moveIngredient({
        dragIndex,
        hoverIndex,
      }));
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [, sortDrag, sortPreview] = useDrag({
    type: "sort",
    item: () => {
      return { id: item.uniqueId, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  sortPreview(sortDrop(ref));

  return (
    <li
      ref={ref}
      className={styles.element}
      key={item.uniqueId}
      data-handler-id={handlerId}
    >
      <span ref={sortDrag} className={clsx(styles.dragHandle, "mr-2")}>
        <DragIcon />
      </span>
      <ConstructorElement
        extraClass={styles.constructorElement}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch(removeIngredient(index))}
      />
    </li>
  );
};

BurgerConstructorIngredient.propTypes = {
  item: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
}

export default BurgerConstructorIngredient;
