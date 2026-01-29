export default function() {
	$('.ob-wishlist-action').on('click touch', function(e){
		e.preventDefault();

		$('.productView-options .form-wishlist ul').slideToggle();
	});
}