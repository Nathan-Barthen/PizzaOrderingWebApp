/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the Wings category div
	const wingsCategory = document.getElementById('wingsText');
	
	// Get a reference to the hidden div
	const hiddenWingsDiv = document.getElementById('hiddenWings');
	
	// If Wings category is clicked, show hidden div (dropdown menu)
	wingsCategory.addEventListener('click', () => {
	  hiddenWingsDiv.classList.toggle('show');
	});
	
	// If user clicks outside of the dropdown menu, hide dropdown.
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	  const wings = document.getElementById('wingsText');
	  const isClickedOutsideWings = !wings.contains(clickedElement);
	  const isClickedOutsideHidden = !hiddenWingsDiv.contains(clickedElement);
	
	  if (hiddenWingsDiv.classList.contains('show')) {
	    if (isClickedOutsideHidden && isClickedOutsideWings) {
	      hiddenWingsDiv.classList.remove('show');
	    }
	  }
	});

	