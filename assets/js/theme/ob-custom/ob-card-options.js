import $ from "jquery";
import utils from "@bigcommerce/stencil-utils";

export default function(context) {
	const authToken = context.storefrontAPIToken;
	const getGqlFetch = (token) => ({query, variables}) => fetch('/graphql', {
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/json',
	        Authorization: `Bearer ${token}`,
	    },
	    body: JSON.stringify({
	        query,
	        variables,
	    }),
	}).then((res) => res.json());
	
	let productList = [];
	let validLabels = ['color','colors','colour','colours'];

	function parseOptionData(data){
		if(data.data !== null && data.data !== ''){
			let products = data.data.site.products.edges;
			let variants;

			$.each(products, function(i, product){
				product = product.node;
				let id = product.entityId;
				let options = product.productOptions.edges;

				$.each(options, function(i, option){
					let name = option.node.displayName.toLowerCase();

					if(validLabels.includes(name)){
						variants = option.node.values.select.length;

						if(variants > 1){
							$(`.product .card[data-product-id="${id}"] .more-colors span`).html(variants);
							$(`.product .card[data-product-id="${id}"] .more-colors`).show();
						}
					}
				})
			})
		}
	}

	function queryProducts(idList, token) {
		const gqlFetch = getGqlFetch(token);

		return gqlFetch({
			query: `query ProductsById($productIds: [Int!]) {
		    	site {
				    products(entityIds: $productIds, first: 50) {
				    	edges { node {
		       				entityId
							productOptions {
								edges { node {
									entityId
									displayName
									... on MultipleChoiceOption {
										values {
											select: edges {
												option: node {
													label
												}
											}
										}
									}
								}}
							}
				    	}}
				    }
			  	}
		   	}`,
		   	variables: {
		   		productIds: idList
		   	}
		})
		.then(data => parseOptionData(data))
		.catch(err => console.log(err))
	}

	if($('.body .product .card').length > 0){
		let id;

		$('.product').each(function(){
			id = parseInt($(this).find('.card').attr('data-product-id'));
			productList.push(id);
		})

		queryProducts(productList, authToken);
	}
}