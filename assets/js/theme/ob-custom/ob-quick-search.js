import mediaQueryListFactory from "../common/media-query-list";
import utils from '@bigcommerce/stencil-utils';
import quickSearch from "../global/quick-search";

export default function(context) {
	const mediumMediaQueryList = mediaQueryListFactory('medium');
	const xlargeMediaQueryList = mediaQueryListFactory('xlarge');
	let isDesktop = mediumMediaQueryList.matches;
	let isLargeScreen = xlargeMediaQueryList.matches;

	if (isDesktop) {
		showDesktopSearch();
	} else {
		showMobileSearch();
	}

	if (mediumMediaQueryList && mediumMediaQueryList.addEventListener) {
		mediumMediaQueryList.addEventListener('change', e => {
			isDesktop = e.matches;

			if (isDesktop) {
				showDesktopSearch();
			} else {
				showMobileSearch();
			}
		});
	}
	if (xlargeMediaQueryList && xlargeMediaQueryList.addEventListener) {
		xlargeMediaQueryList.addEventListener('change', e => {
			isLargeScreen = e.matches;
		});
	} 

	function showMobileSearch() {
		const options = {
            template: 'ob-custom/global/ob-quick-search',
        };

		utils.api.getPage('', options, (err, response) => {
	        $('.navPages-quickSearch.ob-desktop').html('');
			$('.navPages-quickSearch.ob-mobile').html(response);

			quickSearch();
	    });
	}

	function showDesktopSearch() {
		const options = {
            template: 'ob-custom/global/ob-quick-search',
        };

		utils.api.getPage('', options, (err, response) => {
	        $('.navPages-quickSearch.ob-mobile').html('');
			$('.navPages-quickSearch.ob-desktop').html(response);

			quickSearch();
	    });
	}
}