$(document).ready(() => {
  $('.button-collapse').sideNav();

  $('#add-step').click(() => {
    const $newStep = $('<li class="row"></li>');
    const $deleteStepBtn = $('<button class="remove-step-btn btn-floating waves-effect waves-light right red" type="button"><i class="material-icons">remove</i></button>')
    const $newStepInput = $('<div class="step input-field inline right col s11"><input placeholder="Add directions here" id="recipe_step" type="text" class="validate"></div>');
    $newStep.append($deleteStepBtn, $newStepInput);
    $('.recipe-steps').append($newStep);
  });

  $(document).on('click', '.remove-step-btn', (e) => {
    const stepItem = e.currentTarget.parentElement;
    stepItem.parentElement.removeChild(stepItem);
  });
});
