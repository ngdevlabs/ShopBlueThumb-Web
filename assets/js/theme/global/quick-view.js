import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import Review from '../product/reviews';
import ProductDetails from '../common/product-details';
import { defaultModal, ModalEvents } from './modal';
import 'slick-carousel';
import { setCarouselState, onSlickCarouselChange, onUserCarouselChange } from '../common/carousel';

import obProductNextImage from '../ob-custom/ob-product-next-image';
import obProductGallerySlider from '../ob-custom/ob-product-gallery-slider';
import obVogueProductGallerySlider from '../ob-custom/ob-vogue-quick-view-slider';

export default function (context) {
    const modal = defaultModal();

    $('body').on('click', '.quickview', event => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('productId');
        const handleDropdownExpand = ({ currentTarget }) => {
            const $dropdownMenu = $(currentTarget);
            const dropdownBtnHeight = $dropdownMenu.prev().outerHeight();

            $dropdownMenu.css('top', dropdownBtnHeight);

            return modal.$modal.one(ModalEvents.close, () => $dropdownMenu.off('opened.fndtn.dropdown', handleDropdownExpand));
        };

        modal.open({ size: 'large' });

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            if (err) return;

            modal.updateContent(response);

            $('#modal .dropdown-menu').on('opened.fndtn.dropdown', handleDropdownExpand);
            modal.$content.find('.productView').addClass('productView--quickView');

            let $theme_settings = context.theme_settings;
            if($theme_settings.theme_type == 'vogue') {
                obVogueProductGallerySlider();
            } else {
                obProductNextImage('.quickView');
                obProductGallerySlider('.quickView');
            }

            /* eslint-disable no-new */
            new Review({ $context: modal.$content });

            return new ProductDetails(modal.$content.find('.quickView'), context);
        });
    });
}

