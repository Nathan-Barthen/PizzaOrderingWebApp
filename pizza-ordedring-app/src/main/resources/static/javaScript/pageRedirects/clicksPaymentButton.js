/*Used for all pages in the top bar.
 * When the user clicks on the 'Checkout' box it will take them to the checkout page (/pizzaStore/checkout)
 *  
*/

	const paymentButtonDiv = document.getElementById('paymentButton');
	
	paymentButtonDiv.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/payment/submitOrder';
	});
	
	
	//User mouses over Checkout - change background color
	paymentButtonDiv.addEventListener('mouseover', function() {
	    this.style.backgroundColor = 'rgb(0, 0, 230)';
	  });
	paymentButtonDiv.addEventListener('mouseout', function() {
	    this.style.backgroundColor = 'rgb(0, 57, 230)';
	  });
	