$(document).ready(() => {
  $('.button-collapse').sideNav();
  $('select').material_select();
  Materialize.fadeInImage('.recipe-image');
  Materialize.showStaggeredList('.recipe-ingredients');


  const urlParams = new URLSearchParams(window.location.search);
  const recipeQuery = 'https://recipe-db.herokuapp.com/recipes/' + urlParams.get('id');
  const reviewsQuery = 'https://recipe-db.herokuapp.com/reviews';
  console.log(recipeQuery);

  const dummy = {
    id: 2,
    name: 'Easy Peeling Boiled Eggs',
    user_id: 3,
    // url: 'https://goo.gl/POuqbl'   <-- DEAD LINK
    url: 'http://cdn.skim.gs/images/pyxbpz6bwgw3djmhbfc8/food-porn-on-instagram-naturally-hanne'
  };
  // console.log(dummy);

  const reviews = [
    {
      "id": 1,
      "body": "Lorem ipsum dolor. Sit amet sed sed ut at. Nibh aliquam ornare. Leo posuere sed. Cras eget sed proin et lectus sit egestas elit. Etiam orci mauris. Quis sed vehicula. Volutpat dolor qui viverra morbi suscipit etiam risus nam. Sit integer a mauris elit tellus nam blandit ornare magna proin augue. Vestibulum molestie magna. Vulputate ut suspendisse adipiscing pellentesque vestibulum tincidunt elit faucibus luctus risus cras tempor arcu aliquam sollicitudin lobortis sed. Ac ut quibusdam. Turpis proin parturient enim sit elit sit mauris justo. Fermentum in sit. Proin duis venenatis deserunt suspendisse fringilla nunc proin in. Adipisicing wisi placerat. A malesuada nulla in egestas aliquet ante class volutpat. Pulvinar quisque dignissim. Duis elementum amet integer duis conubia wisi eu augue. Id metus mattis. Vitae molestie dolore vestibulum elit donec. Volutpat porttitor ante. Posuere lectus luctus quis corrupti eget vestibulum odio praesent ut duis mauris. Molestie accumsan elit. Donec necessitatibus neque.",
      "user_id": 2,
      "recipe_id": 2,
      "rating": 2,
      "created_at": "2017-03-15T22:51:34.289Z"
    },
    {
      "id": 2,
      "body": "Hendrerit turpis ligula. Nec dis leo duis fringilla viverra adipiscing eu eget. Sollicitudin non urna odio sed et neque repellendus non. Leo felis ultricies. Sit per lacus. At erat sociis ornare suscipit nunc enim laoreet justo sit amet porta ornare urna ac. Tempor dolor dui. Integer luctus viverra vivamus arcu donec. Euismod sapien aliquam odio et est. Varius malesuada pellentesque.",
      "user_id": 1,
      "recipe_id": 2,
      "rating": 5,
      "created_at": "2017-03-15T22:51:34.289Z"
    },
    {
      "id": 3,
      "body": "Varius morbi ante. Elit eget ullamcorper bibendum id congue. Ornare gravida consectetuer eget neque inceptos. Interdum tellus mauris. Auctor hendrerit arcu. Vestibulum quisque ullamcorper. Nulla porttitor at. Pharetra quam feugiat erat odio sem. Etiam malesuada non. Nullam suspendisse dignissim ac voluptatem morbi orci felis aliquet lorem praesent curabitur. Justo lobortis rutrum sed orci vel in in quisque erat pellentesque vel. Tellus dolores sit. Magna sollicitudin turpis suspendisse sagittis convallis. Dui ultrices volutpat wisi ac elementum consequat magna consectetuer fringilla quis mauris orci risus sed. A leo mauris posuere vel dui.",
      "user_id": 3,
      "recipe_id": 2,
      "rating": 4,
      "created_at": "2017-03-15T22:51:34.289Z"
    }
  ];

  // USE IN .then OF GET REQUEST BELOW

  $('.recipe-title').text(dummy.name);
  $('.recipe-image').attr('src', dummy.url);

  // Get single post by recipe id
  // const getRecipe = $.get(recipeQuery)
  //   .then((recipe) => {
  //     $('.recipe-title').text(recipe.name);
  //     $('.recipe-image').attr('src', recipe.url);
  //
  //   });

  // Get reviews based on recipe id
  // const getReviews = $.get(reviewsQuery)
  //   .then((reviews) => {
  //
  //   });

    // console.log(reviews);
    reviews.forEach((review) => {
      console.log(review);
      createReviewCard(review);
    });

    function createReviewCard(reviewObj) {
      let starRating = '';

      for (var i = 0; i < reviewObj.rating; i++) {
        starRating += '<i class="material-icons">star</i>';
      }

      const $reviewCard = `<div class="card hoverable">
                             <div class="card-content">
                                <span class="card-title italic">${reviewObj.user_id}</span>
                                <div class="recipe-rating">Rating: ${starRating}</div>
                                <blockquote>${reviewObj.body}</blockquote>
                             </div>
                             <div class="card-action">
                                <button id="edit-review-btn" class="btn indigo lighten-2 waves-effect waves-light" type="button">
                                   <i class="material-icons left">edit</i>
                                   Edit
                                </button>
                                <button id="delete-review-btn" class="btn red darken-2 waves-effect waves-light" type="button">
                                   <i class="material-icons left">delete</i>
                                   Delete
                                </button>
                             </div>
                          </div>`;



      $('.review-section').append($reviewCard);
    }
});
