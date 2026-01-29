/**
 * Product Page Zoom Gallery
 */

export default function obImageZoomGallery() {
    const zoomModal = $('#zoomModal');

    initZoomGallery({ initialSlideIndex: 0 });

    $('.productView-images .productView-image').on('click', (e) => {
        const $image = $(e.currentTarget);
        const index = $image.data('index');

        zoomModal.fadeIn({
            complete: () => {
                if($('#zoomModal .thumbnails-wrap .thumbnail').length > 1) {
                    slickGoTo(index);
                }
            },
        });
    });
}

function initZoomGallery({ initialSlideIndex = 0 }) {
    if($('#zoomModal .thumbnails-wrap .thumbnail').length > 1) {
        $('#zoomModal .preview-wrap').slick({
            slide: '.slide',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            asNavFor: '#zoomModal .thumbnails-wrap',
            draggable: false,
            infinite: false
        });

        $('#zoomModal .thumbnails-wrap').slick({
            slide: '.thumbnail',
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: initialSlideIndex,
            asNavFor: '#zoomModal .preview-wrap',
            dots: false,
            arrows: false,
            infinite: true,
            mobileFirst: true,
            focusOnSelect: true,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 1023,
                    settings: {
                        slidesToShow: 5,
                        swipeToSlide: false,
                        vertical: true,
                        variableWidth: false,
                        variableHeight: true,
                        arrows: true
                    }
                },
            ],
        });
    } else {
        $('#zoomModal').addClass('single-image');
    }

    $('#zoomModal .modal-content').removeClass('loading');

    $('#zoomModal .zoom-close').on('click', () => {
        $('#zoomModal').fadeOut();
    });
    $('#zoomModal .zoom-overlay').on('click', () => {
        $('#zoomModal').fadeOut();
    });
}

// Show slide corresponding to clicked thumbnail
function slickGoTo(index) {
    $('#zoomModal .thumbnails-wrap').slick('slickGoTo', index, true);
}