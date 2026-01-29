export default function() {
	if($('[data-product-option-change]').length > 0){
		$('[data-product-option-change] .form-field').each(function(){
			let colorCount;
			let newLabel;
			let optionName = $(this).attr('data-option-name').toLowerCase();
			if(optionName == 'color'){
				colorCount = $(this).find('.form-option-wrapper').length;
				if(colorCount == 1){
					newLabel = `${colorCount} Color Available:`;
				} else {
					newLabel = `${colorCount} Colors Available:`;
				}
				$(this).find('label .base-name').html(newLabel);
			}
		})
	}
}