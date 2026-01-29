export default function(context) {
	if($('.ob-compare-bar').length) {
		const compareTop = $('.ob-compare-bar').offset().top;

		$(window).scroll(function () {
		  if ($(window).scrollTop() > compareTop) {
		    $('.ob-compare-bar').addClass('sticky');
		  } else {
		  	$('.ob-compare-bar').removeClass('sticky');
		  }
		})
	}
}