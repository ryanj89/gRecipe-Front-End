$(document).ready(() => {
  $('.button-collapse').sideNav();
  $('select').material_select();

  const urlParams = new URLSearchParams(window.location.search);
  const reviewId = urlParams.get('id');
  const recipeId = urlParams.get('recipe_id');
  const reviewQuery = 'https://recipe-db.herokuapp.com/reviews/' + reviewId;

  $.get(reviewQuery).then((review) => {
    $('#body').text(review.body);
    // $(`#rating option[value=${review.rating}]`).attr('selected', true);
    // $(`.select-dropdown li:eq(${review.rating - 1})`).addClass('active selected');
    $('.select-dropdown').val(review.rating);
  });

  // Update review
  $('#submit-review-btn').click((e) => {
    e.preventDefault();
    const review = {
      body: $('#body').val(),
      rating: $('.select-dropdown').val()
    }

    $.ajax({
      url: reviewQuery,
      method: 'PUT',
      data: review,
      success: () => {
        window.location.href = `./recipe.html?id=${recipeId}#reviews`;
      }
    });
  });
});
