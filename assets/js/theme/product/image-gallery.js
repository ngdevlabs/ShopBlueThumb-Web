import 'easyzoom';

/**
 * obundle customized Image Gallery
 */
export default class ImageGallery {
    constructor($gallery) {
        this.$mainImage = $gallery.find('[data-image-gallery-main]');
        this.$mainImageNested = $gallery.find('[data-main-image]');
        this.$thumbnails = $gallery.find('[data-image-gallery-item]');
        this.currentImage = {};
    }

    init() {
        this.bindEvents();
        this.setImageZoom();
    }

    setMainImage(imgObj) {
        this.currentImage = { ...imgObj };

        this.setActiveThumb();
        this.swapMainImage();
    }

    /**
     * Change main image when variant is selected
     */
    setAlternateImage(imgObj) {
        if (!this.savedImage) {
            this.savedImage = {
                mainImageUrl: this.$mainImage.find('img').attr('src'),
                zoomImageUrl: this.$mainImage.attr('data-zoom-image'),
                mainImageSrcset: this.$mainImage.find('img').attr('srcset'),
                $selectedThumb: this.currentImage.$selectedThumb,
            };
        }
        this.setMainImage(imgObj);
    }

    restoreImage() {
        if (this.savedImage) {
            this.setMainImage(this.savedImage);
            delete this.savedImage;
        }
    }

    /**
     * Handle thumbnail click event
     */
    handleThumbnailClick(e) {
        e.preventDefault();
        const $clickedThumbnail = $(e.currentTarget);

        this.$thumbnails.removeClass('is-active');
        $clickedThumbnail.addClass('is-active');
    }

    setActiveThumb() {
        this.$thumbnails.removeClass('is-active');
        if (this.currentImage.$selectedThumb) {
            this.currentImage.$selectedThumb.addClass('is-active');
        }
    }

    /**
     * Listen for thumbnail carousel beforeChange event.
     * Ensures the active thumbnail is set correctly when the main carousel changes
     */
    handleMainCarouselChange(e, slick, currentSlide, nextSlide) {
        this.$thumbnails.removeClass('is-active');
        this.$thumbnails.eq(nextSlide).addClass('is-active');
    }

    swapMainImage() {
        const isBrowserIE = navigator.userAgent.includes('Trident');

        this.easyzoom
            .data('easyZoom')
            .swap(
                this.currentImage.mainImageUrl,
                this.currentImage.zoomImageUrl,
                this.currentImage.mainImageSrcset
            );

        this.$mainImage.attr({
            'data-zoom-image': this.currentImage.zoomImageUrl,
        });
        this.$mainImageNested.attr({
            alt: this.currentImage.mainImageAlt,
            // Don't do this: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#the_title_attribute
            // title: this.currentImage.mainImageAlt,
        });

        if (isBrowserIE) {
            const fallbackStylesIE = {
                'background-image': `url(${this.currentImage.mainImageUrl})`,
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                'background-origin': 'content-box',
                'background-size': 'contain',
            };

            this.$mainImageNested.css(fallbackStylesIE);
        }
    }

    checkImage() {
        const $imageContainer = $('.productView-image');
        const containerHeight = $imageContainer.height();
        const containerWidth = $imageContainer.width();

        const $image = this.easyzoom.data('easyZoom').$zoom;
        const height = $image.height();
        const width = $image.width();

        if (height < containerHeight || width < containerWidth) {
            this.easyzoom.data('easyZoom').hide();
        }
    }

    setImageZoom() {
        this.easyzoom = this.$mainImage.easyZoom({
            onShow: () => this.checkImage(),
            errorNotice: '',
            loadingNotice: '',
        });
    }

    bindEvents() {
        this.$thumbnails.on('click', this.handleThumbnailClick.bind(this));

        $('.ob-image-main-carousel').on(
            'beforeChange',
            this.handleMainCarouselChange.bind(this)
        );
    }
}
