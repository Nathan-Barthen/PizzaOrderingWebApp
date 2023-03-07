/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the Wedgie category div
	const wedgieCategory = document.getElementById('wedgieText');
	
	// Get a reference to the hidden div for Wedgie items
	const hiddenWedgieDiv = document.getElementById('hiddenWedgie');
	
	// Set initial display of hidden div to none
	hiddenWedgieDiv.style.display = 'none';
	
	// Add a click event listener to the Wedgie category div
	wedgieCategory.addEventListener('click', () => {
	  // Toggle the visibility of the hidden div
	  if (hiddenWedgieDiv.style.display === 'none') {
	    hiddenWedgieDiv.style.display = 'flex';
	    hiddenWedgieDiv.style.flexDirection = 'column';
	  } else {
	    hiddenWedgieDiv.style.display = 'none';
	  }
	});
	
	// Hide Wedgie div if user clicks anywhere outside of it
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	
	  // Check if click was outside of Wedgie category or hidden Wedgie div
	  const isClickedOutsideWedgie = !wedgieCategory.contains(clickedElement);
	  const isClickedOutsideHiddenWedgie = !hiddenWedgieDiv.contains(clickedElement);
	
	  if (hiddenWedgieDiv.style.display === 'flex') {
	    if (isClickedOutsideWedgie && isClickedOutsideHiddenWedgie) {
	      hiddenWedgieDiv.style.display = 'none';
	    }
	  }
	});
