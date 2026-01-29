export default function(context) {
	let $fields = context.customFields;
	let $downloads = [];

	$.each($fields, function(i, field){
		if(field.name.toLowerCase() == 'download'){
			let title = field.value.split('[[').pop().split(']]')[0];
			let url = field.value.substr(field.value.indexOf(']]') + 2);
			$downloads.push([title, url]);
		}
	})

	if($downloads.length > 0){
		$('.ob-downloads').show();
		
		$.each($downloads, function(i, item){
			$('.ob-downloads .download-list').append(`
				<p><a href="${item[1]}" target="_blank">
					<svg><use xlink:href="#icon-download" /></svg>
					${item[0]}
				</a></p>
			`);
		})
	}
}