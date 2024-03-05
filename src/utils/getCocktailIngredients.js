const getCocktailIngredients = (cocktailInfo) => {
  const ingredients = Object.keys(cocktailInfo)
    .filter((key) => key.startsWith("strIngredient") && cocktailInfo[key])
    .map((key) => cocktailInfo[key])
    .map((ingredient) => ingredient[0] + ingredient.slice(1).toLowerCase());

  return ingredients;
};

export default getCocktailIngredients;
