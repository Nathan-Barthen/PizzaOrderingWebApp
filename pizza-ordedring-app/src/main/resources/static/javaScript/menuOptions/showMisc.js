/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the Misc category div
	const miscCategory = document.getElementById('miscText');
	
	// Get a reference to the hidden div
	const hiddenMiscDiv = document.getElementById('hiddenMisc');
	
	// Set the initial state of the hidden div
	hiddenMiscDiv.style.display = 'none';
	
	// Add a click event listener to the Misc category div
	miscCategory.addEventListener('click', () => {
	  // Toggle the visibility of the hidden div
	  if (hiddenMiscDiv.style.display === 'none') {
	    hiddenMiscDiv.style.display = 'flex';
	    hiddenMiscDiv.style.flexDirection = 'column';
	  } else {
	    hiddenMiscDiv.style.display = 'none';
	  }
	});
	
	// Hide Misc category div if user clicks anywhere (other than inside of the div)
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	
	  const isClickedOutsideMisc = !miscCategory.contains(clickedElement);
	  const isClickedOutsideHiddenMisc = !hiddenMiscDiv.contains(clickedElement);
	
	  if (hiddenMiscDiv.style.display === 'flex') {
	    if (isClickedOutsideMisc && isClickedOutsideHiddenMisc) {
	      hiddenMiscDiv.style.display = 'none';
	    }
	  }
	});

	
	