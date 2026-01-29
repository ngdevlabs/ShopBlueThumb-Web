/**
 * Products Per Page Select Control
 *
 * - Allows setting the number of products to display per page on category and brand pages
 */
export default function ProductsPerPage() {
    const $select = $('.product-count-form select');

    // Do nothing if the select control is not present
	if ($select.length === 0) return;

    // Initialize the select control from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const limit = urlParams.get('limit');

    // Initialize the select control with limit search param value on load
    if (limit > 0) {
        $select.val(limit);
    }

    // Handle select control change event
    // Update the URL query parameter when the select control value changes
    $select.on('change', (e) => {
        e.preventDefault();

        const value = $select.val();

        urlParams.set('limit', value);
        urlParams.set('page', 1);
        window.location.search = urlParams.toString();
    });
}
