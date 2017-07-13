//plugin bootstrap minus and plus
//http://jsfiddle.net/laelitenetwork/puJ6G/
//http://bootsnipp.com/snippets/featured/buttons-minus-and-plus-in-input

$(document).ready(function() {
  
  var MIN = 8;
  var MAX = 15;
  var pointsInput = $('.total-points');
  var pointsRemaining = pointsInput.val();
  var currentCost;
  
  $('.btn-number').click(function(e) {
    e.preventDefault();

    var fieldName = $(this).data('field');
    var type = $(this).data('type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    var currentCost = parseInt(input.data('cost'));
    var nextVal;
    var nextCost;
    var nextPointsRemaining;
    
    if (!isNaN(currentVal)) {
      if (type == 'minus') {
        // figure out next cost
        // figure out how many next points remaining will be
        // if total points will be > 0, enable all minus buttons IF that input is < 15
        // if current value will be <= 8, disable minus button
        // change input value to -1
        // change remaining points
        // change score variable to -1
        
        //pointsRemaining = pointsInput.val();        
        nextVal = currentVal - 1;
        nextCost = getAbilityScoreCost(nextVal);
        nextPointsRemaining = parseInt(pointsInput.val()) + (currentCost - nextCost);
        if (nextPointsRemaining > 0)
        {
          // check to re-enable plus buttons
          $('.btn-number[data-type="plus"]').each(function(index)
          {
            plusInput = $('.input-number[name="' + $(this).data('field') + '"]');
            inputValue = parseInt(plusInput.val());
            if (inputValue < MAX) && getAbilityScoreCost(inputValue) <= nextPointsRemaining)
            {
              $(this).removeAttr('disabled');
            }
          });
        }
        
        if (currentVal > input.attr('min')) {
          input.data('cost', nextCost);
          pointsInput.val(nextPointsRemaining).change();
          input.val(nextVal).change();
        }
        
        // move to intput on change
        if (parseInt(input.val()) == input.attr('min')) {
          $(this).attr('disabled', true);
        }
      } 
      
      else if (type == 'plus') {
        // if total points will be <= 0, disable all plus buttons
        // if current value will be > 14, disable plus button
        // change input value to +1
        // change remaining points
        // change score variable to +1
        
        nextVal = currentVal + 1;
        nextCost = getAbilityScoreCost(nextVal);
        if (currentVal < input.attr('max') && nextCost <= pointsRemaining) {
          input.data('cost', nextCost);
          currentCost = getAllCosts();
          pointsInput.val(pointsRemaining - currentCost).change();
          input.val(currentVal + 1).change();
        }
        if (parseInt(input.val()) == input.attr('max') || nextCost >= pointsRemaining) {
          $(this).attr('disabled', true);
        }
      }
    } 
    
    else {
      input.val(0);
    }
  });

  $('.input-number').change(function() {

    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    name = $(this).attr('name');
    //valueCurrent = abilityScores[name.substring(0, 3)];
    valueCurrent = parseInt($(this).val());

    var name = $(this).attr('name');
    if (valueCurrent >= minValue) {
      $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled');
    } else {
      //$(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue && getAbilityScoreCost(valueCurrent) <= pointsInput.val()) {
      $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled');
    } else {
      //$(this).val($(this).data('oldValue'));
    }
    
    abilityScores[name.substring(0, 3)] += 1;
    setAbilityModifier(name.substring(0,3));
  });
  
  pointsInput.change(function () {
    if (parseInt($(this).val()) <= 0)
    {
      $('.btn-number[data-type="plus"]').attr('disabled', true);
    }
  });

  $('.input-number').focusin(function() {
    $(this).data('oldValue', $(this).val());
  });

  $(".input-number").keydown(function(e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
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
  
});

function getAllCosts() {
  var str = $('input[name="str-input"]').data('cost');
  var dex = $('input[name="dex-input"]').data('cost');
  var con = $('input[name="con-input"]').data('cost');
  var int = $('input[name="int-input"]').data('cost');
  var wis = $('input[name="wis-input"]').data('cost');
  var cha = $('input[name="cha-input"]').data('cost');
  
  return (str + dex + con + int + wis + cha);
}
