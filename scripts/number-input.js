// --------------- Base elements ---------------
var strBaseElement = $('[name=str-input]');
var dexBaseElement = $('[name=dex-input]');
var conBaseElement = $('[name=con-input]');
var intBaseElement = $('[name=int-input]');
var wisBaseElement = $('[name=wis-input]');
var chaBaseElement = $('[name=cha-input]');

var totalPoints = 27;

$(document).ready(function() {

  $('.btn-number').click(function(e) {

    var target = $(this).data('field');
    var type = $(this).data('type');
    var input = $('input[name=' + target + ']');
    var currentVal = parseInt(input.val());
    var currentCost = costLookup(currentVal);
    var nextVal;
    // plus
    if (type == 'plus')
    {
      // nextVal = currentVal++, remaining points
      nextVal = currentVal + 1;
      var remainingPoints = totalPoints - (checkCurrentPoints() - currentCost + costLookup(nextVal));
      // nextVal ! invalid || enough points left
      if (nextVal <= 15 && remainingPoints >= 0)
      {
        input.data('last-value', currentVal);
        // change currentVal
        input.val(nextVal).change();
        currentVal = nextVal;
      }
    }

    // minus
    if (type == 'minus')
    {
      nextVal = currentVal - 1;
      if (nextVal >= 8)
      {
        input.data('last-value', currentVal);
        input.val(nextVal).change();
        currentVal = nextVal;
      }
    }
  });

  $('.input-number').change(function() {
    // get current value
    var value = parseInt($(this).val());
    // get ability score
    var prefix = $(this).attr('name').substring(0, 3);
    var raceBonus = parseInt($('#ab-' + prefix + ' > .ab-race-bonus').text());
    // get mod
    var mod = calculateMod(value);
    if (mod > 0)
    {
      mod = '+' + mod;
    }

    //set current cost
    $(this).data('cost', costLookup(value));
    // set remaining points
    $('#remaining-points').val(totalPoints - checkCurrentPoints()).change();
    // set score and mod
    $('#ab-' + prefix + ' > .ab-score').text(value + raceBonus);
    $('#ab-' + prefix + ' > .ab-mod').text(mod);
    // disable/enable buttons
    if (value >= 15)
    {
      $('[data-field=' + prefix + '-input][data-type=plus]').prop('disabled', true);
    }
    if (value > 8)
    {
      $('[data-field=' + prefix + '-input][data-type=minus]').prop('disabled', false);
    }
    if (value <= 8)
    {
      $('[data-field=' + prefix + '-input][data-type=minus]').prop('disabled', true);
    }
  });

  $('#remaining-points').change(function() {
    var points = parseInt($(this).val());
    if (points <= 0)
    {
      // disable plus buttons
      $('[data-type=plus]').prop('disabled', true);
    }
    else {
      // enable only VALID plus buttons
      enableButtons();
      //$('[data-type=plus]').prop('disabled', false);
    }
    //recheckButtons();
  });

  //============================================
  //              User-proofing
  //============================================
  $('.input-number').focusin(function() {
    $(this).data('last-value', $(this).val());
  });

  $('.input-number').focusout(function(e) {
    var val = $(this).val();
    var remainingPoints = totalPoints - checkCurrentPoints();
    console.log(remainingPoints + " " + checkCurrentPoints());
    if (!val || val > 15 || val < 8 || remainingPoints >= 0)
    {
      var lastValue = $(this).data('last-value');
      $(this).val(lastValue).change();
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

//============================================
//              Lookup functions
//============================================

function checkCurrentPoints()
{
  var strCost = costLookup(parseInt(strBaseElement.val()));
  var dexCost = costLookup(parseInt(dexBaseElement.val()));
  var conCost = costLookup(parseInt(conBaseElement.val()));
  var intCost = costLookup(parseInt(intBaseElement.val()));
  var wisCost = costLookup(parseInt(wisBaseElement.val()));
  var chaCost = costLookup(parseInt(chaBaseElement.val()));
  var totalCost = strCost + dexCost + conCost + intCost + wisCost + chaCost;
  return totalCost;
}

function costLookup(score)
{
  if (score == 15)
  {
    return 9;
  }
  if (score == 14)
  {
    return 7;
  }
  if (score <= 13 && score >= 8)
  {
    return (score - 8);
  }
  return 0;
}

function calculateMod(score)
{
  var mod = Math.floor((score-10)/2);
  return mod;
}

function enableButtons()
{
  checkButton('str');
  checkButton('dex');
  checkButton('con');
  checkButton('int');
  checkButton('wis');
  checkButton('cha');
}

function checkButton(ability)
{
  ability = ability + '-input';
  if (parseInt($('[name=' + ability + ']').val()) < 15)
  {
    $('[data-field=' + ability + '][data-type=plus]').prop('disabled', false);
  }
  else
  {
    $('[data-field=' + ability + '][data-type=plus]').prop('disabled', true);
  }
}
//============================================
