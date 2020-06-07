// INIT SLIDER
$(document).ready(function() {
    var slider = $('.alvh-slider');
    var arealSection = $('.arealSection');
    var exhibitSection = $('.exhibitSection');

    arealSection.css('width', slider.width() + 'px');
    exhibitSection.css('width', slider.width() + 'px');


    if ($(window).width() < 1000) {
       console.log('Less than 600');
       arealSection.css('width', 'auto');
       exhibitSection.css('width', 'auto');
       return false;
    }

    var max_height = 0;

    if (arealSection.height() > exhibitSection.height()) {
      max_height = arealSection.height();
    } else {
      max_height = exhibitSection.height();
    }

    slider.css('height', max_height + 'px');

    // Bind dragging events
    drags($('.handle'), $('.resize'), slider);


    setTimeout (function() {

      jQuery.easing.def = 'easeOutQuad';

      // Handle
      $( ".handle" ).animate({
        left: "-=10%",
      }, 600, function() {
        // Animation complete.
            $( ".handle" ).animate({
              left: "+=20%",
            }, 600, function() {

              // Animation complete.
              $( ".handle" ).animate({
                left: "-=10%",
              }, 600, function() {
                // Animation complete.
              });

            });

      });

      // mask
      $( ".resize" ).animate({
        width: "-=10%",
      }, 600, function() {
        // Animation complete.
            $( ".resize" ).animate({
              width: "+=20%",
            }, 600, function() {

              // Animation complete.
              $( ".resize" ).animate({
                width: "-=10%",
              }, 600, function() {
                // Animation complete.
              });

            });

      });

    },
    600);

});

// Update sliders on resize.
$(window).resize(function() {



    var slider = $('.alvh-slider');
    var arealSection = $('.arealSection');
    var exhibitSection = $('.exhibitSection');

    arealSection.css('width', slider.width() + 'px');
    exhibitSection.css('width', slider.width() + 'px');

    if ($(window).width() < 600) {
       console.log('Less than 600');
       arealSection.css('width', 'auto');
       exhibitSection.css('width', 'auto');
       return true
    }

    var max_height = 0;

    if (arealSection.height() > exhibitSection.height()) {
      max_height = arealSection.height();
    } else {
      max_height = exhibitSection.height();
    }

    slider.css('height', max_height + 'px');

    // Bind dragging events
    drags($('.handle'), $('.resize'), slider);


});

function drags(dragElement, resizeElement, container) {

  // Initialize the dragging event on mousedown.
  dragElement.on('mousedown touchstart', function(e) {

    dragElement.addClass('draggable');
    resizeElement.addClass('resizable');

    // Check if it's a mouse or touch event and pass along the correct value
    var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

    // Get the initial position
    var dragWidth = dragElement.outerWidth(),
      posX = dragElement.offset().left + dragWidth - startX,
      containerOffset = container.offset().left,
      containerWidth = container.outerWidth();

    // Set slide limits
    minLeft = containerOffset + 10;
    maxLeft = containerOffset + containerWidth - dragWidth - 10;

    // Calculate the dragging distance on mousemove.
    dragElement.parents().on("mousemove touchmove", function(e) {

      // Check if it's a mouse or touch event and pass along the correct value
      var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

      leftValue = moveX + posX - dragWidth;

      // Prevent going off limits
      if (leftValue < minLeft) {
        leftValue = minLeft;
      } else if (leftValue > maxLeft) {
        leftValue = maxLeft;
      }

      // Translate the handle's left value to masked divs width.
      widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

      // Set the new values for the slider and the handle.
      // Bind mouseup events to stop dragging.
      $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function() {
        $(this).removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      $('.resizable').css('width', widthValue);
    }).on('mouseup touchend touchcancel', function() {
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
    e.preventDefault();
  }).on('mouseup touchend touchcancel', function(e) {
    dragElement.removeClass('draggable');
    resizeElement.removeClass('resizable');
  });
}
