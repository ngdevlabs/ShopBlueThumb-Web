import $ from "jquery";
import utils from "@bigcommerce/stencil-utils";

export default function() {
	const loadingClass = 'is-loading';
	const $cartDropdown = $('#cart-preview-dropdown');
    const $cartLoading = $('<div class="loadingOverlay"></div>');
    const $body = $('body');
    const $cart = $('[data-cart-preview]');

	function updateCart(){
		const options = {
            template: 'common/cart-preview',
        };

		$cartDropdown
            .addClass(loadingClass)
            .html($cartLoading);
        $cartLoading
            .show();

		utils.api.cart.getContent(options, (err, response) => {
            $cartDropdown
                .removeClass(loadingClass)
                .html(response);
            $cartLoading
                .hide();

            deleteItem();

            $('.dropdown-menu .previewCart .close-preview').on('click touch', function(e){
		        e.preventDefault();

		        $cart.click();
		    })
        });
	}

	function deleteItem() {
		$('.previewCartItem').each(function(){
			let that = $(this);

			$(this).on('click touch', '.remove-item', function(e){
				const $cartItem = $(e.currentTarget).parents('.previewCartItem');
                const productId = $cartItem.data('product-id');
                const itemQuantity = parseInt($cartItem.data('quantity'), 10);
                const totalQuantity = parseInt($('.cart-quantity').eq(0).text(), 10) - itemQuantity;

				utils.api.cart.itemRemove(productId, (error, cartResponse) => {
					if(cartResponse){
						updateCart();
						$('body').trigger('cart-quantity-update', totalQuantity);
					} else if(error !== null){
					  	console.log(error);
					}
				});
			})
		})
	}

	function runPreviewUpdate(){
		if($('#cart-preview-dropdown').hasClass('is-open')){
			$('#cart-preview-dropdown').on('click touch', function(e){
				e.stopPropagation();
			})
		}

		$('.dropdown-menu .previewCart .close-preview').on('click touch', function(e){
	        e.preventDefault();

	        $cart.click();
	    })

	    utils.api.cart.getCart({}, (err, response) => {
			if(response){
			  	$('.previewCartAction').prepend(`
			  		<div class="previewCartAction-subtotal">
			  			<strong>Subtotal:</strong>
			  			<span>${response.currency.symbol}${response.cartAmount}</span>
			  		</div>
			  	`);
			} else if(err !== null){
			  	console.log(err);
			}
		})

		deleteItem();
	}
	runPreviewUpdate();
}