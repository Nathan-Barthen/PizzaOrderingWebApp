  
 /* Used for adminAddItemPage.html
 *  Used for the MAIN toppings. 
 *  	This will add the html for a topping if the [ + ] box is clicked.
 *  
 *  Also removed topping(s). This will remove a topping if the [ - ] box is clicked.
*/


	const addMainToppingDiv = document.querySelector("#addMainToppingDiv");
	
	const addMainTopping = document.querySelector("#addMainTopping");

	//IF the [+] is clicked created the div for the topping, and append div above the [+]
	addMainTopping.addEventListener("click", function() {
	  
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
		    <input type="text" class="toppingNameValue" name="mainToppingsName" placeholder="Name">
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
		  <input type="hidden" value="default" class="toppingTypeValue" name="mainToppingsType" id="toppingTypeInput">
		  <div id="checkToppingType">
		    <span id="emptyText"></span>
		    <div class="errorMessages" id="toppingTypeErrorMessages"></div>
		  </div>
		</div>
		
		<div id="add-topping-types" class="addItemToppingCol">
		  <div id="add-toppingTypes">
		    <span id="addItemToppingParamTitle"> Types (,): </span>
		    <input type="text" class="toppingTypesValue" name="mainToppingsTypes" >
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
			<input type="hidden" value="No" class="toppingIsPizzaValue" name="mainToppingsIsPizza" id="isPizzaInput">
			<div id="checkisPizza">
			    <span id="emptyText"></span>
			    <div class="errorMessages" id="isPizzaErrorMessages"></div>
			</div>
		</div>
		
		<div id="add-topping-ExtraPrice" class="addItemToppingCol">
			<div id="add-toppingExtraCost">
			    <span id="addItemToppingParamTitle"> [Extra] ($): </span>
			    <input type="text" class="toppingExtraValue" name="mainToppingsExtra" placeholder="$0.00">
			</div>
			<div id="checkToppingExtraCost">
			    <span id="emptyText"></span>
			    <div class="errorMessages" id="toppingExtraCostErrorMessages"></div>
			</div>
		</div>	
		
		<div id="removeToppingDiv">
			<div id="removeTopping"> - </div>
		</div>
				
		`;
	
	
		addMainToppingDiv.parentNode.insertBefore(newToppingRow, addMainToppingDiv);
		initTypeDropdowns();
		initRemoveTopping();
	});
	
	
	
	//Remove topping when [-] is clicked
	
	function initRemoveTopping() {

		const removeToppingDivs = document.querySelectorAll("#removeTopping");
		
		removeToppingDivs.forEach((removeToppingDiv) => {
		  removeToppingDiv.addEventListener("click", () => {
		    const addItemToppingRow = removeToppingDiv.closest("#addItemToppingRow");
		    	addItemToppingRow.remove();
		  });
		});
	}

		initRemoveTopping();


  