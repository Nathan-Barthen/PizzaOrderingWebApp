/*Used for all pages in the top bar.
 * When the user clicks on the Log-in | Sign-up box it will take them to the login page (/pizzaStore/signin)
 *  
*/

	const pizzaLogo = document.getElementById('pizzaLogo');
	
	pizzaLogo.addEventListener('click', function() {
	  window.location.href = '/';
	});
  