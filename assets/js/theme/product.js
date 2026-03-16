/*
 Import all product specific js
 */
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/utils/form-utils';
import modalFactory from './global/modal';

import obDownloadLinks from './ob-custom/ob-download-links';
import obProductGallerySlider from './ob-custom/ob-product-gallery-slider';
import obProductWishlist from './ob-custom/ob-product-wishlist';
import obProductNextImage from './ob-custom/ob-product-next-image';
import obProductVideo from './ob-custom/ob-product-video';
import obColorsRename from './ob-custom/ob-colors-option-rename';
import obImageZoomGallery from './ob-custom/ob-image-zoom-gallery';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
        this.reviewModal = modalFactory('#modal-review-form')[0];
    }

    onReady() {
        let $theme_settings = this.context.theme_settings;

        obDownloadLinks(this.context);
        obProductWishlist();
        obProductVideo(this.context);
        obColorsRename();
        this.initProductFaq();

        if($theme_settings.theme_type !== 'vogue') {
            //obImageZoomGallery(this.context);
            obProductNextImage('.productView:not(.productView--quickView)');
            obProductGallerySlider('.productView:not(.productView--quickView)');
        }
        
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);
        this.productDetails.setProductVariant();

        videoGallery();

        this.bulkPricingHandler();

        const $reviewForm = classifyForm('.writeReview-form');

        if ($reviewForm.length === 0) return;

        const review = new Review({ $reviewForm });

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
            this.ariaDescribeReviewInputs($reviewForm);
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        this.productReviewHandler();
        this.generateWaterMark();
    }

    ariaDescribeReviewInputs($form) {
        $form.find('[data-input]').each((_, input) => {
            const $input = $(input);
            const msgSpanId = `${$input.attr('name')}-msg`;

            $input.siblings('span').attr('id', msgSpanId);
            $input.attr('aria-describedby', msgSpanId);
        });
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.trigger('click');
        }
    }

    bulkPricingHandler() {
        if (this.url.indexOf('#bulk_pricing') !== -1) {
            this.$bulkPricingLink.trigger('click');
        }
    }

    generateWaterMark() {
        const watermarkText = this.context.ai_watermark_text;

        const slides = document.querySelectorAll('.ob-image-main-carousel .productView-image.slick-slide');

        slides.forEach((slide) => {
            const img = slide.querySelector('img[data-main-image]');
            const container = slide.querySelector('.productView-img-container');

            if (!img || !container) return;

            const alt = img.getAttribute('alt') || '';
            const hasAiMarker = alt.includes('--AI');

            const existing = container.querySelector('.ai-enhanced-watermark');

            if (!hasAiMarker) {
                if (existing) existing.remove();
                return;
            }

            if (existing) return;

            if (hasAiMarker) {
                img.setAttribute("alt", alt.replace(/\s*--AI\s*/g, " ").trim());
            }

            container.style.position = 'relative';

            const watermark = document.createElement('div');
            watermark.className = 'ai-enhanced-watermark';
            watermark.textContent = watermarkText;
            watermark.style.cssText = `
                position: absolute;
                right: 18px;
                bottom: 15px;
                background: rgba(0, 0, 0, 0.65);
                color: white;
                padding: 4px 8px;
                font-size: 12px;
                font-weight: 600;
                border-radius: 4px;
                z-index: 20;
                pointer-events: none;
                line-height: 1;
                white-space: nowrap;
            `;

            container.appendChild(watermark);
            img.setAttribute("alt", alt.replace("--AI", ""));
        });
    }

    initProductFaq() {
    const faqItems = document.querySelectorAll('#product-faq li.faq-item');

    if (!faqItems.length) return;

    faqItems.forEach((item, index) => {
        const question = item.querySelector('h3.faq-question');
        const answer = item.querySelector('p.faq-answer');

        if (!question || !answer) return;
        if (item.querySelector('.faq-trigger')) return;

        const button = document.createElement('button');
        button.className = 'faq-trigger';
        button.type = 'button';
        button.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');

        const answerId = `faq-answer-${index}`;
        answer.setAttribute('id', answerId);
        button.setAttribute('aria-controls', answerId);

        button.innerHTML = `
            <svg class="faq-icon" width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M0 0L0 18.5L10 9.5L0 0Z" fill="#68869A"/>
            </svg>
            <span>${question.innerHTML}</span>
        `;

        question.replaceWith(button);

        if (index === 0) {
            item.classList.add('open');
        }

        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            item.classList.toggle('open');
            button.setAttribute('aria-expanded', String(!isOpen));
        });
    });
    }
}
