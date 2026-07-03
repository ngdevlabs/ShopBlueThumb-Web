export default function initHoverSwap() {
    const preloaded = new Set();

    const preloadImage = (src) => {
        if (!src || preloaded.has(src)) return;

        const img = new Image();
        img.src = src;
        preloaded.add(src);
    };

    document.querySelectorAll('.js-hover-swap').forEach((container) => {
        const img = container.querySelector('.card-image, img');
        const mainImage = container.dataset.mainImage;
        const mainSrcset = container.dataset.mainSrcset;
        const hoverImage = container.dataset.hoverImage;
        const hoverSrcset = container.dataset.hoverSrcset;

        if (!img || !mainImage || !hoverImage) return;

        preloadImage(hoverImage);

        container.addEventListener('mouseenter', () => {
            img.src = hoverImage;

            if (hoverSrcset) {
                img.srcset = hoverSrcset;
            } else {
                img.removeAttribute('srcset');
            }
        });

        container.addEventListener('mouseleave', () => {
            img.src = mainImage;

            if (mainSrcset) {
                img.srcset = mainSrcset;
            } else {
                img.removeAttribute('srcset');
            }
        });
    });
}