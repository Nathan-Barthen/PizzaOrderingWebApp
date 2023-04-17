  
 /* Used for adminAddItemPage.html
  * 
 *  Used for the ADDON toppings. 
 *  	This will add the html for a topping if the [ + ] box is clicked.
 *  
*/


	const addAddonToppingDiv = document.querySelector("#addAddonToppingDiv");
	let toppingAddonCount = 0;
	
	const addAddonTopping = document.querySelector("#addAddonTopping");

	//IF the [+] is clicked created the div for the topping, and append div above the [+]
	addAddonTopping.addEventListener("click", function() {
	  toppingCount++;
	  const newToppingRow = document.createElement("div");
	  newToppingRow.id = "addItemToppingRow";
	  newToppingRow.innerHTML = `
	  
			
	  	<div id="add-topping-title" class="addItemToppingCol">	
		  <div id="add-toppingTitle">
		    <span id="add-toppingTitleSpan">Topping</span> -
		  </div>
		</div>
		
		<div id="add-topping-name" class="addItemToppingCol">
		  <div id="add-toppingName">
		    <span id="addItemToppingParamTitle"> Name: </span>
		    <input type="text" class="toppingNameValue" name="addonToppingsName[${toppingAddonCount - 1}]" placeholder="Name">
		  </div>
		  <div id="checkToppingName">
		    <span id="emptyText"></span>
		    <div class="errorMessages" id="toppingNameErrorMessages"></div>
		  </div>
		</div>	
		
		<div id="add-topping-type" class="addItemToppingCol">	
		  <div id="add-toppingType">
		    <span id="addItemToppingParamTitle"> Type: </span>
		    <div class="dropdown" id="typeDropdown">
		      <div id="typeSelectedOption">default</div>
		      <ul class="dropdown-menu" id="type-dropdown-menu">
		        <li><a href="#">dropdown</a></li>
		      </ul>
		    </div>
		  </div>
		  <input type="hidden" value="default" class="toppingTypeValue" name="addonToppingsToppingType[${toppingAddonCount - 1}]" id="toppingTypeInput">
		  <div id="checkToppingType">
		    <span id="emptyText"></span>
		    <div class="errorMessages" id="toppingTypeErrorMessages"></div>
		  </div>
		</div>
		
		<div id="add-topping-types" class="addItemToppingCol">
		  <div id="add-toppingTypes">
		    <span id="addItemToppingParamTitle"> Types (,): </span>
		    <input type="text" class="toppingTypesValue" name="addonToppingsTypes[${toppingAddonCount - 1}]" >
		  </div>
		  <div id="checkToppingTypes">
		    <span id="emptyText"></span>
		    <div class="errorMessages" id="toppingTypesErrorMessages"></div>
		  </div>
		</div>	
		
		<div id="add-topping-isPizza" class="addItemToppingCol">	
		  <div id="add-isPizza">
		    <span id="addItemToppingParamTitle"> IsPizza: </span>
		    <div class="dropdown" id="isPizzaDropdown">
		      <div id="isPizzaSelectedOption">No</div>
		      <ul class="dropdown-menu" id="isPizza-dropdown-menu">
		        <li><a href="#">Yes</a></li>
		      </ul>
		    </div>
		  </div>
			<input type="hidden" value="No" class="toppingIsPizzaValue" name="addonToppingsIsPizza[${toppingAddonCount - 1}]" id="isPizzaInput">
			<div id="checkisPizza">
			    <span id="emptyText"></span>
			    <div class="errorMessages" id="isPizzaErrorMessages"></div>
			</div>
		</div>
		
		<div id="add-topping-addonPrice" class="addItemToppingCol">
			<div id="add-toppingAddonCost">
			    <span id="addItemToppingParamTitle"> Addon ($): </span>
			    <input type="text" class="toppingAddonValue" name="addonToppingsPrice[${toppingAddonCount - 1}]" placeholder="$0.00">
			</div>
			<div id="checkToppingAddonCost">
			    <span id="emptyText"></span>
			    <div class="errorMessages" id="toppingAddonCostErrorMessages"></div>
			</div>
		</div>	
		
		<div id="add-topping-ExtraPrice" class="addItemToppingCol">
			<div id="add-toppingExtraCost">
			    <span id="addItemToppingParamTitle"> [Extra] ($): </span>
			    <input type="text" class="toppingExtraValue" name="addonToppingsExtra[${toppingAddonCount - 1}]" placeholder="$0.00">
			</div>
			<div id="checkToppingExtraCost">
			    <span id="emptyText"></span>
			    <div class="errorMessages" id="toppingExtraCostErrorMessages"></div>
			</div>
		</div>	
		
		<div id="removeTopping"> - </div>
				
		`;
	
	
		addMainToppingDiv.parentNode.insertBefore(newToppingRow, addAddonToppingDiv);
		initTypeDropdowns();
		initRemoveTopping();
	});
	
	
	
	


  