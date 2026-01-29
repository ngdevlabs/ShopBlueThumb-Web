export default function() {
	$('.user-nav-toggle').on('click touch', function(e){
		e.preventDefault();

		$('.account-toggle-container').slideToggle();
	})

	$('.account-toggle-container .account-close').on('click touch', function(e){
		e.preventDefault();

		$('.account-toggle-container').hide();
	})
}