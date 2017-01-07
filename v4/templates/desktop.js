(function($, exports) {

  $(document).ready(function() {
    $('.button-collapse').sideNav()

    // image slider (default timeing: 2000ms)
    var imageSlider = function() {
      $('.carousel.carousel-slider').carousel({
        full_width: true,
        indicators: true
      })  // initialise

      setInterval(function() {
        $('.carousel.carousel-slider').carousel('next')
      }, 2000)

    }
    imageSlider()

    // navigation menu (collapsible)
    const DEFAULT_ANCHOR = '#home'
    var anchors = ['#home', '#location', '#upload', '#hotel', '#contact']

    var activeAnchor = DEFAULT_ANCHOR
    anchors.forEach(function(anchor) {
      if (anchor == activeAnchor) {
        $(anchor).show('slow')
      } else {
        $(anchor).hide()
      }
    })
    $('#menu a').each(function(index) {
      if ($(this).attr('href') == activeAnchor) {
        $(this).parent().addClass('active')
      } else {
        $(this).parent().removeClass('active')
      }
    })


    $('#menu a').click(function(e) {
      e.preventDefault()

      activeAnchor = $(this).attr('href')
      anchors.forEach(function(anchor) {
        if (anchor == activeAnchor) {
          $(anchor).show('slow')
        } else {
          $(anchor).hide()
        }
      })
      $('#menu a').each(function(index) {
        if ($(this).attr('href') == activeAnchor) {
          $(this).parent().addClass('active')
        } else {
          $(this).parent().removeClass('active')
        }
      })
    })

    $(window).scroll(function() {
      $(window).scrollTop() > 200 ?
      $("#rocket").addClass("show") :
      $("#rocket").removeClass("show")
    })
    $("#rocket").click(function() {
      $("#rocket").addClass("launch")
      $("html, body").animate({
        scrollTop: 0
      }, 500, function() {
        $("#rocket").removeClass("show launch")
      })
      return false
    })
  })

})(jQuery, window)
