export const useDrinksToDisplay = (results) => {
  const drinksCount = {};
  let commonDrinks = [];
  let drinksToDisplay = results[0];
  let noExactResults = false;

  if (results.length > 1) {
    results.forEach((result) => {
      result.forEach((drink) => {
        if (drinksCount[drink.strDrink]) {
          drinksCount[drink.strDrink]++;
        } else {
          drinksCount[drink.strDrink] = 1;
        }
      });
    });
    // Obtain an array of drinks' names that are common to all results
    commonDrinks = Object.keys(drinksCount).filter((drink) => drinksCount[drink] === results.length);
    console.log(results[0].filter((drink) => commonDrinks.includes(drink.strDrink)));
    // Return an array of drinks objects that are common to all results
    if (commonDrinks.length) {
      drinksToDisplay = results[0].filter((drink) => commonDrinks.includes(drink.strDrink));
    } else {
      noExactResults = true;
      drinksToDisplay = Object.entries(drinksCount)
        .sort((a, b) => b[1] - a[1])
        .map((drinkCount) => {
          return results.flat().find((drink) => drink.strDrink === drinkCount[0]);
        });
    }
  }

  return { drinksToDisplay, noExactResults };
};
