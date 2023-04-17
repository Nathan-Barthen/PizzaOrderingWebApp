  
 /* Used for adminAddItemPage.html
 *  Used for the toppings. This contains dropdown(s) for item specifications. (Ex. default or dropdown AND Yes or No)
 * 		-Changes text of box to reflect the type clicked. 
 * 		-Will change the text in Type: or isPizza: box.
 * 			-For Type: it will toggle the visibility of the Type(s): textbox.
 * 		-It will also change the value inside of the hidden inputs for when form is submitted.
 *  
*/
function initTypeDropdowns() {
	var typeDropdowns = document.querySelectorAll("#typeDropdown");
	
	typeDropdowns.forEach((dropdown) => {
	  var selectedOption1 = dropdown.querySelector("#typeSelectedOption");
	  var dropdownMenu1 = dropdown.querySelector("#type-dropdown-menu");
	  var dropdownOptions1 = dropdownMenu1.querySelectorAll("a");

	  // Initialize the state variable to "default"
	  var currentState = "default";
	  
	  dropdownOptions1.forEach((option1) => {
	    option1.addEventListener("click", (event1) => {
	      event1.preventDefault();

	      // Get add-topping-types to change visibility if 'dropdown' is clicked.
	      var addToppingTypesDiv = selectedOption1.closest("#addItemToppingRow").querySelector("#add-topping-types");

	      // Change the value of the hidden inputs
	      var input = selectedOption1.closest('#add-topping-type').querySelector('.toppingTypeValue');

	      input.value = currentState;

	      const liElement = dropdownMenu1.querySelector('a');

	      if (currentState === "default") {
	        selectedOption1.textContent = "dropdown";
	        liElement.textContent = "default";
	        addToppingTypesDiv.style.visibility = "visible";
	        currentState = "dropdown";
	        input.value = "dropdown";
	      } else {
	        selectedOption1.textContent = "default";
	        liElement.textContent = "dropdown";
	        addToppingTypesDiv.style.visibility = "hidden";
	        currentState = "default";
	        input.value = "default";
	      }
	    });
	  });
	});
  
 	
	const isPizzaDropdowns = document.querySelectorAll("#isPizzaDropdown");

	var currentIsPizzaState = 'No';

	//Loop through each dropdown
	isPizzaDropdowns.forEach((dropdown) => {
	    const selectedOption2 = dropdown.querySelector("#isPizzaSelectedOption");
	    const dropdownMenu2 = dropdown.querySelector("#isPizza-dropdown-menu");
	    const dropdownOptions2 = dropdownMenu2.querySelectorAll("a");

	    dropdownOptions2.forEach((option2) => {
	        option2.addEventListener("click", (event2) => {
	            event2.preventDefault();
	            

	            //Change the value of the hidden inputs
	            var input1 = selectedOption2.closest('#add-topping-isPizza').querySelector('.toppingIsPizzaValue');

	            input1.value = currentIsPizzaState;

	            const liElement1 = dropdownMenu2.querySelector('a');
	            
	            if (currentIsPizzaState === 'No') {
	            	selectedOption2.textContent = "No";
	                liElement1.textContent = 'Yes';
	                currentIsPizzaState = 'Yes';
	                input1.value = "No";
	            }
	            else {
	            	selectedOption2.textContent = "Yes";
	                liElement1.textContent = 'No';
	                currentIsPizzaState = 'No';
	                input1.value = "Yes";
	            }
	            
	        });
	    });
	});
	
	
}
