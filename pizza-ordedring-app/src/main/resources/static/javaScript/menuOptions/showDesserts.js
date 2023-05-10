/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the desserts category div
	const dessertsCategory = document.getElementById('dessertsText');
		
	// Get a reference to the hidden div for desserts
	const hiddenDessertsDiv = document.getElementById('hiddenDesserts');
	
	//If user mouseover the element change background color
	dessertsCategory.addEventListener('mouseover', function() {
	    this.style.backgroundColor = 'rgb(0, 0, 255)';
	  });
	dessertsCategory.addEventListener('mouseout', function() {
	    this.style.backgroundColor = 'rgb(0, 64, 255)';
	  });
	
	
	//If desserts category is clicked, show hidden div (dropdown menu)
	dessertsCategory.addEventListener('click', () => {
	  hiddenDessertsDiv.classList.toggle('show');
	});
	
	//If user clicks outside of the dropdown menu, hide dropdown.
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	  const desserts = document.getElementById('dessertsText');
	  const isClickedOutsideDesserts = !desserts.contains(clickedElement);
	  const isClickedOutsideHidden = !hiddenDessertsDiv.contains(clickedElement);
	
	  if (hiddenDessertsDiv.classList.contains('show')) {
	    if (isClickedOutsideHidden && isClickedOutsideDesserts) {
	      hiddenDessertsDiv.classList.remove('show');
	    }
	  }
	});
