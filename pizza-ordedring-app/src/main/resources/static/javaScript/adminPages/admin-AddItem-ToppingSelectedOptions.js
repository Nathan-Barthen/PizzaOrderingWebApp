  
 /* Used for adminAddItemPage.html
 *  Used for the toppings. This contains dropdown(s) for item specifications. (Ex. default or dropdown AND Yes or No)
 * 		-Changes text of box to reflect the type clicked. 
 * 		-Will change the text in Type: or isPizza: box.
 * 			-For Type: it will toggle the visibility of the Type(s): textbox.
 * 		-It will also change the value inside of the hidden inputs for when form is submitted.
 *  
*/
function initTypeDropdowns() {
	 const typeDropdowns = document.querySelectorAll("#typeDropdown");
	
	 //Loop through each dropdown
	 typeDropdowns.forEach((dropdown) => {
		  const selectedOption1 = dropdown.querySelector("#typeSelectedOption");
		  const dropdownMenu1 = dropdown.querySelector("#type-dropdown-menu");
		  const dropdownOptions1 = dropdownMenu1.querySelectorAll("a");
		  
		  dropdownOptions1.forEach((option1) => {
		    option1.addEventListener("click", (event1) => {
		      event1.preventDefault();
		      selectedOption1.textContent = option1.textContent;
		      
		    //Get add-topping-types to change visibility if 'dropdown' is clicked.
		      const addToppingTypesDiv = selectedOption1.closest("#addItemToppingRow").querySelector("#add-topping-types");
		    //Change the value of the hidden inputs
		      var input = selectedOption1.closest('#add-topping-type').querySelector('input[name="toppingType"]');
		      input.value = selectedOption1.textContent;
		      
		      const liElement = dropdownMenu1.querySelector('a');
				if (selectedOption1.textContent === 'default') {
					liElement.textContent = 'dropdown';
					addToppingTypesDiv.style.visibility = 'hidden';
				}  
				if (selectedOption1.textContent === 'dropdown') {
					liElement.textContent = 'default';
					addToppingTypesDiv.style.visibility = 'visible';
				}
	    });
	  });
	 });
  
 	
 	const isPizzaDropdowns = document.querySelectorAll("#isPizzaDropdown");

 	//Loop through each dropdown
 	isPizzaDropdowns.forEach((dropdown) => {
		  const selectedOption2 = dropdown.querySelector("#isPizzaSelectedOption");
		  const dropdownMenu2 = dropdown.querySelector("#isPizza-dropdown-menu");
		  const dropdownOptions2 = dropdownMenu2.querySelectorAll("a");
		  
		  dropdownOptions2.forEach((option2) => {
		    option2.addEventListener("click", (event2) => {
		      event2.preventDefault();
		      selectedOption2.textContent = option2.textContent;
		      
		    //Change the value of the hidden inputs
		      var input1 = selectedOption2.closest('#add-topping-isPizza').querySelector('input[name="isPizza"]');
		      input1.value = selectedOption2.textContent;
		      
		      const liElement1 = dropdownMenu2.querySelector('a');
				if (selectedOption2.textContent === 'Yes') {
					liElement1.textContent = 'No';
				}  
				if (selectedOption2.textContent === 'No') {
					liElement1.textContent = 'Yes';
				}
    	});
    });
  });
}

initTypeDropdowns();