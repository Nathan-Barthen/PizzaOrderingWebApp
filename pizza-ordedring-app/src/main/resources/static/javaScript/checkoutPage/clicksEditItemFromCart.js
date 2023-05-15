/*Used for chackoutPage.html.
 * When the user clicks on the the [Edit] button at the top left of an item in their cart.
 *    It will allow them to go edit the items options and then return to the checkoutPage.html once done.
 *  
*/

	const editButtons = document.querySelectorAll('#cartEditItem');

	editButtons.forEach((editButton) => {
	  const itemName = editButton.parentElement.querySelector('#cartItemName').textContent.trim();
	  const itemId = editButton.parentElement.querySelector('#hiddenItemId').textContent.trim();
	  
	  editButton.addEventListener('click', () => {
	    window.location.href = `/pizzaStore/editCart/${itemId}/${itemName}`;
	  });
	});


  