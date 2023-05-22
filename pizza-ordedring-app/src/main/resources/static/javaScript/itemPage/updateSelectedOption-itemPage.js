/*Used for itemPage.html
 * Used for the mainOptions div. This contains dropdown(s) for item specifications. (Ex. Sauce type)
 * 		-Changes text of box to reflect the type clicked. 
 * 		(Ex. When Red Sauce is clicked, the text will change from 'Select Sauce' to 'Red Sauce'.)
 * 
*/
function addUpdateSelOptListeners() {
		var allDropdowns = document.querySelectorAll('.dropdown');
		allDropdowns.forEach((dropdown) => {
			  const selectedOption = dropdown.querySelector("#selectedOption");
			  const dropdownMenu = dropdown.querySelector(".dropdown-menu");
			  const dropdownOptions = dropdownMenu.querySelectorAll("a");
			  
			  dropdownOptions.forEach((option) => {
				    option.addEventListener("click", (event) => {
					      event.preventDefault();
					      selectedOption.textContent = option.textContent;
				    });
			  });
		});

  
}


//Controls dropdown for size selector.
	const sizeSelectedOption = document.getElementById("sizeSelectedOption");
	const sizeDropdownMenu = document.getElementById("sizeDropdown-menu");
	const sizeDropdownOptions = sizeDropdownMenu.querySelectorAll("a");
	var itemCostSpan = document.getElementById("itemCost");
	

	sizeDropdownOptions.forEach((option) => {
		option.addEventListener("click", (event) => {
			      event.preventDefault();
			      sizeSelectedOption.textContent = option.textContent;
			      var sizeCostSpan = option.querySelector("#sizeCostSpan");
			      if (sizeCostSpan) {
			        itemCostSpan.textContent = sizeCostSpan.textContent;
			      }
		});
	});
	    


