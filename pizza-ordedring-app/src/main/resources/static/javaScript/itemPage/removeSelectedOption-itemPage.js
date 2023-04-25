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
		  removeText.addEventListener("click", () => {
		    const parentDiv = removeText.closest("#lightNormalExtra");
		    console.log(parentDiv);
		
		    const ingredientNameDiv = parentDiv.querySelector("#ingredientName");
		    const amountDiv = parentDiv.querySelector("#amountDiv");
		
		    if (ingredientNameDiv.style.textDecoration === "line-through") {
		      ingredientNameDiv.style.textDecoration = "none";
		      amountDiv.style.textDecoration = "none";
		      removeText.textContent = "Remove";
		    } else {
		      ingredientNameDiv.style.textDecoration = "line-through";
		      amountDiv.style.textDecoration = "line-through";
		      removeText.textContent = "Add";
		    }
		  });
		});
  	}
  
	//On page load, remove all add-ons by adding line-through ahd changing 'Remove' to 'Add'
		window.addEventListener('load', () => {
			  const addOnsExtraDiv = document.querySelector('#add-ons_Extra');
			  const addOnLightNormalExtraDivs = addOnsExtraDiv.querySelectorAll('#lightNormalExtra');
			  addOnLightNormalExtraDivs.forEach(div => {
				    const ingredientNameDiv = div.querySelector('#ingredientName');
				    const amountDiv = div.querySelector('#amountDiv');
				    const sideOfPizzaDiv = div.querySelector('#sideOfPizzaDiv');
				    const removeIngredientText = div.querySelector('#removeIngredientText');
				    ingredientNameDiv.style.textDecoration = 'line-through';
				    amountDiv.style.textDecoration = 'line-through';
				    sideOfPizzaDiv.style.textDecoration = 'line-through';
				    removeIngredientText.textContent = 'Add';
			  });
		});
  

  
  