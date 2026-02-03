import mediaQueryListFactory from "../common/media-query-list";

export default function (context) {
    let $settings = context.main_settings;
    const mediumMediaQueryList = mediaQueryListFactory('medium');
    let isDesktop = mediumMediaQueryList.matches;

    let menuInit = false;
    let menuOpen = false;

    let openTimer = null;
    let closeTimer = null;

    let $activeItem = null;

    const OPEN_DELAY_FIRST = 400;
    const SWITCH_DELAY = 250;
    const CLOSE_DELAY = 600;
    const SUBMENU_HEIGHT = 450;
    const ANIM_MS = 250;

    if (isDesktop) runMegaMenu();

    if (mediumMediaQueryList && mediumMediaQueryList.addEventListener) {
        mediumMediaQueryList.addEventListener('change', e => {
            isDesktop = e.matches;
            if (isDesktop && !menuInit) runMegaMenu();
        });
    }

    function showOverlay() {
        $('.body .nav-overlay')
            .stop(true, true)
            .css({ display: 'flex' })
            .animate({ opacity: 1 }, ANIM_MS);
    }

    function hideOverlay() {
        $('.body .nav-overlay')
            .stop(true, true)
            .fadeOut(ANIM_MS)
            .css({ opacity: 0 });
    }

    function resolveSubmenu($item) {
        let $submenu = $item.find('.navPage-subMenu').first();
        if ($submenu.length) return $submenu;

        $submenu = $item.children('.navPage-subMenu').first();
        if ($submenu.length) return $submenu;

        return $();
    }

    function openSubmenu($item, $submenu) {
        clearTimeout(closeTimer);
        menuOpen = true;
        $activeItem = $item;

        showOverlay();

        $('.navPage-subMenu')
            .not($submenu)
            .removeClass('is-open')
            .stop(true, true)
            .css({ opacity: 0, height: 0 });

        $submenu
            .addClass('is-open')
            .stop(true, true)
            .animate({ opacity: 1, height: SUBMENU_HEIGHT }, ANIM_MS);
    }

    function closeAllSubmenus() {
        clearTimeout(openTimer);
        clearTimeout(closeTimer);

        $('.navPage-subMenu')
            .removeClass('is-open')
            .stop(true, true)
            .css({ opacity: 0, height: 0 });

        menuOpen = false;
        $activeItem = null;
        hideOverlay();
    }

    function scheduleCloseAll(delay = CLOSE_DELAY) {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
            closeAllSubmenus();
        }, delay);
    }

    function runMegaMenu() {
        menuInit = true;

        const $header = $('.header--bottom');
        const $navList = $header.find('.navPages-list');

        $header.off('.megaFix');
        $navList.off('.megaFix');
        $('.body .nav-overlay').off('.megaFix');
        $(".navPages-action.top--level").off('.megaFix');

        $header.on('mouseenter.megaFix', () => {
            clearTimeout(closeTimer);
        });

        $header.on('mouseenter.megaFix', '.navPages-item, .navPage-subMenu', () => {
            clearTimeout(closeTimer);
        });

        $navList.on('mousemove.megaFix', function (e) {
            if (!menuOpen) return;

            const $t = $(e.target);
            if ($t.closest('.navPages-item').length) return;
            if ($t.closest('.navPage-subMenu').length) return;

            scheduleCloseAll(220);
        });

        $header.on('mouseenter.megaFix', '.navPages-item', function () {
            clearTimeout(closeTimer);
            clearTimeout(openTimer);

            const $item = $(this);
            const hasSubTrigger = $item.find('.has-subMenu, .navPages-action.has-subMenu').length > 0;

            if (!hasSubTrigger) {
                if (menuOpen) scheduleCloseAll(180);
                return;
            }

            const $submenu = resolveSubmenu($item);
            if (!$submenu.length) return;

            if (!menuOpen) {
                openTimer = setTimeout(() => {
                    openSubmenu($item, $submenu);
                }, OPEN_DELAY_FIRST);
                return;
            }

            if ($activeItem && $activeItem.is($item)) return;

            openTimer = setTimeout(() => {
                openSubmenu($item, $submenu);
            }, SWITCH_DELAY);
        });

        $header.on('mouseleave.megaFix', '.navPages-item', function () {
            clearTimeout(openTimer);
        });

        $header.on('mouseenter.megaFix', '.navPage-subMenu', () => {
            clearTimeout(closeTimer);
            clearTimeout(openTimer);
        });

        $header.on('mouseleave.megaFix', '.navPage-subMenu', () => {
            scheduleCloseAll();
        });

        $('.body .nav-overlay')
            .on('mouseenter.megaFix', () => {
                clearTimeout(closeTimer);
                clearTimeout(openTimer);
            })
            .on('mouseleave.megaFix', () => {
                scheduleCloseAll();
            });

        $header.on('mouseleave.megaFix', function (e) {
            const toEl = e.relatedTarget;

            if (toEl && (
                $(toEl).closest('.header--bottom').length ||
                $(toEl).closest('.navPage-subMenu').length ||
                $(toEl).closest('.nav-overlay').length
            )) {
                return;
            }

            scheduleCloseAll();
        });

        $(".navPages-action.top--level").on('touchstart.megaFix click.megaFix', function (e) {
            if (e.type === "click") {
                const newLink = $(e.currentTarget).attr('href');
                window.location.href = newLink;
            }
        });
    }
}