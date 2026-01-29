function initHomepageCarousel(context) {
  let settings = context.theme_settings;
  const $carousel = context.carousel;
  let desktopCarouselImageConfig;

  const $mobileCarouselContainer = $('.ob-hero-container.mobile-carousel');
  const $desktopCarouselContentContainer = $('.ob-hero-container.desktop-carousel .ob-hero-image-container .ob-content-carousel');
  const $desktopCarouselImagetContainer = $('.ob-hero-container.desktop-carousel .ob-hero-image-container .ob-image-carousel');

  const mobileCarouselConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": false,
    "arrows": true,
    "speed": 200,
    "autoplay": true,
    "autoplaySpeed": $carousel.swap_frequency,
    "lazyLoad": "progressive",
    "adaptiveHeight": true
  };
  const desktopCarouselContentConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": false,
    "arrows": false,
    "draggable": false,
    "swipe": false,
    "useTransform": false,
    "speed": 200
  };

  if(settings.theme_type == 'vogue') {
    desktopCarouselImageConfig = {
      "slidesToShow": 1,
      "slidesToScroll": 1,
      "dots": false,
      "arrows": false,
      "draggable": false,
      "swipe": false,
      "useTransform": false,
      "speed": 200,
      "lazyLoad": "progressive"
    }
  } else {
    desktopCarouselImageConfig = {
      "slidesToShow": 1,
      "slidesToScroll": 1,
      "dots": false,
      "arrows": false,
      "draggable": false,
      "swipe": false,
      "useTransform": false,
      "speed": 200,
      "lazyLoad": "progressive"
    }
  }

  $mobileCarouselContainer.slick(mobileCarouselConfig);
  $desktopCarouselContentContainer.slick(desktopCarouselContentConfig);
  $desktopCarouselImagetContainer.slick(desktopCarouselImageConfig)

  $('#carousel-trigger-prev').on('click', prevHomeCarouselSlickSlide);
  $('#carousel-trigger-next').on('click', nextHomeCarouselSlickSlide);

  setInterval(nextHomeCarouselSlickSlide, $carousel.swap_frequency);
}


function nextHomeCarouselSlickSlide() {
  $('.ob-image-carousel').slick('slickNext');
  $('.ob-content-carousel').slick('slickNext');
}

function prevHomeCarouselSlickSlide() {
  $('.ob-image-carousel').slick('slickPrev');
  $('.ob-content-carousel').slick('slickPrev');
}

export { initHomepageCarousel }