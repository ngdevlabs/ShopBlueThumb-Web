import PageManager from './page-manager';
import ScrollReveal from 'scrollreveal';

import { initHomepageCarousel } from './ob-custom/ob-home-carousel';

export default class HomePage extends PageManager {
    onReady() {

        // We Decided to use image instad a carousel for home page
        //initHomepageCarousel(this.context);

        let slideUp = {
            distance: '15%',
            origin: 'bottom',
            delay: 150,
            opacity: 0
        }
        if($('.ob-home-cta-1').length > 0) {
            ScrollReveal().reveal('.ob-home-cta-1', slideUp);
        }
        if($('.ob-home-cta-2').length > 0) {
            ScrollReveal().reveal('.ob-home-cta-2', slideUp);
        }
        if($('.ob-home-cta-3').length > 0) {
            ScrollReveal().reveal('.ob-home-cta-3', slideUp);
        }
    
        if($('.ob-home-featured-container').length > 0) {
            ScrollReveal().reveal('.ob-home-featured-container', slideUp);
        }
        if($('.ob-home-new-container').length > 0) {
            ScrollReveal().reveal('.ob-home-new-container', slideUp);
        }

        if($('.ob-home-newsletter').length > 0) {
            ScrollReveal().reveal('.ob-home-newsletter', slideUp);
        }
        if($('.ob-home-review-slider').length > 0) {
            ScrollReveal().reveal('.ob-home-review-slider', slideUp);
        }
        if($('.ob-home-promo-container').length > 0) {
            ScrollReveal().reveal('.ob-home-promo-container', slideUp);
        }
        if($('.ob-home-blog-feed').length > 0) {
            ScrollReveal().reveal('.ob-home-blog-feed', slideUp);
        }
    }
}
