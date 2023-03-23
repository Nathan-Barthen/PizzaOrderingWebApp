/*Used for all pages in the top bar.
 * When the user clicks on the 'Checkout' box it will take them to the checkout page (/pizzaStore/checkout)
 *  
*/

	const checkoutDiv = document.getElementById('checkout');
	
	checkoutDiv.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/checkout';
	});