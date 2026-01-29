export default function($scope) {
	const $carousel = $('.ob-image-main-carousel:not(.slick-initialized)', $scope);

	if($carousel.length > 0) {
		$carousel.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 150,
			arrows: true,
			dots: true,
			infinite: false,
			mobileFirst: true,
			swipeToSlide: true,
			useTransform: false
		})
	}
}