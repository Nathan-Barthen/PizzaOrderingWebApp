/*Used for itemPage.html
 * Used for the mainOptions div. Used in the lightNoramlExtra Div.
 * 		-Removed the selected option from the list by adding a line-through
 * 		 and changing 'Remove' text to 'Add' so the user can add it back if needed.
 *
*/
  
 //Add a line-through to mainOption-lightNormalExtra text and changed the 'Remove' option text to 'Add'
	//Also allow the user to reclick the text and remove the line-through
  	function addRemoveListeners() {
		const removeIngredientTexts = document.querySelectorAll("#removeIngredientText");
	
		removeIngredientTexts.forEach((removeText) => {
			//If it is not a dropdown.
		  removeText.addEventListener("click", () => {
			 if (removeText.closest("#lightNormalExtra")) {
			    const parentDiv = removeText.closest("#lightNormalExtra");
			    const ingredientNameDiv = parentDiv.querySelector("#ingredientName");
			    const amountDiv = parentDiv.querySelector("#amountDiv");
			    const toppPriceText = parentDiv.querySelector('#toppPriceText');
			    
			    if (removeText.textContent === "Add") {
			      ingredientNameDiv.style.textDecoration = "none";
			      amountDiv.style.textDecoration = "none";
			      toppPriceText.style.textDecoration = 'none';
			      removeText.textContent = "Remove";
			    } 
			    else {
			      ingredientNameDiv.style.textDecoration = "line-through";
			      amountDiv.style.textDecoration = "line-through";
			      toppPriceText.style.textDecoration = 'line-through';
			      removeText.textContent = "Add";
			      console.log("Default - Remove");
			      
			    }
			 }
			 //If it is a dropdown
			 else {
		        const dropdownParentDiv = removeText.closest("#addonOptions-dropdownContainer");
		      
		        const dropdownLabelName = dropdownParentDiv.querySelector("#dropdownLabelName");
		        const selectedOption = dropdownParentDiv.querySelector("#selectedOption");
		        const amountDropdownDiv = dropdownParentDiv.querySelector("#amountDiv");
		        const toppPriceText = dropdownParentDiv.querySelector('#toppPriceText');
		        
		        if (removeText.textContent === "Add") {
		          dropdownLabelName.style.textDecoration = "none";
		          selectedOption.style.textDecoration = "none";
		          amountDropdownDiv.style.textDecoration = "none";
		          toppPriceText.style.textDecoration = 'none';
		          removeText.textContent = "Remove";
		          
		        } 
		        else {
		          dropdownLabelName.style.textDecoration = "line-through";
		          selectedOption.style.textDecoration = "line-through";
		          amountDropdownDiv.style.textDecoration = "line-through";
		          toppPriceText.style.textDecoration = 'line-through';
		          removeText.textContent = "Add";
		        }
			 }
		    
		  });
		});
  	
	//On page load for edit item page. Add line through main option toppings that have been removed.
		window.addEventListener('load', () => {
			 var mainOptionsDivs2 = document.querySelector('#mainOptions');
			 var mainOptionsDivsNormalExtraDivs = mainOptionsDivs2.querySelectorAll('#lightNormalExtra');
			 mainOptionsDivsNormalExtraDivs.forEach(div => {
				    var ingredientNameDiv = div.querySelector('#ingredientName');
				    var amountDiv = div.querySelector('#amountDiv');
				    var sideOfPizzaDiv = div.querySelector('#sideOfPizzaDiv');
				    var removeIngredientText = div.querySelector('#removeIngredientText');
				    var toppPriceText = div.querySelector('#toppPriceText');
				    if( removeIngredientText.textContent == 'Add'){
					    ingredientNameDiv.style.textDecoration = 'line-through';
					    amountDiv.style.textDecoration = 'line-through';
					    sideOfPizzaDiv.style.textDecoration = 'line-through';
					    toppPriceText.style.textDecoration = 'line-through';
					    removeIngredientText.textContent = 'Add';
				    }
				    
			  });
		});
	//On page load, remove all add-ons by adding line-through and changing 'Remove' to 'Add'
		window.addEventListener('load', () => {
			  const addOnsExtraDiv = document.querySelector('#add-ons_Extra');
			  const addOnLightNormalExtraDivs = addOnsExtraDiv.querySelectorAll('#lightNormalExtra');
			  let updateItemIdElement = document.getElementById('updateItemId');
			 
			  addOnLightNormalExtraDivs.forEach(div => {
				    const ingredientNameDiv = div.querySelector('#ingredientName');
				    const amountDiv = div.querySelector('#amountDiv');
				    const sideOfPizzaDiv = div.querySelector('#sideOfPizzaDiv');
				    const removeIngredientText = div.querySelector('#removeIngredientText');
				    const toppPriceText = div.querySelector('#toppPriceText');
				    if( removeIngredientText.textContent == 'Add' || updateItemIdElement == null){
					    ingredientNameDiv.style.textDecoration = 'line-through';
					    amountDiv.style.textDecoration = 'line-through';
					    sideOfPizzaDiv.style.textDecoration = 'line-through';
					    toppPriceText.style.textDecoration = 'line-through';
					    removeIngredientText.textContent = 'Add';
				    }
				    
				    
			  });
			  
			//For the dropdown toppings
			  const addonDropdownDivs = addOnsExtraDiv.querySelectorAll('#addonOptions-dropdownContainer');
			  addonDropdownDivs.forEach(div => {
				    const ingredientNameDiv = div.querySelector('#dropdownLabelName');
				    const amountDiv = div.querySelector('#amountDiv');
				    const selectedOptionDiv = div.querySelector('#selectedOption');
				    const removeIngredientText = div.querySelector('#removeIngredientText');
				    const toppPriceText = div.querySelector('#toppPriceText');
				    if( removeIngredientText.textContent == 'Add' || updateItemIdElement == null){
					    ingredientNameDiv.style.textDecoration = 'line-through';
					    amountDiv.style.textDecoration = 'line-through';
					    toppPriceText.style.textDecoration = 'line-through';
					    removeIngredientText.textContent = 'Add';
				    }
			  });
			  
		});
  
  	}
  
  