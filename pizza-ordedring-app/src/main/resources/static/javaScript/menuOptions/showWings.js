/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the Wings category div
	const wingsCategory = document.getElementById('wingsText');
	
	// Get a reference to the hidden div
	const hiddenWingsDiv = document.getElementById('hiddenWings');
	
	// Hide the hidden div by default
	hiddenWingsDiv.style.display = 'none';
	
	// Add a click event listener to the Wings category div
	wingsCategory.addEventListener('click', () => {
	  // Toggle the visibility of the hidden div
	  if (hiddenWingsDiv.style.display === 'none') {
	    hiddenWingsDiv.style.display = 'flex';
	    hiddenWingsDiv.style.flexDirection = 'column';
	  } else {
	    hiddenWingsDiv.style.display = 'none';
	  }
	});
	
	// Hide the Wings category div if user clicks anywhere (other than inside of the div)
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	  
	  const isClickedOutsideWings = !wingsCategory.contains(clickedElement);
	  const isClickedOutsideHiddenWings = !hiddenWingsDiv.contains(clickedElement);
	  
	  if(hiddenWingsDiv.style.display === 'flex') {
	    if (isClickedOutsideWings && isClickedOutsideHiddenWings) {
	      hiddenWingsDiv.style.display = 'none';
	    }
	  }
	});
	