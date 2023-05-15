/*Used for chackoutPage.html.
 * When the user clicks on the the (X) button at the top right of an item in their cart.
 *    It will remove the item from the cart, but redirecting to a page, removing the item, 
 *      and then returning to the checkoutPage.html.
 *  
*/

	const removeButtonsCheckout = document.querySelectorAll('#cartRemoveItem');
	
	
	removeButtonsCheckout.forEach((removeButton) => {
		console.log("Meep");
		var itemId1 = removeButton.parentElement.querySelector('#hiddenItemId').textContent.trim();
		  
		  removeButton.addEventListener('click', () => {
		    window.location.href = `/pizzaStore/removeItemFromCart/${itemId1}`;
		  });
	});



	
  