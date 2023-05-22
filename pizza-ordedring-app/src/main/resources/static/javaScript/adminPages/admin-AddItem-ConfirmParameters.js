/*Used for adminEditItemPage.html
 * 	Ensures the parameters for item creation is acceptable
 * 
 * 
 *  
*/

  const addOrEditItemForm = document.getElementById('addItemForm');

  addOrEditItemForm.addEventListener('submit', function(event) {
	  
	  //Get item name fields.
	  const itemName = document.getElementsByName('itemName')[0];
	  const itemNameErrorMessages = document.getElementById('itemNameErrorMessages');
	  
	  //Get category name fields.
	  const categoryName = document.getElementsByName('categoryName')[0];
	  const categoryNameErrorMessages = document.getElementById('categoryNameErrorMessages');
	  
	  // Get itemPrice fields
	  const itemPrice = document.getElementsByName('itemPrices')[0];
	  const itemPriceErrorMessages = document.getElementById('itemPriceErrorMessages');
	  
	  // Get itemCosts fields
	  const itemSize = document.getElementsByName('itemSizes')[0];
	  const itemSizeErrorMessages = document.getElementById('itemSizeErrorMessages');
	  
	  //Get itemDescription fields
	  const itemDescription = document.getElementsByName('itemDescription')[0];
	  const itemDescriptionErrorMessages = document.getElementById('itemDescriptionErrorMessages');
	  
	 
 
	  
	  
	  //Check item name
		  //Check if item name is empty
		  if (itemName.value.trim() === '') {
			  itemNameErrorMessages.innerHTML = '*Item name cannot be empty.';
		        event.preventDefault();
		  }
		  else {
			  itemNameErrorMessages.innerHTML = '';
		  }
	  
		  
	  //Check category name
		  //Check if category name is empty
		  if (categoryName.value.trim() === '') {
			  categoryNameErrorMessages.innerHTML = '*Category name cannot be empty.';
		        event.preventDefault();
		    }
		  else {
			  categoryNameErrorMessages.innerHTML = '';
		  }
		  
		 
		// Check item price number
		  const itemPriceRegex = /^(\$?\d+(\.\d{1,2})?(,\s*\$?\d+(\.\d{1,2})?)*)?$/;
		  // If item price is entered
		  console.log("---s"+itemPrice.value.trim() +"--");
		  if(itemPrice.value.trim() ==  ""){
			  console.log("Meep");
			  itemPriceErrorMessages.innerHTML = '*Enter a price.';
			    event.preventDefault();
		  }
		  else if(!itemPriceRegex.test(itemPrice.value)) {
		    itemPriceErrorMessages.innerHTML = '*Please follow the format $0.00 or $0.00, $0.00, ...';
		    event.preventDefault();
		  } 
		  else {
		    itemPriceErrorMessages.innerHTML = '';
		  }

		// Check if item size and price are the same size.
		  const itemSizeValues = itemSize.value.split(',').map(value => value.trim());
		  const itemPriceValues = itemPrice.value.split(',').map(value => value.trim());
		  if (itemSizeValues.length != itemPriceValues.length) {
			  itemPriceErrorMessages.innerHTML = '*Price and Size must contain the same amount of values.';
			  event.preventDefault();
		  }
			  
	 
		//Check item description
		  //Check if item description is empty
		  if (itemDescription.value.trim() === '') {
			  itemDescriptionErrorMessages.innerHTML = '*Item description cannot be empty.';
		        event.preventDefault();
		  }
		  else {
			  itemDescriptionErrorMessages.innerHTML = '';
		  }
		  
	
		  
    //Topping - Checks -----------------------------------------
	  //Check topping Names
		  //Check if topping Name(s) are empty
		  const toppingNames = document.querySelectorAll('.toppingNameValue');

		  toppingNames.forEach((toppingName) => {
		    const nameErrorMessage = toppingName.closest('#addItemToppingRow').querySelector('#toppingNameErrorMessages');
		    if (toppingName.value.trim() === '' || toppingName.value == null) {
		    	nameErrorMessage.textContent = '*Name cannot be empty';
		      event.preventDefault();
		    }
		    else {
		    	nameErrorMessage.textContent = '';
		    }
		  });
     //Check Extra Prices
		  //Chech if price matches correct format.
		  const priceInputs = document.querySelectorAll('.toppingExtraValue');
		  
		  priceInputs.forEach((priceInput) => {
			  const extraValue = priceInput.value.trim();
			  // Regular expression to match currency format ($00.00)
			  const currencyRegex = /^(\$)?\d{1,}\.\d{2}$/;
	
			  // Check if value matches currency format
			  const extraErrorMessage = priceInput.closest('#addItemToppingRow').querySelector('#toppingExtraCostErrorMessages');
			  //If value is valid
			  if (currencyRegex.test(extraValue)) {
				  extraErrorMessage.textContent = '';
			  } 
			  //If value in invalid
			  else {
				  extraErrorMessage.textContent = '*Invalid price.';
				  event.preventDefault();
			  }
			});
		//Check Addon Prices
		  //Chech if price matches correct format.
		  const addonInputs = document.querySelectorAll('.toppingAddonValue');
		  
		  addonInputs.forEach((addonInput) => {
			  const addonValue = addonInput.value.trim();
			  // Regular expression to match currency format ($00.00)
			  const currencyRegex = /^(\$)?\d{1,}\.\d{2}$/;
	
			  // Check if value matches currency format
			  const addonErrorMessage = addonInput.closest('#addItemToppingRow').querySelector('#toppingAddonCostErrorMessages');
			  //If value is valid
			  if (currencyRegex.test(addonValue)) {
				  addonErrorMessage.textContent = '';
			  } 
			  //If value in invalid
			  else {
				  addonErrorMessage.textContent = '*Invalid price.';
				  event.preventDefault();
			  }
			});	  
			
		//Check types if type = 'dropdown'
		  const toppingTypes = document.querySelectorAll('.toppingTypeValue');
		  toppingTypes.forEach((toppingType) => {
			  if(toppingType.value == 'dropdown'){
				  
				  const closestToppingType = toppingType.closest('#addItemToppingRow').querySelector('.toppingTypesValue');
				  const typesErrorMessage = closestToppingType.closest('#addItemToppingRow').querySelector('#toppingTypesErrorMessages');
				    
				   if (closestToppingType.value.trim() === '' || closestToppingType.value == null) {
				    	typesErrorMessage.textContent = '*Types cannot be empty';
				        event.preventDefault();
				   }
				   else {
				    	typesErrorMessage.textContent = '';
				   }
				 
				  
			  }
		 });
		
		
		  
		  
		  
		  
		

  });
