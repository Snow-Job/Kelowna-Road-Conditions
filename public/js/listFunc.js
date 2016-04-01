
/**
 * Loads and initializes the filter checklist
 * @author James Rogers
 */
$(function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {

        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // $widget.css('cursor', 'pointer');
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });


        /**
         * Updates the display based on checked or unchecked state
         * @author James Rogers
         */
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }


        // Initialization
        function initList() {

            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }

            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        initList();

    });

    $('#get-checked-data').on('click', function(event) {
        event.preventDefault();
        var checkedItems = {}, counter = 0;
        $("#check-list-box li.active").each(function(idx, li) {
            checkedItems[counter] = $(li).text();
            counter++;
        });

        //loads the relevant script given checkbox values submitted
        if (checkedItems[0] == "Snow Cleared Paths: No Sub-Layers") {
          console.log("SnoCleared");
          initMap();
          $('.timeFilters').show();
          clearStyling();
        }
        if (checkedItems[0] == "With Current Traffic Layer") {
          console.log("traffic");
          initMap('traffic');
          clearStyling();
        }
        if (checkedItems[0] == "With Bike Path Layer"){
          console.log("bike");
          initMap('bike');
          clearStyling();
        }
    });

    function clearStyling() {
      $('.list-group-item').removeClass('list-group-item-primary').removeClass('active').addClass('disabled').attr('cursor', 'not allowed');
      $('#get-checked-data').removeClass('btn-primary').addClass('btn-danger').html('Clear').attr('onclick', 'clearList()');
      $('.state-icon').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
      $('input[type="checkbox"]').prop('disabled', true);
      // updateDisplay();
    }
});

function timeQuery(range) {

}

function clearList() {
  initMap2();
  console.log("clear");
  $('.list-group-item').removeClass('disabled');
  $('.timeFilters').hide();
  $('#get-checked-data').removeClass('btn-danger').addClass('btn-primary').html('Update').attr('onclick', '');
}
