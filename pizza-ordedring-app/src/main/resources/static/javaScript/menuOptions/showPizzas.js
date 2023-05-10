/*
* Javascript to hide / show a category of food 
*    Triggers when clicking category name (ex. 'Pizzas')
*    Reveals a dropdown list of items for said category (Ex. 'Pepperoni Pizza', 'Three Meat Pizza', etc...)
*/

	// Get a reference to the category's div
	const pizzaCategory = document.getElementById('pizzasText');
	const hiddenPizzaDiv = document.getElementById('hiddenPizzas');
	
	//If user mouseover the element change background color
	pizzaCategory.addEventListener('mouseover', function() {
	    this.style.backgroundColor = 'rgb(0, 0, 255)';
	  });
	pizzaCategory.addEventListener('mouseout', function() {
	    this.style.backgroundColor = 'rgb(0, 64, 255)';
	  });
	
	
	//If category is clicked, show hidden div (dropdown menu)
	pizzaCategory.addEventListener('click', () => {
	  hiddenPizzaDiv.classList.toggle('show');
	});
	
	//If user clicks outside of the dropdown menu, hide dropdown.
	document.addEventListener('click', (event) => {
	  const clickedElement = event.target;
	  const pizzas = document.getElementById('pizzasText');
	  const isClickedOutsidePizzas = !pizzas.contains(clickedElement);
	  const isClickedOutsideHidden = !hiddenPizzaDiv.contains(clickedElement);
	
	  if (hiddenPizzaDiv.classList.contains('show')) {
	    if (isClickedOutsideHidden && isClickedOutsidePizzas) {
	      hiddenPizzaDiv.classList.remove('show');
	    }
	  }
	});
	
	
	