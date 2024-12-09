import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '@store';
import { ingredientsSelectors } from '@slices';

export const IngredientDetails: FC = () => {
  const ingredientId = useParams().id;
  const ingredientData = useSelector(ingredientsSelectors.getIngredients).find(
    (item) => item._id === ingredientId
  );
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
