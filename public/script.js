








$(document).ready(function() { 
						   
var alterClass = function() {
    var ww = document.body.clientWidth;
    if (ww < 800) {
      $('body').addClass('mobile');
    } else if (ww >= 801) {
      $('body').removeClass('mobile');
    };
  };
  $(window).resize(function(){
    alterClass();
  });
  //Fire it when the page first loads:
  alterClass();				   
						   
						   
$(".menu-bar").click(function(){
    $(".nav .navigation-menu, .overlay").toggle(500);
	$('body').css('overflow', 'hidden');
});

$(".navigation-menu .fa-times, .mobile .navigation-menu ul li a").click(function(){
    $(".nav div.navigation-menu, .overlay").toggle(500);
	$('body').css('overflow-y', 'visible');
});


 $(".collapse.show").each(function () {
    $(this)
      .prev(".card-header")
      .find(".fa")
      .addClass("fa-minus")
      .removeClass("fa-plus");
  });

  // Toggle plus minus icon on show hide of collapse element
  $(".collapse")
    .on("show.bs.collapse", function () {
      $(this)
        .prev(".card-header")
        .find(".fa")
        .removeClass("fa-plus")
        .addClass("fa-minus");
    })
    .on("hide.bs.collapse", function () {
      $(this)
        .prev(".card-header")
        .find(".fa")
        .removeClass("fa-minus")
        .addClass("fa-plus");
    });




})

//(function($) {
//    var $window = $(window),
//        $html = $('html');
//
//    function resize() {
//        if ($window.width() < 800) {
//            return $html.addClass('mobile');
//        }
//
//        $html.removeClass('mobile');
//    }
//
//    $window
//        .resize(resize)
//        .trigger('resize');
//})(jQuery);