/*Used for chackoutPage.html.
 * When the user clicks on the the (X) button at the top right of an item in their cart.
 *    It will remove the item from the cart, but redirecting to a page, removing the item, 
 *      and then returning to the checkoutPage.html.
 *  
*/

	const removeButton = document.getElementById('cartRemoveItem');
	const itemId = document.getElementById('hiddenItemId').textContent.trim();
	
	removeButton.addEventListener('click', () => {
	  window.location.href = `/pizzaStore/removeItemFromCart/${itemId}`;
	});

  