// Code goes here

$(document).ready(function() {

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
