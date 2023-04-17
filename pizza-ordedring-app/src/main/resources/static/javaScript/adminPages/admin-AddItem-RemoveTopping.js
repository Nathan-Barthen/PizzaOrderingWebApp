  
 /* Used for adminAddItemPage.html
 *  Used for the toppings. This will remove a topping if the [ - ] box is clicked.
 *  
 *  Moved to be inside of AddTopping.js
*/

function initRemoveTopping() {

	const removeToppingDivs = document.querySelectorAll("#removeTopping");
	
	removeToppingDivs.forEach((removeToppingDiv) => {
	  removeToppingDiv.addEventListener("click", () => {
	    const addItemToppingRow = removeToppingDiv.closest("#addItemToppingRow");
	    	addItemToppingRow.remove();
	  });
	});
}

	initRemoveTopping();

  