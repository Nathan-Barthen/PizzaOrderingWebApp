/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the Wedgie category div
	const wedgieCategory = document.getElementById('wedgieText');
	
	// Get a reference to the hidden div for Wedgie items
	const hiddenWedgieDiv = document.getElementById('hiddenWedgie');
	
	// If category is clicked, show hidden div (dropdown menu)
	wedgieCategory.addEventListener('click', () => {
	  hiddenWedgieDiv.classList.toggle('show');
	});
	
	// If user clicks outside of the dropdown menu, hide dropdown.
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	  const wedgie = document.getElementById('wedgieText');
	  const isClickedOutsideWedgie = !wedgie.contains(clickedElement);
	  const isClickedOutsideHidden = !hiddenWedgieDiv.contains(clickedElement);
	
	  if (hiddenWedgieDiv.classList.contains('show')) {
	    if (isClickedOutsideHidden && isClickedOutsideWedgie) {
	      hiddenWedgieDiv.classList.remove('show');
	    }
	  }
	});
