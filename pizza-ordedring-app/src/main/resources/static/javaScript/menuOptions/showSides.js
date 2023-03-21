/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the sides category div
	const sidesCategory = document.getElementById('sidesText');
	
	// Get a reference to the hidden div
	const hiddenSidesDiv = document.getElementById('hiddenSides');
	
	// If category is clicked, show hidden div (dropdown menu)
	sidesCategory.addEventListener('click', () => {
	  hiddenSidesDiv.classList.toggle('show');
	});
	
	// If user clicks outside of the dropdown menu, hide dropdown.
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	  const sides = document.getElementById('sidesText');
	  const isClickedOutsideSides = !sides.contains(clickedElement);
	  const isClickedOutsideHidden = !hiddenSidesDiv.contains(clickedElement);
	
	  if (hiddenSidesDiv.classList.contains('show')) {
	    if (isClickedOutsideHidden && isClickedOutsideSides) {
	      hiddenSidesDiv.classList.remove('show');
	    }
	  }
	});
	
	