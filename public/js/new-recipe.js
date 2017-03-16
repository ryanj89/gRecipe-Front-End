$(document).ready(() => {
  $('.button-collapse').sideNav();
  let step = 2;
  let ingredient_num = 2;

  // Add new ingredient
  $('#add_ingredient').click(() => {
    const $newIngredient = $('<li class="row"></li>');
    const $deleteIngredientBtn = $('<button class="remove-btn btn-floating waves-effect waves-light right red" type="button"><i class="material-icons">remove</i></button>')
    const $newIngredientInput = $(`<div class="quantity input-field inline col s2">
                                      <input placeholder="#" type="number" name="ingredient_quantity${ingredient_num}" class="ingredient-quantity scale-transition validate">
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
  $('#submit_recipe').on('click', (e) => {
    e.preventDefault();

    const recipe = {
      name: $('#recipe_title').val(),
      username: $('#recipe_author').val(),
      url: $('#recipe_image').val(),
    };
    // Ingredients
    const ingNameArr = $('input.ingredient-name').get();
    const ingQtyArr = $('input.ingredient-quantity').get();

    const ingredients = ingNameArr.map((item, i) => {
      let obj = { };
      obj['name'] = item.value;
      obj['quantity'] = ingQtyArr[i].value;
      return obj;
    });

    // Steps
    const recipeStepArr = $('input.recipe-step').get();

    const steps = recipeStepArr.map((item, i) => {
      let obj = { };
      obj['body'] = item.value;
      obj['step_number'] = i + 1;
      return obj;
    });

    console.log('Ingredients: ', ingredients);
    console.log('Steps: ', steps);
    console.log('Recipe: ', recipe);
  });


  $(document).on('click', '.remove-btn', (e) => {
    const item = e.currentTarget.parentElement;
    item.parentElement.removeChild(item);
  });
});
