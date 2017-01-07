(function($, exports) {

  $(document).ready(function() {
    $('.collapsible-header').siblings().hide()
    $('.collapsible-header').click(function() {
      $(this).siblings().slideToggle()
    })
  })

})(jQuery, window)
