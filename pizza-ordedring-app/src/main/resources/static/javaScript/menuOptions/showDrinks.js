/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the Drinks category
	const drinksCategory = document.getElementById('drinksText');
	
	// Get a reference to the hidden div
	const hiddenDrinksDiv = document.getElementById('hiddenDrinks');
	
	// Add a click event listener to the Drinks category
	hiddenDrinksDiv.style.display = 'none';
	
	// If user clicks on the Drinks category
	drinksCategory.addEventListener('click', () => {
	  // Toggle the visibility of the hidden div
	  if (hiddenDrinksDiv.style.display === 'none') {
	    hiddenDrinksDiv.style.display = 'flex';
	    hiddenDrinksDiv.style.flexDirection = 'column';
	  } else {
	    hiddenDrinksDiv.style.display = 'none';
	  }
	});
	
	// Hide Drinks div if user clicks anywhere (other than inside of the div)
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	
	  const isClickedOutsideDrinks = !drinksCategory.contains(clickedElement);
	  const isClickedOutsideHiddenDrinks = !hiddenDrinksDiv.contains(clickedElement);
	
	  if (hiddenDrinksDiv.style.display === 'flex') {
	    if (isClickedOutsideDrinks && isClickedOutsideHiddenDrinks) {
	      hiddenDrinksDiv.style.display = 'none';
	    } else {
	    }
	  }
	});
