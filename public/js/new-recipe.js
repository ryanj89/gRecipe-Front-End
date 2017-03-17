$(document).ready(() => {
  $('.button-collapse').sideNav();
  let step = 2;
  let ingredient_num = 2;

  // Add new ingredient
  $('#add_ingredient').click(() => {
    const $newIngredient = $('<li class="row"></li>');
    const $deleteIngredientBtn = $('<button class="remove-btn btn-floating waves-effect waves-light right red" type="button"><i class="material-icons">remove</i></button>')
    const $newIngredientInput = $(`<div class="quantity input-field inline col s2">
                                      <input placeholder="Qty" type="text" name="ingredient_quantity${ingredient_num}" class="ingredient-quantity validate">
                                   </div>
                                   <div class="ingredient input-field inline col s9">
                                      <input placeholder="Add ingredient here" name="recipe_ingredient${ingredient_num}" type="text" class="ingredient-name validate">
                                   </div>`);
    $newIngredient.append($deleteIngredientBtn, $newIngredientInput);
    $('.recipe-ingredients').append($newIngredient);
    ingredient_num += 1;
  });

  // Add new step
  $('#add_step').click(() => {
    const $newStep = $('<li class="row"></li>');
    const $deleteStepBtn = $('<button class="remove-btn btn-floating waves-effect waves-light right red" type="button"><i class="material-icons">remove</i></button>')
    const $newStepInput = $(`<div class="step input-field inline right col s11"><input placeholder="Add directions here" name="recipe_step${step}" type="text" class="recipe-step validate"></div>`);
    $newStep.append($deleteStepBtn, $newStepInput);
    $('.recipe-steps').append($newStep);
    step += 1;
  });

  // Submit recipe
  $(document).on('click', '#submit_recipe', (e) => {
    e.preventDefault();

    // Recipe
    const recipe = {
      name: $('#recipe_title').val(),
      username: $('#recipe_author').val(),
      url: $('#recipe_image').val(),
    };



    // Post Recipe
    $.post('https://recipe-db.herokuapp.com/recipes', recipe)
      .then((recipeId) => {

        // Post Steps
        const steps = $('input.recipe-step').get().map((item, i) => {
          let obj = { };
          obj['body'] = item.value;
          obj['step_number'] = i + 1;
          obj['recipe_id'] = recipeId[0];
          return obj;
        });
        steps.forEach((step) => {
          $.post('https://recipe-db.herokuapp.com/steps', step)
            .then(() => {
              return;
            });
        });

        // Ingredients
        const ingredients = $('input.ingredient-name').get().map((item) => {
          let obj = { };
          obj['name'] = item.value;
          return obj;
        });
        ingredients.forEach((ingredient, i) => {
          $.post('https://recipe-db.herokuapp.com/ingredients', ingredient)
            .then((ingredientId) => {
              const quantity = $('input.ingredient-quantity').get();
              const ingredients_recipes = {
                ingredients_id: ingredientId[0],
                recipe_id: recipeId[0],
                quantity: quantity[i].value
              }
              $.post('https://recipe-db.herokuapp.com/ingredients_recipes', ingredients_recipes)
                .then(() => {
                  return;
                });
            });
        })
        .then(() => {
          window.location.href = './index.html';
        });
      });
  });




  $(document).on('click', '.remove-btn', (e) => {
    const item = e.currentTarget.parentElement;
    item.parentElement.removeChild(item);
  });
});
