$(() => {
  const ingredientsQuery = 'https://recipe-db.herokuapp.com/ingredients';
  const $ingredientsTable = $('#ingredients-table');
  // Get list of all ingredients
  $.get(ingredientsQuery).then((ingredients) => {
    ingredients.forEach((ingredient) => {
      const $ingredientLink = $('<a>').attr('href', `./ingredient.html?id=${ingredient.id}`).text(ingredient.name);
      const $tableItem = $('<td>').append($ingredientLink);
      const $tableRow = $('<tr>').append($tableItem);
      $ingredientsTable.append($tableRow);
    });
  });
});
