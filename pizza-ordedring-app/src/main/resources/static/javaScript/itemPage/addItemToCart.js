/*Used for itemPage.html
 * 
 *  Creates a from when addItem is clicked and submits the form to be added to cart.
 *  
*/

	// Get the 'Add Item' box by its ID
	const addItemButton = document.getElementById('addItem');

	// Add a click event listener to the 'Add Item' button
	addItemButton.addEventListener('click', function() {
		var isUserLoggedin = document.getElementById('isUserLoggedin').textContent.trim();
		if(isUserLoggedin == 'true'){
			 submitItem();
		}
		else {
			var notLoggedInDiv = document.getElementById('notLoggedInDiv');
		    notLoggedInDiv.style.display = 'flex'; // Show the hidden div
			
		}
		
	});
	
	// Listener for a click on continueAsGuestSpan
	const continueAsGuestSpan = document.getElementById('continueAsGuestSpan');
	continueAsGuestSpan.addEventListener('click', function() {
	  submitItem();
	});

	// Listener for a click on loginSpan
	const loginSpan = document.getElementById('loginSpan');
	loginSpan.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/signin';
	});
	
	
function submitItem(){
  // Create a new form element
  const myForm = document.createElement('form');
  myForm.method = 'POST';
  
  var itemCatName = document.getElementById('categoryTitle').textContent.trim();
  var pageItemName = document.getElementById('itemName').childNodes[0].textContent.trim();
  //Will be 'true' or 'false'
  var pageUpdateItem = document.getElementById('updateItem').textContent.trim();
  let updateItemIdElement = document.getElementById('updateItemId');
  
  var customInst = document.getElementById('additionalInstructions').value.trim();
  
  var numberElement1 = document.getElementById('numberOfItem');
  let numberOfItem = parseInt(numberElement1.textContent);
  
  myForm.action = '/pizzaStore/addToCart';

  //Item name, category inputs, and custom instructions, and number of item.
  
  var numberOfItemInput = document.createElement('input');
  numberOfItemInput.setAttribute('type', 'hidden');
  numberOfItemInput.setAttribute('name', 'numbertOfItem');
  numberOfItemInput.setAttribute('value', numberOfItem);
  myForm.appendChild(numberOfItemInput);
  
  var itemNameInput = document.createElement('input');
  itemNameInput.setAttribute('type', 'hidden');
  itemNameInput.setAttribute('name', 'itemName');
  itemNameInput.setAttribute('value', pageItemName);
  myForm.appendChild(itemNameInput);
  
  var categoryNameInput = document.createElement('input');
  categoryNameInput.setAttribute('type', 'hidden');
  categoryNameInput.setAttribute('name', 'categoryName');
  categoryNameInput.setAttribute('value', itemCatName);
  myForm.appendChild(categoryNameInput);
  
  var instructionsInput = document.createElement('input');
  instructionsInput.setAttribute('type', 'hidden');
  instructionsInput.setAttribute('name', 'customDesc');
  instructionsInput.setAttribute('value', customInst);
  myForm.appendChild(instructionsInput);
  
  var updateItemInput = document.createElement('input');
  updateItemInput.setAttribute('type', 'hidden');
  updateItemInput.setAttribute('name', 'updateItem');
  updateItemInput.setAttribute('value', pageUpdateItem);
  myForm.appendChild(updateItemInput);
  
  if(updateItemIdElement !== null){
	  let updateItemId = updateItemIdElement.textContent.trim();
	  var updateItemIdInput = document.createElement('input');
	  updateItemIdInput.setAttribute('type', 'hidden');
	  updateItemIdInput.setAttribute('name', 'updateItemId');
	  updateItemIdInput.setAttribute('value', updateItemId);
	  myForm.appendChild(updateItemIdInput);
  }
  
  
  //Create inputs for included toppings.
	  const dropdownContainers = document.querySelectorAll('#mainOptions-dropdownContainer');
	  //loop through Main Options - dropdown containers. Add inputs
	  dropdownContainers.forEach(function(container) {
		    // get label text and remove colon. Get selected Option. Get light,Normal,Extra text.
		    var labelText = container.querySelector('#dropdownLabelName').textContent.replace(':', '');
		    var selectedOption = container.querySelector('#selectedOption').textContent;
		    var lightText = container.querySelector('#lightText');
		    var normalText = container.querySelector('#normalText');
		    var extraText = container.querySelector('#extraText');
		
		    // create input for label text
		    var labelInput = document.createElement('input');
		    labelInput.setAttribute('type', 'hidden');
		    labelInput.setAttribute('name', 'main-drop-dropdownLabelName');
		    labelInput.setAttribute('value', labelText);
		
		    // create input for selected option
		    var optionInput = document.createElement('input');
		    optionInput.setAttribute('type', 'hidden');
		    optionInput.setAttribute('name', 'main-drop-selectedOption');
		    optionInput.setAttribute('value', selectedOption);
		    
		    // Check which amount is selected and create input for selected amount
		    let selectedAmountValue = '';
		    if (window.getComputedStyle(lightText).backgroundColor === 'rgb(255, 133, 77)') {
		      selectedAmountValue = 'Light';
		    } 
		    else if (window.getComputedStyle(normalText).backgroundColor === 'rgb(255, 133, 77)') {
		      selectedAmountValue = 'Normal';
		    } 
		    else if (window.getComputedStyle(extraText).backgroundColor === 'rgb(255, 133, 77)') {
		      selectedAmountValue = 'Extra';
		    }
	        var selectedAmountInput = document.createElement('input');
	        selectedAmountInput.type = 'hidden';
	        selectedAmountInput.name = 'main-drop-selectedAmount';
	        selectedAmountInput.value = selectedAmountValue;
	        
		    
		    // append inputs to form
		    myForm.appendChild(labelInput);
		    myForm.appendChild(optionInput);
		    myForm.appendChild(selectedAmountInput);
	  });
	  
	  
	  const lightNormalExtraDivs = document.querySelectorAll('#mainOptions div#lightNormalExtra');
	
	  //loop through Main Options - lightNormalExtra containers (non dropdowns). Add inputs
	  lightNormalExtraDivs.forEach(function(container) {
		    // get label text and remove colon. Get selected Option. Get light,Normal,Extra text.
		    var labelText = container.querySelector('#ingredientName').textContent.replace(':', '');
		    
		    var pizzaLeft = container.querySelector('#leftSideText');
		    var pizzaWhole = container.querySelector('#wholeSideText');
		    var pizzaRight= container.querySelector('#rightSideText');
		    
		    var lightText = container.querySelector('#lightText');
		    var normalText = container.querySelector('#normalText');
		    var extraText = container.querySelector('#extraText');
		    var removeText = container.querySelector('#removeIngredientText');
		
		    // create input for label text
		    var labelInput = document.createElement('input');
		    labelInput.setAttribute('type', 'hidden');
		    labelInput.setAttribute('name', 'main-lne-toppingName');
		    labelInput.setAttribute('value', labelText);
		
		    //Create input for side of pizza.
		    let sideOfPizza = '';
		    if(pizzaLeft && window.getComputedStyle(pizzaLeft).backgroundImage.includes('rgb(255, 133, 77)')) {
		        sideOfPizza = 'Left';
		    } 
		    else if(pizzaWhole && window.getComputedStyle(pizzaWhole).backgroundImage.includes('rgb(255, 133, 77)')) {
		        sideOfPizza = 'Whole';
		    } 
		    else if(pizzaRight && window.getComputedStyle(pizzaRight).backgroundImage.includes('rgb(255, 133, 77)')) {
		        sideOfPizza = 'Right';
		    }
		    else {
		    	sideOfPizza = 'Not Pizza';
		    }
		    var sideOfPizzaInput = document.createElement('input');
		    sideOfPizzaInput.type = 'hidden';
		    sideOfPizzaInput.name = 'main-lne-sideOfPizza';
		    sideOfPizzaInput.value = sideOfPizza;
		    
		    // Check which amount is selected and create input for selected amount
		    let selectedAmountValue = '';
		    if(removeText.textContent.trim() == "Add"){
		    	selectedAmountValue = "None";
		    }
		    else {
		    	if (window.getComputedStyle(lightText).backgroundColor === 'rgb(255, 133, 77)') {
		    	  selectedAmountValue = 'Light';
		    	} 
		    	else if (window.getComputedStyle(normalText).backgroundColor === 'rgb(255, 133, 77)') {
		    	  selectedAmountValue = 'Normal';
		    	} 
		    	else if (window.getComputedStyle(extraText).backgroundColor === 'rgb(255, 133, 77)') {
		    	  selectedAmountValue = 'Extra';
		    	}
		    } 
	        var selectedAmountInput = document.createElement('input');
	        selectedAmountInput.type = 'hidden';
	        selectedAmountInput.name = 'main-lne-selectedAmount';
	        selectedAmountInput.value = selectedAmountValue;
	        
		    
		    // append inputs to form
		    myForm.appendChild(labelInput);
		    myForm.appendChild(sideOfPizzaInput);
		    myForm.appendChild(selectedAmountInput);
	});
 
		    
	//Create inputs for add-on toppings.
	  const addonDropdownContainers = document.querySelectorAll('#addonOptions-dropdownContainer');
	  //loop through Main Options - dropdown containers. Add inputs
	  addonDropdownContainers.forEach(function(container) {
		    // get label text and remove colon. Get selected Option. Get light,Normal,Extra text.
		    var labelText = container.querySelector('#dropdownLabelName').textContent.replace(':', '');
		    var selectedOption = container.querySelector('#selectedOption').textContent;
		    
		    var lightText = container.querySelector('#lightText');
		    var normalText = container.querySelector('#normalText');
		    var extraText = container.querySelector('#extraText');
		    var removeText = container.querySelector('#removeIngredientText');
		
		    // create input for label text
		    var labelInput = document.createElement('input');
		    labelInput.setAttribute('type', 'hidden');
		    labelInput.setAttribute('name', 'addon-drop-dropdownLabelName');
		    labelInput.setAttribute('value', labelText);
		
		    // create input for selected option
		    var optionInput = document.createElement('input');
		    optionInput.setAttribute('type', 'hidden');
		    optionInput.setAttribute('name', 'addon-drop-selectedOption');
		    optionInput.setAttribute('value', selectedOption);
		    
		    // Check which amount is selected and create input for selected amount
		    let selectedAmountValue = '';
		    if(removeText.textContent.trim() == "Add"){
		    	selectedAmountValue = "None";
		    }
		    else {
		    	if (window.getComputedStyle(lightText).backgroundColor === 'rgb(255, 133, 77)') {
		    	  selectedAmountValue = 'Light';
		    	} 
		    	else if (window.getComputedStyle(normalText).backgroundColor === 'rgb(255, 133, 77)') {
		    	  selectedAmountValue = 'Normal';
		    	} 
		    	else if (window.getComputedStyle(extraText).backgroundColor === 'rgb(255, 133, 77)') {
		    	  selectedAmountValue = 'Extra';
		    	}
		    } 
	        var selectedAmountInput = document.createElement('input');
	        selectedAmountInput.type = 'hidden';
	        selectedAmountInput.name = 'addon-drop-selectedAmount';
	        selectedAmountInput.value = selectedAmountValue;
	        
		    
		    // append inputs to form
		    myForm.appendChild(labelInput);
		    myForm.appendChild(optionInput);
		    myForm.appendChild(selectedAmountInput);
	  });
	  
	  
	  const addonLightNormalExtraDivs = document.querySelectorAll('#add-ons_Extra div#lightNormalExtra');
	
	  //loop through Main Options - lightNormalExtra containers (non dropdowns). Add inputs
	  addonLightNormalExtraDivs.forEach(function(container) {
		    // get label text and remove colon. Get selected Option. Get light,Normal,Extra text.
		    var labelText = container.querySelector('#ingredientName').textContent.replace(':', '');
		    
		    var pizzaLeft = container.querySelector('#leftSideText');
		    var pizzaWhole = container.querySelector('#wholeSideText');
		    var pizzaRight= container.querySelector('#rightSideText');
		    
		    var lightText = container.querySelector('#lightText');
		    var normalText = container.querySelector('#normalText');
		    var extraText = container.querySelector('#extraText');
		    var removeText = container.querySelector('#removeIngredientText');
		
		    // create input for label text
		    var labelInput = document.createElement('input');
		    labelInput.setAttribute('type', 'hidden');
		    labelInput.setAttribute('name', 'addon-lne-toppingName');
		    labelInput.setAttribute('value', labelText);
		
		    //Create input for side of pizza.
		    let sideOfPizza = '';
		    if(pizzaLeft && window.getComputedStyle(pizzaLeft).backgroundImage.includes('rgb(255, 133, 77)')) {
		        sideOfPizza = 'Left';
		    } 
		    else if(pizzaWhole && window.getComputedStyle(pizzaWhole).backgroundImage.includes('rgb(255, 133, 77)')) {
		        sideOfPizza = 'Whole';
		    } 
		    else if(pizzaRight && window.getComputedStyle(pizzaRight).backgroundImage.includes('rgb(255, 133, 77)')) {
		        sideOfPizza = 'Right';
		    }
		    else {
		    	sideOfPizza = 'Not Pizza';
		    }
		    var sideOfPizzaInput = document.createElement('input');
		    sideOfPizzaInput.type = 'hidden';
		    sideOfPizzaInput.name = 'addon-lne-sideOfPizza';
		    sideOfPizzaInput.value = sideOfPizza;
		    
		    // Check which amount is selected and create input for selected amount
		    let selectedAmountValue = '';
		    if(removeText.textContent.trim() == "Add"){
		    	selectedAmountValue = "None";
		    }
		    else {
		    	if (window.getComputedStyle(lightText).backgroundColor === 'rgb(255, 133, 77)') {
		    	  selectedAmountValue = 'Light';
		    	} 
		    	else if (window.getComputedStyle(normalText).backgroundColor === 'rgb(255, 133, 77)') {
		    	  selectedAmountValue = 'Normal';
		    	} 
		    	else if (window.getComputedStyle(extraText).backgroundColor === 'rgb(255, 133, 77)') {
		    	  selectedAmountValue = 'Extra';
		    	}
		    } 
	        var selectedAmountInput = document.createElement('input');
	        selectedAmountInput.type = 'hidden';
	        selectedAmountInput.name = 'addon-lne-selectedAmount';
	        selectedAmountInput.value = selectedAmountValue;
	        
		    
		    // append inputs to form
		    myForm.appendChild(labelInput);
		    myForm.appendChild(sideOfPizzaInput);
		    myForm.appendChild(selectedAmountInput);
	});
  
  

  
  
  // Submit the form
  document.body.appendChild(myForm);
  myForm.submit();

}
