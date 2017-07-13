// Code goes here
  var strScore = 8;
  var dexScore = 8;
  var conScore = 8;
  var intScore = 8;
  var wisScore = 8;
  var chaScore = 8;

$(document).ready(function () {
  
  $(".race-select").change(function(){
    var id = $(this).find("option:selected").attr("id");
  
    switch (id){
      case "race-human":
        $('.human-desc').removeClass('hidden');
        $('.elf-desc').addClass('hidden');
        $('.dwarf-desc').addClass('hidden');
        $('.halfling-desc').addClass('hidden');
        break;
      case "race-elf":
        $('.human-desc').addClass('hidden');
        $('.elf-desc').removeClass('hidden');
        $('.dwarf-desc').addClass('hidden');
        $('.halfling-desc').addClass('hidden');
        break;
      case "race-dwarf":
        $('.human-desc').addClass('hidden');
        $('.elf-desc').addClass('hidden');
        $('.dwarf-desc').removeClass('hidden');
        $('.halfling-desc').addClass('hidden');
        break;
      case "race-halfling":
        $('.human-desc').addClass('hidden');
        $('.elf-desc').addClass('hidden');
        $('.dwarf-desc').addClass('hidden');
        $('.halfling-desc').removeClass('hidden');
        break;
      case "race-default":
        $('.human-desc').addClass('hidden');
        $('.elf-desc').addClass('hidden');
        $('.dwarf-desc').addClass('hidden');
        $('.halfling-desc').addClass('hidden');
        break;
    }
  });
  
  $(".class-select").change(function(){
    var id = $(this).find("option:selected").attr("id");
  
    switch (id){
      case "class-fighter":
        $('.fighter-desc').removeClass('hidden');
        $('.cleric-desc').addClass('hidden');
        $('.rogue-desc').addClass('hidden');
        $('.wizard-desc').addClass('hidden');
        break;
      case "class-cleric":
        $('.fighter-desc').addClass('hidden');
        $('.cleric-desc').removeClass('hidden');
        $('.rogue-desc').addClass('hidden');
        $('.wizard-desc').addClass('hidden');
        break;
      case "class-rogue":
        $('.fighter-desc').addClass('hidden');
        $('.cleric-desc').addClass('hidden');
        $('.rogue-desc').removeClass('hidden');
        $('.wizard-desc').addClass('hidden');
        break;
      case "class-wizard":
        $('.fighter-desc').addClass('hidden');
        $('.cleric-desc').addClass('hidden');
        $('.rogue-desc').addClass('hidden');
        $('.wizard-desc').removeClass('hidden');
        break;
      case "class-default":
        $('.fighter-desc').addClass('hidden');
        $('.cleric-desc').addClass('hidden');
        $('.rogue-desc').addClass('hidden');
        $('.wizard-desc').addClass('hidden');
        break;
    }
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

function setAbilityModifier()
{
  var score = $('.input-number[name="str-input"]').val();
  $('#str-mod').html(getAbilityModifier(score));
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