export default function(scopeSelector) {
    function slickActions(event, slick) {
        if($('.ob-mobile').is(':hidden') && $('.ob-next-image', scopeSelector).length > 0) {
            let $currentSlide = parseInt($('.productView-image.slick-current', scopeSelector).data('slick-index'));
            let $nextSlide = $currentSlide + 1;
            let $nextImage = $(`.productView-image[data-slick-index="${$nextSlide}"] img`, scopeSelector).attr('src');

            if($nextImage) {
                $('.ob-next-image img', scopeSelector).attr('src', $nextImage);
                $('.ob-next-image', scopeSelector).css('visibility', 'visible');
            } else {
                $('.ob-next-image', scopeSelector).css('visibility', 'hidden');
            }

            $('.ob-next-image', scopeSelector).on('click', function(e) {
                slick.slickNext();
            });
        }
    }
    
    const $carousel = $('.ob-image-main-carousel:not(.slick-initialized)', scopeSelector);
    const $miniNav = $('.ob-image-carousel-nav .mini-nav:not(.slick-initialized)', scopeSelector);

    $carousel.on('afterChange', function(event, slick) {
        slickActions(event, slick);
    });
    $carousel.on('init', function(event, slick) {
        slickActions(event, slick);
    });

    $carousel.slick({
        "arrows": true,
        "dots": false,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "autoplay": false,
        "lazyLoad": "anticipated",
        "asNavFor": `${scopeSelector} .ob-image-carousel-nav .mini-nav`,
        "infinite": false,
        "useTransform": false
    });
    $miniNav.slick({
        "arrows": false,
        "dots": true,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "autoplay": false,
        "asNavFor": `${scopeSelector} .ob-image-main-carousel`,
        "infinite": false
    });
}