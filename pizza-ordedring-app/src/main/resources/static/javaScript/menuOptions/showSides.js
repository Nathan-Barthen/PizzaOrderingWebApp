/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the operatingHours div
	const sidesCategory = document.getElementById('sidesText');
	
	// Get a reference to the hidden div
	const hiddenSidesDiv = document.getElementById('hiddenSides');
	
	// Add a click event listener to the operatingHours div
	hiddenSidesDiv.style.display = 'none';
	
	
	//If user clicks on the 'Pizzas' div
	sidesCategory.addEventListener('click', () => {
	  // Toggle the visibility of the hidden div
	  if (hiddenSidesDiv.style.display === 'none') {
		  hiddenSidesDiv.style.display = 'flex';
		  hiddenSidesDiv.style.flexDirection = 'column';
	  } 
	  else {
		  hiddenSidesDiv.style.display = 'none';
	  }
	  
	});

	
	
	
	//Hide pizzas div if user clicks anywhere (other than inside of the div)
	document.addEventListener('click', (event) => {
		  const clickedElement = event.target;
		  
		  const isClickedOutsideSides = !sidesCategory.contains(clickedElement);
		  const isClickedOutsideHiddenSides = !hiddenSidesDiv.contains(clickedElement);
		  
		  if(hiddenSidesDiv.style.display === 'flex') {
			  if (isClickedOutsideSides && isClickedOutsideHiddenSides) {
				  hiddenSidesDiv.style.display = 'none';
			  }
			  else {
			  }
		  }
	});
	
	