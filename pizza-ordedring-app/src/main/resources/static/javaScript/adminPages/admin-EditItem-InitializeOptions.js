  
 /* Used for adminAddItemPage.html
 *  Used for the toppings. 
 *  	-Sets the dropdown or default text for the toppings passed from item.
 *  
*/
function initDropdownOptions() {
	var typeDropdowns1 = document.querySelectorAll("#typeDropdown");
	
	typeDropdowns1.forEach((dropdown) => {
	  var selectedOption2 = dropdown.querySelector("#typeSelectedOption");
	  var dropdownMenu2 = dropdown.querySelector("#type-dropdown-menu");
	  var dropdownOptions2 = dropdownMenu2.querySelectorAll("a");

	  // Initialize the state variable to "default"
	  var currentState = "default";
	  
	  dropdownOptions2.forEach((option1) => {

	      // Get add-topping-types to change visibility if 'dropdown' is clicked.
	      var addToppingTypesDiv = selectedOption2.closest("#addItemToppingRow").querySelector("#add-topping-types");

	      // Change the value of the hidden inputs
	      var input = selectedOption2.closest('#add-topping-type').querySelector('.toppingTypeValue');


	      const liElement1 = dropdownMenu2.querySelector('a');
	      if (option1.text === "default") {
	        selectedOption2.textContent = "dropdown";
	        liElement1.textContent = "default";
	        addToppingTypesDiv.style.visibility = "visible";
	        input.value = "dropdown";
	      } else {
	        selectedOption2.textContent = "default";
	        liElement1.textContent = "dropdown";
	        addToppingTypesDiv.style.visibility = "hidden";
	        input.value = "default";
	      }
	  });
	});
  
 	
	
}