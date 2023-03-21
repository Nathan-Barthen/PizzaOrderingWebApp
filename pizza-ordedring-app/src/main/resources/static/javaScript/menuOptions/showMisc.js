/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the misc category div
	const miscCategory = document.getElementById('miscText');
		
	// Get a reference to the hidden div for misc
	const hiddenMiscDiv = document.getElementById('hiddenMisc');
	
	//If misc category is clicked, show hidden div (dropdown menu)
	miscCategory.addEventListener('click', () => {
	  hiddenMiscDiv.classList.toggle('show');
	});
	
	//If user clicks outside of the dropdown menu, hide dropdown.
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	  const misc = document.getElementById('miscText');
	  const isClickedOutsideMisc = !misc.contains(clickedElement);
	  const isClickedOutsideHidden = !hiddenMiscDiv.contains(clickedElement);
	
	  if (hiddenMiscDiv.classList.contains('show')) {
	    if (isClickedOutsideHidden && isClickedOutsideMisc) {
	      hiddenMiscDiv.classList.remove('show');
	    }
	  }
	});

	
	