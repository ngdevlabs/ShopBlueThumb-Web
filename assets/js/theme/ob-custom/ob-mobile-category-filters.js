export default function() {
	$('.ob-product-actions-box .ob-filter-btn').on('click touch', function(e){
		e.preventDefault();

		$('.facetedSearch.sidebarBlock').slideToggle();
	})

	$('.ob-product-actions-box .ob-sort-btn').on('click touch', function(e){
		e.preventDefault();

		$('.ob-product-listing-top .product-sort-wrap').slideToggle();
	})
}