/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the pasta category div
	const pastaCategory = document.getElementById('pastaText');
	
	// Get a reference to the hidden div
	const hiddenPastaDiv = document.getElementById('hiddenPasta');
	
	// Add a click event listener to the pasta category div
	hiddenPastaDiv.style.display = 'none';
	
	// If user clicks on the 'Pasta' div
	pastaCategory.addEventListener('click', () => {
	  // Toggle the visibility of the hidden div
	  if (hiddenPastaDiv.style.display === 'none') {
	    hiddenPastaDiv.style.display = 'flex';
	    hiddenPastaDiv.style.flexDirection = 'column';
	  } 
	  else {
	    hiddenPastaDiv.style.display = 'none';
	  }
	});
	
	// Hide pasta div if user clicks anywhere (other than inside of the div)
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	  const isClickedOutsidePasta = !pastaCategory.contains(clickedElement);
	  const isClickedOutsideHiddenPasta = !hiddenPastaDiv.contains(clickedElement);
	
	  if (hiddenPastaDiv.style.display === 'flex') {
	    if (isClickedOutsidePasta && isClickedOutsideHiddenPasta) {
	      hiddenPastaDiv.style.display = 'none';
	    }
	  }
	});

	
	