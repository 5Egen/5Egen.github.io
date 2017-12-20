//plugin bootstrap minus and plus
//http://jsfiddle.net/laelitenetwork/puJ6G/
//http://bootsnipp.com/snippets/featured/buttons-minus-and-plus-in-input

$(document).ready(function() {

  var totalPointsInput = $('.total-points');
  var totalPoints = totalPointsInput.val();
  var totalCost;

  $('.btn-number').click(function(e) {
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    var currentCost = parseInt(input.data('cost'));
    var nextVal;
    var nextCost;

    if (!isNaN(currentVal)) {

      if (type == 'minus') {
        nextVal = currentVal - 1;
        nextCost = getAbilityScoreCost(nextVal);

        if (currentVal > input.attr('min')) {
          input.data('cost', nextCost);
          totalCost = getAllCosts();
          totalPointsInput.val(totalPoints - totalCost).change();
          input.val(currentVal - 1).change();
        }
        if (parseInt(input.val()) == input.attr('min')) {
          $(this).attr('disabled', true);
        }
      }

      else if (type == 'plus') {
        nextVal = currentVal + 1;
        nextCost = getAbilityScoreCost(nextVal);
        if (currentVal < input.attr('max') && nextCost <= totalPoints) {
          input.data('cost', nextCost);
          totalCost = getAllCosts();
          totalPointsInput.val(totalPoints - totalCost).change();
          input.val(currentVal + 1).change();
        }
        if (parseInt(input.val()) == input.attr('max') || nextCost >= totalPoints) {
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
    valueCurrent = parseInt($(this).val());

    var name = $(this).attr('name');
    if (valueCurrent >= minValue) {
      $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled');
    } else {
      //$(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue && getAbilityScoreCost(valueCurrent) <= totalPointsInput.val()) {
      $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled');
    } else {
      //$(this).val($(this).data('oldValue'));
    }

    setAbilityModifier();
  });

  $('.total-points').change(function () {
    if (parseInt($(this).val()) <= 0)
    {
      $('.btn-number[data-type="plus"').attr('disabled', true);
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

function getAbilityModifier(score) {
  var mod;
  mod = Math.floor((score - 10) / 2);
  return mod;
}

function getAbilityScoreCost(score) {
  var cost;
  if (score == 15) {
    cost = 9;
  } else if (score == 14) {
    cost = 7;
  } else {
    cost = score - 8;
  }
  return cost;
}

function getAllCosts() {
  var str = $('input[name="str-input"]').data('cost');
  var dex = $('input[name="dex-input"]').data('cost');
  var con = $('input[name="con-input"]').data('cost');
  var int = $('input[name="int-input"]').data('cost');
  var wis = $('input[name="wis-input"]').data('cost');
  var cha = $('input[name="cha-input"]').data('cost');

  return (str + dex + con + int + wis + cha);
}

function setAbilityModifier()
{
  var score = $('.input-number[name="str-input"]').val();
  $('#str-mod').html(getAbilityModifier(score));
}
