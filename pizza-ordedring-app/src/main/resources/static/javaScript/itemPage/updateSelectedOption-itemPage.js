/*Used for itemPage.html
 * Used for the mainOptions div. This contains dropdown(s) for item specifications. (Ex. Sauce type)
 * 		-Changes text of box to reflect the type clicked. 
 * 		(Ex. When Red Sauce is clicked, the text will change from 'Select Sauce' to 'Red Sauce'.)
 *  
*/
function addUpdateSelOptListeners() {
	  const selectedOption = document.querySelector("#selectedOption");
	  const dropdownMenu = document.querySelector(".dropdown-menu");
	  const dropdownOptions = dropdownMenu.querySelectorAll("a");
	  
	  dropdownOptions.forEach((option) => {
	    option.addEventListener("click", (event) => {
	      event.preventDefault();
	      selectedOption.textContent = option.textContent;
	    });
	  });
  
}


//Get all dropdown containers
var dropdownContainers1 = document.querySelectorAll('#mainOptions-dropdownContainer');
// Loop through each dropdown container
dropdownContainers1.forEach(function(dropdownContainer1) {
  // Add event listener for hover
  dropdownContainer1.addEventListener('mouseover', function() {
    // Remove "active" class from all other dropdowns
    dropdownContainers1.forEach(function(otherDropdownContainer) {
      if (otherDropdownContainer !== dropdownContainer1) {
        otherDropdownContainer.querySelector('.dropdown-menu').classList.remove('active');
      }
    });
    // Toggle "active" class on this dropdown
    console.log("Hello" + dropdownContainer1.querySelector('.dropdown-menu').textContent);
    dropdownContainer1.querySelector('.dropdown-menu').classList.toggle('active');
  });
  
  // Add event listener for mouseout to hide the dropdown
  dropdownContainer1.addEventListener('mouseout', function() {
    dropdownContainer1.querySelector('.dropdown-menu').classList.remove('active');
  });
});
