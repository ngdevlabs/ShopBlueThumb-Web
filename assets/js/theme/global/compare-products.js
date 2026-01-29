import { showAlertModal } from './modal';

function decrementCounter(counter, item) {
    const index = counter.indexOf(item);

    if (index > -1) {
        counter.splice(index, 1);
    }
}

function incrementCounter(counter, item) {
    counter.push(item);
}

function updateCounterNav(counter, $link, urls) {
    $link.attr('href', `${urls.compare}/${counter.join('/')}`);

    // Enable Compare button when table count hits 2 or more
    if(counter.length >= 2){
        $link.attr('disabled',false);
    } else {
        $link.attr('disabled',true);
    }
    // Disable all unselected products Compare checkbox when table count hits 4 items
    if(counter.length >= 4) {
        $('.card-compare .form-checkbox:not(:checked)').attr('disabled',true);
    } else {
        $('.card-compare .form-checkbox:not(:checked)').attr('disabled',false);
    }

    $('.compare-button .selected-count').html(`(${counter.length} selected)`);

    buildCompareList(counter);
}

function buildCompareList(compareCounter) {
    const count = compareCounter.length;
    let code = '<div class="compare-instruction">Select 2 to 4 items to compare</div>';

    const fillers = 4 - count;

    $.each(compareCounter, function(i, id){
        const image = $(`.card[data-product-id="${id}"] .card-img-container`).html();
        code += `
            <div class="product-cube" data-product-id="${id}">
                <span class="clear-cube">
                    <svg><use xlink:href="#icon-close"></use></svg>
                </span>
                <div class="image-wrap">${image}</div>
            </div>
        `;
        if((i+1) !== 4){
            code += '<span class="compare-add">+</span>';
        }
    })

    if(fillers > 0){
        for (let c = 1; c <= fillers; c++) {
            code += `
                <div class="product-cube cube-empty">
                    <span class="clear-cube">
                        <svg><use xlink:href="#icon-close"></use></svg>
                    </span>
                    <div class="image-wrap"></div>
                </div>
            `;
            if(c !== fillers){
                code += '<span class="compare-add">+</span>';
            }
        }
    }

    $('.compare-products-preview').html(code);
}

export default function ({ noCompareMessage, urls }) {
    let compareCounter = [];

    const $compareLink = $('a[data-compare-nav]');

    $('body').on('compareReset', () => {
        const $checked = $('body').find('input[name="products\[\]"]:checked');

        compareCounter = $checked.length ? $checked.map((index, element) => element.value).get() : [];
        updateCounterNav(compareCounter, $compareLink, urls);

        $('.product-cube').each(function(){
            $(this).find('.image-wrap').html('');
            $(this).addClass('cube-empty');
            $(this).removeAttr('data-product-id');
        });
    });
    $('body').triggerHandler('compareReset');

    $('body').on('change', '[data-compare-id]', event => {
        const product = event.currentTarget.value;

        if (event.currentTarget.checked) {
            incrementCounter(compareCounter, product);
        } else {
            decrementCounter(compareCounter, product);
        }

        updateCounterNav(compareCounter, $compareLink, urls);
    });

    $('body').on('click', '.clear-cube', (e) => {
        let id = $(e.currentTarget).parent().data('product-id');
        $(`.card[data-product-id="${id}"] .card-compare input`).click();
    });

    $('body').on('click', 'a[data-compare-nav]', () => {
        const $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');

        if ($clickedCheckedInput.length <= 1) {
            showAlertModal(noCompareMessage);
            return false;
        }
    });
}
