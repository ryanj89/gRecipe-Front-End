$(document).ready(() => {
  $('select').material_select();

  const urlParams = new URLSearchParams(window.location.search);
  const reviewId = urlParams.get('id');
  const reviewQuery = 'https://recipe-db.herokuapp.com/reviews/' + reviewId;

  $.get(reviewQuery).then((review) => {
    $('#body').text(review.body);
    const opt = $('#rating > option').eq(review.rating - 1)[0];
    opt.selected = true;
  });
});
