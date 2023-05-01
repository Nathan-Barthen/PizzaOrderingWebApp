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




