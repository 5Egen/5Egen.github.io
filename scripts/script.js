// Code goes here
  var strScore = 8;
  var dexScore = 8;
  var conScore = 8;
  var intScore = 8;
  var wisScore = 8;
  var chaScore = 8;
  
  var abilityScores = {
    'str' : 8,
    'dex' : 8,
    'con' : 8,
    'int' : 8,
    'wis' : 8,
    'cha' : 8,
  }

$(document).ready(function () {
  
  $(".race-select").change(function(){
    var selectedRace = $(this).find('option:selected').data('desc');
    $('#race-well .race-desc').addClass('hidden');
    $('.' + selectedRace).removeClass('hidden');
  });
  
  $(".class-select").change(function(){
    var selectedClass = $(this).find('option:selected').data('desc');
    $('#class-well .class-desc').addClass('hidden');
    $('.' + selectedClass).removeClass('hidden');
  });
  
  $('.alignment-grid button').click(function(e){
    e.preventDefault();
    var thisButton = $(this);
    var id = thisButton.attr("id");
    $('.alignment-grid button').removeClass('active');
    $('.alignment-misc button').removeClass('active');
    thisButton.addClass('active');
    $('.alignment-descriptions p').addClass('hidden');
    $('.alignment-descriptions div').addClass('hidden');
    $('.alignment-descriptions p[class*=' + id + ']').removeClass('hidden');
  });
  
  $('.alignment-misc button').click(function(e){
    e.preventDefault();
    var thisButton = $(this);
    var id = thisButton.attr("id");
    $('.alignment-grid button').removeClass('active');
    $('.alignment-misc button').removeClass('active');
    thisButton.addClass('active');
    $('.alignment-descriptions p').addClass('hidden');
    $('.alignment-descriptions div').addClass('hidden');
    $('.alignment-descriptions div[class*=' + id + ']').removeClass('hidden');
  });
  
  $('.collapsable-trigger').click(function() {
    $('.collapsable').slideToggle();
    var symbol = $('.collapsable-trigger span');
    if(symbol.hasClass('glyphicon-chevron-down'))
    {
      symbol.removeClass('glyphicon-chevron-down');
      symbol.addClass('glyphicon-chevron-left');
    }
    else
    {
      symbol.addClass('glyphicon-chevron-down');
      symbol.removeClass('glyphicon-chevron-left');
    }
  });
});

function getAbilityModifier(score) {
  var mod;
  mod = Math.floor((score - 10) / 2);
  return mod;
}

function setAbilityModifier(ability)
{
  var score = $('.input-number[name="' + ability + '-input"]').val();
  $('#' + ability + '-mod').html(getAbilityModifier(score));
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