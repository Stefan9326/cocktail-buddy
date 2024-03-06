const countDrinks = (flattenedResults) => {
  const counts = {};
  flattenedResults.forEach((drink) => {
    if (drink.strDrink in counts) {
      counts[drink.strDrink]++;
    } else {
      counts[drink.strDrink] = 1;
    }
  });
  return counts;
};

// Obtain an array of drinks' names that are common to all results.
const findCommonDrinks = (drinkCounts, resultsLength) => {
  return Object.keys(drinkCounts).filter((drink) => drinkCounts[drink] === resultsLength);
};

export const getDrinksToDisplay = (results) => {
  let drinksToDisplay = results[0];
  let noExactResults = false;

  // If more than one ingredient was used to search, compare the results for each ingredient to find common drinks.
  if (results.length > 1) {
    const flattenedResults = results.flat();
    const drinksCount = countDrinks(flattenedResults);
    const commonDrinks = findCommonDrinks(drinksCount, results.length);

    if (commonDrinks.length) {
      drinksToDisplay = results[0].filter((drink) => commonDrinks.includes(drink.strDrink));
    } else {
      noExactResults = true;
      drinksToDisplay = Object.entries(drinksCount)
        .sort((a, b) => b[1] - a[1])
        .map((drinkCount) => {
          return flattenedResults.find((drink) => drink.strDrink === drinkCount[0]);
        });
    }
  }
  return { drinksToDisplay, noExactResults };
};
