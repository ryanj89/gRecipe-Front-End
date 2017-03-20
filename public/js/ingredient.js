$(() => {
  const ingredientId = new URLSearchParams(window.location.search).get('id');
  const ingredientsQuery = 'https://recipe-db.herokuapp.com/ingredients/';
  const recipeQuery = 'https://recipe-db.herokuapp.com/recipes/';
  const ingRecipeQuery = 'https://recipe-db.herokuapp.com/ingredients_recipes';
  const $ingredientsTable = $('#ingredients-table');
  const $ingredientName = $('#ingredient-name');

  // Get ingredient by id
  // then get ingredients_recipes to get the associated recipe id
  // then get each recipe which use that ingredient
  Promise.all([$.get(ingredientsQuery + ingredientId), $.get(ingRecipeQuery)])
    .then((results) => {
      const id = results[0].id;
      const ingRecipe = results[1];
      $ingredientName.text(results[0].name);
      const relatedRecipes = ingRecipe.filter(item => item.ingredients_id === id);
      relatedRecipes.forEach((recipe) => {
        $.get(recipeQuery + recipe.recipe_id)
          .then((result) => {
            const $recipeLink = $('<a>').attr('href', `./recipe.html?id=${result.id}`).text(result.name);
            const $tableItem = $('<td>').append($recipeLink);
            const $tableRow = $('<tr>').append($tableItem);
            $ingredientsTable.append($tableRow);
          });
      });
    });
});
