$(document).ready(() => {
  $('.button-collapse').sideNav();
  const recipeId = new URLSearchParams(window.location.search).get('id');
  const recipeQuery = 'https://recipe-db.herokuapp.com/recipes/' + recipeId;
  const stepsQuery = 'https://recipe-db.herokuapp.com/steps';
  const ingredientsRecipesQuery = 'https://recipe-db.herokuapp.com/ingredients_recipes';
  const ingredientsQuery = 'https://recipe-db.herokuapp.com/ingredients/';

  const originalSteps = [];
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
            originalSteps.push(recipeStep);
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
                        <input placeholder="" value="${item.name}" type="text" class="ingredient-name validate">
                        </div>
                        </li>`);
                        $('.recipe-ingredients').append($newIngredient);
                  });
              });
           });
        });
    });

    // Event Handlers

    // Remove item button
    $(document).on('click', '.remove-btn', (e) => {
      const item = e.currentTarget.parentElement;
      item.parentElement.removeChild(item);
    });

    // Add new ingredient
    $('#add_ingredient').click(() => {
      const $newIngredient = $(
        `<li class="row">
          <button class="remove-btn btn-floating waves-effect waves-light right red" type="button">
            <i class="material-icons">remove</i>
          </button>
          <div class="quantity input-field inline col s2">
            <input placeholder="Qty" type="text" class="ingredient-quantity validate">
          </div>
          <div class="ingredient input-field inline col s9">
            <input placeholder="Add ingredient here" type="text" class="ingredient-name validate">
          </div>
        </li>`);
        $('.recipe-ingredients').append($newIngredient);
    });

    // Add new step
    $('#add_step').click(() => {
      const $newStep = $(
        `<li class="row">
          <button class="remove-btn btn-floating waves-effect waves-light right red" type="button">
            <i class="material-icons">remove</i>
          </button>
          <div class="step input-field inline right col s11">
            <input placeholder="Add directions here" type="text" class="recipe-step validate">
          </div>
        </li>`);
      $('.recipe-steps').append($newStep);
    });

    $('#submit_recipe').click((e) => {
      e.preventDefault();
      const recipe = {
         name: $('#recipe_title').val(),
         url: $('#recipe_image').val(),
      }
      // Update recipe
      $.ajax({
        url: recipeQuery,
        method: 'PUT',
        data: recipe
      })
      .then(() => {
        // Compare originalSteps to new steps
        // and determine if they need to be updated
        console.log(originalSteps);
        
        // Update steps
        const steps = $('.step > input').get();
        steps.forEach((step) => {
          console.log(step.value);

        });
        // $.ajax({
        //   url: stepsQuery,
        //   method: 'PUT',
        //   data: steps
        // })
      })
      // .then(() => { window.location.href = `./recipe.html?id=${recipeId}` });
    });
});
