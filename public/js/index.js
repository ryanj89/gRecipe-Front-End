$(document).ready(() => {
  $('.button-collapse').sideNav();

  // Get all recipes
  $.get('https://recipe-db.herokuapp.com/recipes')
    .then((recipes) => {
      console.log(recipes);
      // For each recipe, get the author's name
      recipes.forEach((recipe) => {
        console.log('user_id: ', recipe.user_id);
        // If user_id exists, get author name
        if (recipe.user_id != null) {
          $.get('https://recipe-db.herokuapp.com/users/' + recipe.user_id)
            .then((user) => {
              recipe['author'] = user.name;
              createRecipeCard(recipe);
            });
        } else {
          return;
        }
      });
    });

  function createRecipeCard(recipe) {
    console.log(recipe);
    const $card = `<div class="col s12 m4">
            <!-- Recipe Card -->
            <div class="card hoverable">

               <!-- Recipe Image -->
               <a href="./recipe.html?id=${recipe.id}" class="card-image waves-effect waves-block waves-light">
                  <img src="${recipe.url}">
                  <span class="card-title recipe-title">${recipe.name}</span>
               </a>

               <!-- Recipe Content -->
               <div class="card-content">
                  <p class="recipe-author">${recipe.author}</p>

                  <!-- Recipe Rating -->
                  <div class="recipe-rating">
                     <p class="recipe-rating">Rating: <i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i></p>
                  </div>

                  <br><div class="divider"></div><br>
                  <p>A brief description of the dish goes here.</p>

               </div>

            </div>
            <!-- ./Recipe Card -->
         </div>`
    $('.recipe-section').append($card);
  }
});
