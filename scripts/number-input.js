$(document).ready(function() {

  var strBase = $('[name=str-input]').val();
  var strBonus = $('#ab-str > .ab-race-bonus').text();
  var strFinal = $('#ab-str > .ab-score').text();
  var strMod = $('#ab-str > .ab-mod').text();
  var totalPoints = 27;
  var remainingPoints = 27;
  var currentCost = 0;

  $('.btn-number').click(function(e) {

    var target = $(this).data('field');
    var type = $(this).data('type');
    var input = $('input[name="' + target + '"]');
    var currentVal = parseInt(input.val());
    var nextVal;
    // plus
    if (type == 'plus')
    {
      // nextVal = currentVal++
      nextVal = currentVal + 1;
      // nextVal ! invalid || enough points left
      if (nextVal < 15)
        // change currentVal
        // update other fields (points, final, mod)
    }

    // minus
    if (type == 'minus')
    {

    }
  });

  //============================================
  //              User-proofing
  //============================================
  $('.input-number').focusin(function() {
    $(this).data('last-value', $(this).val());
  });

  $('.input-number').focusout(function(e) {
    var val = $(this).val();
    if (!val || val > 15 || val < 8)
    {
      var lastValue = $(this).data('last-value');
      $(this).val(lastValue);
    }
  });

  $('.input-number').keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
  //============================================
});
