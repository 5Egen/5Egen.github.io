// Code goes here

$(document).ready(function() {

  /* Skills table script
  -------------------------------------------------- */
  $('.custom-control-input').change(function() {
    var skill = $(this).data('skill');
    if ($(this).prop('checked'))
    {
      $('#' + skill + '-prof-bonus').removeClass('invisible');
      var mod = parseInt($('#' + skill + '-mod').val());
      $('#' + skill + '-mod').val(mod + 2);
    }
    else {
      $('#' + skill + '-prof-bonus').addClass('invisible');
      var mod = parseInt($('#' + skill + '-mod').val());
      $('#' + skill + '-mod').val(mod - 2);
    }
  });

  $('.skill-label').click(function() {
    var skill = $(this).data('skill');
    $('input[data-skill=' + skill + ']').click();
  });

  /* Alignment button grid script
  -------------------------------------------------- */
  $('.alignment-grid button').click(function(e){
    e.preventDefault();
    var thisButton = $(this);
    var id = thisButton.attr("id");
    $('.alignment-grid button').removeClass('active');
    $('.alignment-misc button').removeClass('active');
    thisButton.addClass('active');
  });

  $('.alignment-misc button').click(function(e){
    e.preventDefault();
    var thisButton = $(this);
    var id = thisButton.attr("id");
    $('.alignment-grid button').removeClass('active');
    $('.alignment-misc button').removeClass('active');
    thisButton.addClass('active');
  });
});
