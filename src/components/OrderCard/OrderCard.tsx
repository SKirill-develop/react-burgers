import { FC } from 'react';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { dateFormat } from "../../utils/date-format";
import styles from "./orderCard.module.css";
import { IOrderCardProps, LocationState, TIngredientType } from '../../services/types/index';

export const OrderCard: FC<IOrderCardProps> = ({ orderData, showStatus }) => {
  const location = useLocation<LocationState>();
  const ingredients = useSelector((store) => store.ingredients);
  const orderDataIngredients: Array<TIngredientType> = [];

  const status: { [key: string]: string } = {
    created: "Создан",
    pending: "Готовится",
    done: "Выполнен",
  };

  orderData.ingredients.forEach((ingredient: string) => {
    const findedIngredient: TIngredientType | undefined = ingredients.find((el: TIngredientType) => el._id === ingredient);
    findedIngredient && orderDataIngredients.push(findedIngredient);
  });

  const totalOrderPrice = orderDataIngredients.reduce(
    (acc: number, ingredient: TIngredientType) => acc + ingredient.price,
    0
  );
  const ingredientsToRender = orderDataIngredients.slice(0, 6);
  return (
    <Link
      to={{
        pathname: `${location.pathname}/${orderData._id}`,
        state: { background: location },
      }}
      className={styles.orderCard}
    >
      <div className={styles.orderCard__orderInfo}>
        <p className="text text_type_digits-default">{`#${orderData.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">
          {dateFormat(orderData.createdAt)}
        </p>
      </div>
      <h2 className="text text_type_main-medium">{orderData.name}</h2>
      {showStatus && (
        <p
          className={`text text_type_main-default ${orderData.status === "done" && styles.orderCard__status_done
            }`}
        >
          {status[orderData.status]}
        </p>
      )}
      <div className={styles.orderCard__orderIngredientsInfo}>
        <ul className={styles.orderCard__orderIngredients}>
          {ingredientsToRender.map((ingredient: TIngredientType, index: number) => {
            const ingredientStyle = {
              zIndex: `${(index - ingredientsToRender.length) * -1}`,
              backgroundImage: `url(${ingredient.image_mobile})`,
            };
            const key = ingredient._id + index;
            if (index === 5) {
              return (
                <li
                  key={key}
                  className={`${styles.orderCard__orderIngredientsItem} ${styles.orderCard__orderIngredientsItem_last}`}
                  style={ingredientStyle}
                >
                  {orderDataIngredients.length - 6 !== 0 && (
                    <p
                      className={`text text_type_digits-default ${styles.orderCard__remain}`}
                    >{`+${orderDataIngredients.length - 6}`}</p>
                  )}
                </li>
              );
            }
            return (
              <li
                key={key}
                className={styles.orderCard__orderIngredientsItem}
                style={ingredientStyle}
              />
            );
          })}
        </ul>
        <p
          className={`${styles.orderCard__orderPrice} text text_type_digits-default`}
        >
          {totalOrderPrice}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  );
};
