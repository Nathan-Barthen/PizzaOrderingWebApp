/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the operatingHours div
	const pizzaCategory = document.getElementById('pizzasText');
	
	// Get a reference to the hidden div
	const hiddenPizzaDiv = document.getElementById('hiddenPizzas');
	
	// Add a click event listener to the operatingHours div
	hiddenPizzaDiv.style.display = 'none';
	
	
	//If user clicks on the 'Pizzas' div
	pizzaCategory.addEventListener('click', () => {
	  // Toggle the visibility of the hidden div
	  if (hiddenPizzaDiv.style.display === 'none') {
		  hiddenPizzaDiv.style.display = 'flex';
		  hiddenPizzaDiv.style.flexDirection = 'column';
	  } 
	  else {
		  hiddenPizzaDiv.style.display = 'none';
	  }
	  
	});

	
	
	
	//Hide pizzas div if user clicks anywhere (other than inside of the div)
	document.addEventListener('click', (event) => {
		  const clickedElement = event.target;
		  const pizzas = document.getElementById('pizzasText');
		  
		  const isClickedOutsidePizzas = !pizzas.contains(clickedElement);
		  const isClickedOutsideHidden = !hiddenPizzaDiv.contains(clickedElement);
		  
		  if(hiddenPizzaDiv.style.display === 'flex') {
			  if (isClickedOutsideHidden && isClickedOutsidePizzas) {
				  hiddenPizzaDiv.style.display = 'none';
			  }
			  else {
			  }
		  }
	});
	
	