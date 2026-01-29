export default function() {
	if($('.ob-subcategory-carousel').length > 0){
		$('.ob-subcategory-carousel .carousel-wrap').slick({
			slidesToShow: 2.4,
			slidesToScroll: 2,
			arrows: false,
			dots: false,
			infinite: false,
			mobileFirst: true,
			swipeToSlide: true,
			responsive: [
			   	{
				  	breakpoint: 767,
				  	settings: {
				    	slidesToShow: 4.4
				  	}
				},
				{
				  	breakpoint: 1023,
				  	settings: {
				    	slidesToShow: 6,
				    	arrows: true
				  	}
				}
			]
		})
	}
}