import { defaultModal } from '../global/modal';

export default function(context) {
	if($('.ob-video-btn').length > 0){
		$('.ob-video-btn').on('click touch', function(e){
			e.preventDefault();

			let video = context.videos.featured;

			let embedCode = `
				<div class="ob-product-video-modal">
					<iframe src="https://www.youtube.com/embed/${video.id}" title="YouTube video player" frameborder="0" 
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
			`;
			const modal = defaultModal();
        	modal.open();
        	modal.updateContent(embedCode, { wrap: true });
		})
	}
}