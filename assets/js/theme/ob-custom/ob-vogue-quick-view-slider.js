export default function() {
	let $miniCarousel = $('.quickView .productView-thumbnails');
	let $mainCarousel = $('.quickView .ob-image-main-carousel');

	if($mainCarousel.length){
		$miniCarousel.slick({
			"infinite": false,
            "mobileFirst": true,
            "dots": false,
            "arrows": false,
            "accessibility": true,
            "slidesToShow": 5,
            "slidesToScroll": 1,
            "vertical": true,
            "verticalSwiping": true,
            "asNavFor": ".quickView .ob-image-main-carousel",
            "variableHeight": true,
            "focusOnSelect": true
		})

		$mainCarousel.slick({
			"infinite": false,
            "mobileFirst": true,
            "dots": false,
            "arrows": true,
            "accessibility": true,
            "slidesToShow": 1.3,
            "slidesToScroll": 1,
            "asNavFor": ".quickView .productView-thumbnails",
            "responsive": [
                {
                    "breakpoint": 819,
                    "settings": {
                        "slidesToShow": 1
                    }
                }
            ]
		})
	}
}