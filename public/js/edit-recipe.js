$(document).ready(() => {
  const recipeId = new URLSearchParams(window.location.search).get('id');
  const recipeQuery = 'https://recipe-db.herokuapp.com/recipes/' + recipeId;
  const stepsQuery = 'https://recipe-db.herokuapp.com/steps';
  const ingredientsRecipesQuery = 'https://recipe-db.herokuapp.com/ingredients_recipes';
  const ingredientsQuery = 'https://recipe-db.herokuapp.com/ingredients/';

  // Get recipe info
  $.get(recipeQuery)
    .then((recipe) => {
      $('#recipe_title').val(recipe.name);
      $('#recipe_image').val(recipe.url);
      // Get recipe steps
      $.get(stepsQuery)
        .then((steps) => {
          // Filter steps by recipe id
          const recipeSteps = steps.filter((step) => {
            return step.recipe_id === recipe.id;
          });
          // Populate step fields with recipe steps
          recipeSteps.forEach((recipeStep) => {
              const $newStep = $(
                `<li class="row">
                  <button class="remove-btn btn-floating waves-effect waves-light right red" type="button">
                    <i class="material-icons">remove</i>
                  </button>
                  <div class="step input-field inline right col s11">
                    <input placeholder="" value="${recipeStep.body}" type="text" class="recipe-step validate">
                    </div>
                </li>`);
              $('.recipe-steps').append($newStep);
          });
          // Get ingredients_recipes
          $.get(ingredientsRecipesQuery)
            .then((results) => {
              // Filter results by recipe id
              const recipeIngredients = results.filter((result) => {
                return result.recipe_id === recipe.id;
              });
              // Get ingredients by ingredients_id
              recipeIngredients.forEach((ingredient, i, arr) => {
                $.get(ingredientsQuery + ingredient.ingredients_id)
                  .then((item) => {
                      // Populate quantity and ingredient fields
                      const $newIngredient = $(
                        `<li class="row">
                        <button class="remove-btn btn-floating waves-effect waves-light right red" type="button">
                        <i class="material-icons">remove</i>
                        </button>
                        <div class="quantity input-field inline col s2">
                        <input placeholder="" value="${ingredient.quantity}" type="text" class="ingredient-quantity validate">
                        </div>
                        <div class="ingredient input-field inline col s9">
                        <input disabled placeholder="" value="${item.name}" type="text" class="ingredient-name validate">
                        </div>
                        </li>`);
                        $('.recipe-ingredients').append($newIngredient);
                  });
              });
            });
        });
    });
});
