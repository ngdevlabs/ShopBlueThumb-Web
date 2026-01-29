import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';
import collapsibleFactory from './common/collapsible';

import obMegaMenu from './ob-custom/ob-mega-menu';
import obAccountMenu from './ob-custom/ob-account-menu';
import obCardOptions from './ob-custom/ob-card-options';
import obQuickSearch from './ob-custom/ob-quick-search';
import obProductsPerPage from './ob-custom/ob-products-per-page';

export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        svgInjector();

        // Init collapsible
        collapsibleFactory();

        obQuickSearch(this.context);
        obMegaMenu(this.context);
        obAccountMenu();
        obCardOptions(this.context);
        obProductsPerPage(this.context);
    }
}
