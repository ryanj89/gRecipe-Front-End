$(document).ready(() => {
  $('.button-collapse').sideNav();
  $('select').material_select();
  Materialize.fadeInImage('.recipe-image');
  Materialize.showStaggeredList('.recipe-ingredients');

  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');
  const recipeQuery = 'https://recipe-db.herokuapp.com/recipes/' + recipeId;
  const stepsQuery = 'https://recipe-db.herokuapp.com/steps';
  const reviewsQuery = 'https://recipe-db.herokuapp.com/reviews';
  const ingRecipeQuery = 'https://recipe-db.herokuapp.com/ingredients_recipes';
  const ingredientsQuery = 'https://recipe-db.herokuapp.com/ingredients/';
  const usersQuery = 'https://recipe-db.herokuapp.com/users/';

  // Update edit recipe link
  $('#edit-recipe-btn').attr('href', `./edit-recipe.html?id=${recipeId}`);

  // Get single post by recipe id
  $.get(recipeQuery).then((recipe) => {
    console.log(recipe.avg);
    $('.recipe-title').text(recipe.name);
    $('.recipe-image').attr('src', recipe.url);
    const $rating = $('.recipe-rating');
    if (recipe.avg != null) {
      for (var i = 0; i < parseInt(recipe.avg); i++) {
        const $star = $('<i class="material-icons">star</i>');
        $rating.append($star);
      }
    } else {
      $rating.append('<span class="byline italic">No Ratings Yet</span>')
    }
    // Get user name by recipe.user_id
    $.get(usersQuery + recipe.user_id).then((user) => {
      $('.author-name').text(user.name);
    });

    // Get recipe steps and filter by recipe id
    $.get(stepsQuery).then((steps) => {
      const recipeSteps = steps.filter((step) => {
        return step.recipe_id == recipeId;
      });
      // Append steps to recipe page
      recipeSteps.forEach((recipeStep) => {
        $('.recipe-steps').append(`<li>${recipeStep.body}</li>`);
      });
    });

    // Get ingredients_recipes
    $.get(ingRecipeQuery).then((results) => {
      // Filter results by recipe id
      const ingsRecipe = results.filter((result) => {
        return result.recipe_id == recipeId;
      });

      // Get each ingredient based on matched results
      ingsRecipe.forEach((ingRecipe) => {
        const id = ingRecipe.ingredients_id;
        $.get(ingredientsQuery + id)
          .then((ingredient) => {
            $('.recipe-ingredients').append(`<li><a class="collection-item">${ingRecipe.quantity} ${ingredient.name}</a></li>`);
          });
      });
    });


    // Get reviews and filter by recipe id
    $.get(reviewsQuery).then((reviews) => {
      const matchedReviews = reviews.filter((review) => {
        return review.recipe_id == recipeId;
      });
      // Append review count to rating
      $rating.append(`(${matchedReviews.length})`)
      // Create review cards on page
      matchedReviews.forEach((matchedReview) => {
        // console.log(matchedReview);
        $.get(usersQuery + matchedReview.user_id).then((user) => {
          matchedReview['name'] = user.name;
          createReviewCard(matchedReview);
        });
      });
    });
  });

  // Submit new review
  $('#submit-review-btn').click((e) => {
    e.preventDefault();

    const review = {
      body: $('#body').val(),
      name: $('#review-user').val(),
      recipe_id: recipeId,
      rating: $('#rating').val(),
    }
    $.post(reviewsQuery, review)
      .then((result) => {
        window.location.reload();
    });
  });

  // Delete review
  $(document).on('click', '#delete-review-btn', (e) => {
    e.preventDefault();
    const id = e.target.value;
    console.log(reviewsQuery + '/' + id);
    $.ajax({
      url: reviewsQuery + '/' + id,
      method: 'DELETE',
      success: () => {
        window.location.href = `./index.html`;
        // window.location.reload();
      }
    });
  });

  function createReviewCard(reviewObj) {
    let starRating = '';
    for (var i = 0; i < reviewObj.rating; i++) {
      starRating += '<i class="material-icons">star</i>';
    }
    const $reviewCard = `<div class="card hoverable">
                           <div class="card-content">
                              <span class="card-title italic">${reviewObj.name}</span>
                              <div class="recipe-rating">Rating: ${starRating}</div>
                              <blockquote>${reviewObj.body}</blockquote>
                           </div>
                           <div class="card-action">
                              <a id="edit-review-btn" href="./edit-review.html?id=${reviewObj.id}&recipe_id=${reviewObj.recipe_id}" class="btn indigo lighten-2 waves-effect waves-light">
                                 <i class="material-icons left">edit</i>
                                 Edit
                              </a>
                              <button id="delete-review-btn" class="btn red darken-2 waves-effect waves-light" name="id" value="${reviewObj.id}">
                                 <i class="material-icons left">delete</i>
                                 Delete
                              </button>
                           </div>
                        </div>`;
    $('.review-section').append($reviewCard);
  }
});
