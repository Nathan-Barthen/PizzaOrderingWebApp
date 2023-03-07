/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the desserts category div
	const dessertsCategory = document.getElementById('dessertsText');
	
	// Get a reference to the hidden div for desserts
	const hiddenDessertsDiv = document.getElementById('hiddenDesserts');
	
	// Hide the hidden div by default
	hiddenDessertsDiv.style.display = 'none';
	
	// Add a click event listener to the desserts category div
	dessertsCategory.addEventListener('click', () => {
	  // Toggle the visibility of the hidden div
	  if (hiddenDessertsDiv.style.display === 'none') {
	    hiddenDessertsDiv.style.display = 'flex';
	    hiddenDessertsDiv.style.flexDirection = 'column';
	  } else {
	    hiddenDessertsDiv.style.display = 'none';
	  }
	});
	
	// Hide the desserts div if the user clicks anywhere outside of it
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	  
	  const isClickedOutsideDesserts = !dessertsCategory.contains(clickedElement);
	  const isClickedOutsideHiddenDesserts = !hiddenDessertsDiv.contains(clickedElement);
	  
	  if (hiddenDessertsDiv.style.display === 'flex') {
	    if (isClickedOutsideDesserts && isClickedOutsideHiddenDesserts) {
	      hiddenDessertsDiv.style.display = 'none';
	    }
	  }
	});
