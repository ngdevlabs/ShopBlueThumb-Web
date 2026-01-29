import mediaQueryListFactory from "../common/media-query-list";
import utils from '@bigcommerce/stencil-utils';

export default function(context) {
	let $settings = context.main_settings;
	const mediumMediaQueryList = mediaQueryListFactory('medium');
	let isDesktop = mediumMediaQueryList.matches;
	let menuOpen = false;
	let menuInit = false;
		
	if (isDesktop) {
		runMegaMenu();
	}

	if (mediumMediaQueryList && mediumMediaQueryList.addEventListener) {
		mediumMediaQueryList.addEventListener('change', e => {
			isDesktop = e.matches;
			
			if (isDesktop) {
				if (!menuInit) {
					runMegaMenu();
				}
			}
		});
	}

	function runMegaMenu() {
		menuInit = true;
		$('.header--bottom .navPages-list .navPages-item').each(function(){
			$(this).hover(function(e){
				if($(e.currentTarget).find('.has-subMenu').length > 0){
					let element = $(e.currentTarget).find('.navPage-subMenu');

					if(menuOpen == false){
						$(this).data('timeout', setTimeout(function(){
							menuOpen = true;

							$('.body .nav-overlay').css({
								display:'flex'
							})
							$('.body .nav-overlay').animate({
								opacity: 1
							}, 250);

							element.addClass('is-open');
					      	element.animate({ 
					      		opacity: 1, 
					      		height: 450
					      	}, 250);
					    }, 500));
					} else {
						if(!element.is(':visible')) {
							element.addClass('is-open');
				    	  	element.animate({ 
				    	  		opacity: 1, 
				    	  		height: 450
				    	  	}, 250);
				   	  	}
					}
				} else {
					$('.navPage-subMenu').removeClass('is-open');
					$('.navPage-subMenu').css({
						opacity: 0,
						height: 0
					});
				}
			}, function(e){
				clearTimeout($(this).data('timeout'));

				$('.navPage-subMenu').removeClass('is-open');
				$('.navPage-subMenu').css({
					opacity: 0,
					height: 0
				});
			})
		})

		$('.header--bottom .navPages-list').mouseleave(function(e){
			menuOpen = false;

			$('.body .nav-overlay').fadeOut(250);
			$('.body .nav-overlay').css({
				opacity:0
			})
		})

		$(".navPages-action.top--level").on('touchstart click', function(e) {
            if (e.type == "click") {
                let newLink = $(e.currentTarget).attr('href');

                window.location.href = newLink;
            }
        });
	}
}