//holds the type of input the button selection queries
var type;
var range;


function showRoutes(type) {
  this.type = type;
  $('.timeFilters').show();
  $('#'+type).addClass('btn-success');
  $('.get-checked-data:not(#'+type+')').prop('disabled', true);
  $('.timeFilters > .btn-success:not(#'+range+')').prop('disabled', false);
}

function timeQuery(range) {
  this.range = range;
  initMap(type,range);
  $('.timeFilters > .btn-success:not(#'+range+')').prop('disabled', true);
}

function clearMap() {
  $('#'+type).css('background-color', '#4486b1');
  initMap2();
  $('.timeFilters').hide();
  $('.get-checked-data:not(#'+type+')').prop('disabled', false);
  location.reload();
}
