/*Used for all pages in the top bar.
 * When the user clicks on the 'Checkout' box it will take them to the checkout page (/pizzaStore/checkout)
 *  
*/

	const checkoutDiv = document.getElementById('checkout');
	
	checkoutDiv.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/checkout';
	});
	
	
	//User mouses over Checkout - change background color
	checkoutDiv.addEventListener('mouseover', function() {
	    this.style.backgroundColor = 'rgb(0, 0, 230)';
	  });
	checkoutDiv.addEventListener('mouseout', function() {
	    this.style.backgroundColor = 'rgb(0, 57, 230)';
	  });
	
	
	//Payment page go back to checkout button
	const paymentCheckoutDiv = document.getElementById('paymentCheckout');
	
	paymentCheckoutDiv.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/checkout';
	});
	
	
	//User mouses over Checkout - change background color
	paymentCheckoutDiv.addEventListener('mouseover', function() {
	    this.style.backgroundColor = 'rgb(255, 214, 51)';
	  });
	paymentCheckoutDiv.addEventListener('mouseout', function() {
	    this.style.backgroundColor = 'rgb(255, 224, 102)';
	  });