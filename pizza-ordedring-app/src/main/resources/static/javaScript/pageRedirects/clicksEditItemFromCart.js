/*Used for chackoutPage.html.
 * When the user clicks on the the [Edit] button at the top left of an item in their cart.
 *    It will allow them to go edit the items options and then return to the checkoutPage.html once done.
 *  
*/

	const editButton = document.getElementById('cartEditItem');
	const itemName1 = document.getElementById('cartItemName').textContent.trim();
	
	editButton.addEventListener('click', () => {
	  window.location.href = `/PizzaStore/edit/${itemName1}`;
	});

  