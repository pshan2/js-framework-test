/*
 * - Navbar Search Input -
 * Expand Search input width upon toggling the Search button
 */
$(document).ready(function(){
  $(".toggle-button").click(function(){
    $(".toggle-reveal__horizontal").animate({width: 'toggle'});
  });
});

/*
 * - Navbar Search Input -
 * Reveal the Search input on wide viewports, hide on small viewports
 */
$(document).ready(function($) {
  var alterClass = function() {
    var ww = document.body.clientWidth;
    if (ww < 767) {
      $('.nav-search').removeClass('toggle-reveal__horizontal');
    } else if (ww >= 768) {
      $('.nav-search').addClass('toggle-reveal__horizontal');
    };
  };
  $(window).resize(function(){
    alterClass();
  });
  //Fire it when the page first loads:
  alterClass();
});
