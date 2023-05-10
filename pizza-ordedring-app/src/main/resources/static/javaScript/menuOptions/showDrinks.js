/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the drinks category div
	const drinksCategory = document.getElementById('drinksText');
		
	// Get a reference to the hidden div for drinks
	const hiddenDrinksDiv = document.getElementById('hiddenDrinks');
	
	
	//If user mouseover the element change background color
	drinksCategory.addEventListener('mouseover', function() {
	    this.style.backgroundColor = 'rgb(0, 0, 255)';
	  });
	drinksCategory.addEventListener('mouseout', function() {
	    this.style.backgroundColor = 'rgb(0, 64, 255)';
	  });
	
	//If drinks category is clicked, show hidden div (dropdown menu)
	drinksCategory.addEventListener('click', () => {
	  hiddenDrinksDiv.classList.toggle('show');
	});
	
	//If user clicks outside of the dropdown menu, hide dropdown.
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	  const drinks = document.getElementById('drinksText');
	  const isClickedOutsideDrinks = !drinks.contains(clickedElement);
	  const isClickedOutsideHidden = !hiddenDrinksDiv.contains(clickedElement);
	
	  if (hiddenDrinksDiv.classList.contains('show')) {
	    if (isClickedOutsideHidden && isClickedOutsideDrinks) {
	      hiddenDrinksDiv.classList.remove('show');
	    }
	  }
	});
