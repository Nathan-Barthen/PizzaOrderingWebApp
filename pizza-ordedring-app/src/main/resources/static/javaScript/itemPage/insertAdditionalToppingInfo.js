  
 /* Used for itemPage.html
  *
  *  Inserts the html for the main toppings based on topping specifications
  *  
  */

	//Take hidden html and generate topping html.
	//Get main toppings. Array of toppings
	var addToppings = [];
	var hiddenAddToppings = document.querySelectorAll("#hiddenAdditionalToppings");
	
	//Loop through hiddenAddToppings. Store info in addTopping
	hiddenAddToppings.forEach(function(addTopping) {
		  var additionalCostExtra = parseFloat(addTopping.querySelector("#additionalCostExtra").textContent);
		  var additionalCostAddon = parseFloat(addTopping.querySelector("#additionalCostAddon").textContent);
		  
		  // Check if a trailing zero is needed
		  additionalCostExtra = additionalCostExtra.toFixed(2);
		  additionalCostAddon = additionalCostAddon.toFixed(2);

		  var obj = {
		    toppingName: addTopping.querySelector("#toppingName").textContent,
		    toppingType: addTopping.querySelector("#toppingType").textContent,
		    isPizza: addTopping.querySelector("#isPizza").textContent,
		    toppingOptions: Array.from(addTopping.querySelectorAll("#toppingOptions")).map(function(opt) {
		      return opt.textContent;
		    }),
		    additionalCostExtra: additionalCostExtra,
		    additionalCostAddon: additionalCostAddon
		  };
		  addToppings.push(obj);
		});

	
	var htmlAddonText = "";
	if(toppings.length >= 1){
		htmlAddonText +=  "<div id=\"add-ons_Extra-TitleDiv\"><span id=\"add-ons_Extra-Title\">Add-ons (may cost extra)</span></div>";
	}
	else {
		htmlAddonText +=  "<div id=\"add-ons_Extra-TitleDiv\"><span id=\"add-ons_Extra-Title\">  </span></div>";
	}
		
		
	//Iterate over array and save html code.
	
	for (var i = 0; i < addToppings.length; i++) {
	  var topping = addToppings[i];
	  //If topping requires a dropdown box
	  if(topping.toppingType == "dropdown"){
		  var zindex = (toppings.length + 5) - i;
		  htmlAddonText += "<div id=\"addonOptions-dropdownContainer\"> <label id=\"dropdownLabelName\">" 
		      + topping.toppingName + ": </label>" +
		           "<div class=\"dropdown\" style=\"z-index:" + zindex + "\"> <div id=\"selectedOption\">Select</div> <ul class=\"dropdown-menu\">";
		  
		  for (var j = 0; j < topping.toppingOptions.length; j++) {
		    var option = topping.toppingOptions[j];
		    htmlAddonText += "<li><a href=\"#\">" + option + "</a></li>";
		  }
		  
		  htmlAddonText += "</ul> </div>" + "<div id=\"amountDiv\">" +
		   					"<div id=\"light\"> <span id=\"lightText\">Light</span> </div>" +
		   					"<div id=\"normal\"> <span id=\"normalText\">Normal</span> </div>" +
		   					"<div id=\"extra\"> <span id=\"extraText\">Extra</span> </div>" + 
		   			 "</div> ";
		  htmlAddonText += " <div id=\"toppPricesHidden\" style=\"display:none\"> <span id=\"hiddenAddonPrice\">"+topping.additionalCostAddon+"</span> <span id=\"hiddenExtraPrice\">"+ topping.additionalCostExtra + "</span> </div>";
		  htmlAddonText += "<div id=\"toppPriceDiv\" class=\"dropdownToppPrice\"> <span id=\"toppPriceText\"> $"+ topping.additionalCostAddon+ "</span> </div>" + 
			   			 "<div id=\"removeIngredient\" class=\"dropdownAddonRemove\"> <span id=\"removeIngredientText\">Remove</span> </div> </div>";
	  }
	  
	  //If topping is default (no dropdown box)
	  else if(topping.toppingType == "default"){
		  htmlAddonText += "<div id=\"lightNormalExtra\">" +
				"<div id=\"ingredientName\">" + topping.toppingName + ": </div>" +
				"<div id=\"amountDiv\">" + 
					"<div id=\"light\"> <span id=\"lightText\">Light</span> </div>" + 
					"<div id=\"normal\"> <span id=\"normalText\">Normal</span> </div>" +
					"<div id=\"extra\"> <span id=\"extraText\">Extra</span> </div>" +
				"</div>";
		  //If toppings is for a pizza
		  if(topping.isPizza == "true"){
			  htmlAddonText += "<div id=\"sideOfPizzaDiv\">" + 
							"<div id=\"leftSide\"><span id=\"leftSideText\"></span></div>" + 
		   					"<div id=\"wholeSide\"><span id=\"wholeSideText\"></span></div>" +
		   					"<div id=\"rightSide\"><span id=\"rightSideText\"></span></div>" + 
	   				   "</div>";
		  }
		  htmlAddonText += " <div id=\"toppPricesHidden\" style=\"display:none\"> <span id=\"hiddenAddonPrice\">"+topping.additionalCostAddon+"</span> <span id=\"hiddenExtraPrice\">"+ topping.additionalCostExtra + "</span> </div>";
		  htmlAddonText += "<div id=\"toppPriceDiv\"> <span id=\"toppPriceText\"> $"+ topping.additionalCostAddon + "</span> </div>";
		  htmlAddonText += "<div id=\"removeIngredient\"> <span id=\"removeIngredientText\">Remove</span> </div> </div>";
	  }
	  
	}


	htmlAddonText += "</div>";


	//Create div and insert main topping html.
		// Get a reference to the existing div
		const addonOptionsDiv = document.getElementById("add-ons_Extra");
		const addonToppings1 = document.createElement("div");
	  
	  	//CHANGE TO 'mainOptions' LATER
		addonToppings1.id = "addonOptions1";
	  	addonToppings1.innerHTML = htmlAddonText;
	
	
	  	// Insert the new div after the existing div
	  	addonOptionsDiv.insertBefore(addonToppings1, addonOptionsDiv.firstChild);
	  	addRemoveListeners();
	  	addSelectedOptionListeners();
	  	addUpdateSelOptListeners();
	  	addUpdateForAddonCosts();
	
	  	


  