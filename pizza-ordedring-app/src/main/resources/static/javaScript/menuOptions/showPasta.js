/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the pasta category div
	const pastaCategory = document.getElementById('pastaText');
	
	// Get a reference to the hidden div
	const hiddenPastaDiv = document.getElementById('hiddenPasta');
	
	// If category is clicked, show hidden div (dropdown menu)
	pastaCategory.addEventListener('click', () => {
	  hiddenPastaDiv.classList.toggle('show');
	});
	
	// If user clicks outside of the dropdown menu, hide dropdown.
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	  const pasta = document.getElementById('pastaText');
	  const isClickedOutsidePasta = !pasta.contains(clickedElement);
	  const isClickedOutsideHidden = !hiddenPastaDiv.contains(clickedElement);
	
	  if (hiddenPastaDiv.classList.contains('show')) {
	    if (isClickedOutsideHidden && isClickedOutsidePasta) {
	      hiddenPastaDiv.classList.remove('show');
	    }
	  }
	});

	
	