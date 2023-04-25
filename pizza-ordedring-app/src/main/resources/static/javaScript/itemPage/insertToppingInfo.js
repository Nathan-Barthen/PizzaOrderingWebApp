  
 /* Used for itemPage.html
  *
  *  Inserts the html for the main toppings based on topping specifications
  *  
  */

	//Take hidden html and generate topping html.
	//Get main toppings. Array of toppings
	var toppings = [];
	var hiddenToppings = document.querySelectorAll("#hiddenIncludedToppings");
	
	hiddenToppings.forEach(function(topping) {
	  var obj = {
	    toppingName: topping.querySelector("#toppingName").textContent,
	    toppingType: topping.querySelector("#toppingType").textContent,
	    isPizza: topping.querySelector("#isPizza").textContent,
	    toppingOptions: Array.from(topping.querySelectorAll("#toppingOptions")).map(function(opt) {
	      return opt.textContent;
	    }),
	    additionalCostExtra: topping.querySelector("#additionalCostExtra").textContent
	  };
	  toppings.push(obj);
	});
	
	var htmlText = "";
	htmlText +=  "<div id=\"mainOption-toppings\">" + 
   				 "	<div id=\"mainOption-toppingsTitleDiv\"><span id=\"mainOption-toppingsTitle\">Included</span></div>";
	//Iterate over array and save html code.
	
	for (var i = 0; i < toppings.length; i++) {
	  var topping = toppings[i];
	  //If topping requires a dropdown box
	  if(topping.toppingType == "dropdown"){
		  htmlText += "<div id=\"mainOptions-dropdownContainer\"> <label id=\"dropdownLabelName\">" 
			  + topping.toppingName + ": </label>" +
   					"<div class=\"dropdown\"> <div id=\"selectedOption\">Select</div> <ul class=\"dropdown-menu\">";
		  
		  for (var j = 0; j < topping.toppingOptions.length; j++) {
		    var option = topping.toppingOptions[j];
		    htmlText += "<li><a href=\"#\">" + option + "</a></li>";
		  }
		  
		  htmlText += "</ul> </div>" + "<div id=\"amountDiv\">" +
		   					"<div id=\"light\"> <span id=\"lightText\">Light</span> </div>" +
		   					"<div id=\"normal\"> <span id=\"normalText\">Normal</span> </div>" +
		   					"<div id=\"extra\"> <span id=\"extraText\">Extra</span> </div>" + 
		   			 "</div> </div>";
		  
		  
	  }
	  
	  //If topping is default (no dropdown box)
	  else if(topping.toppingType == "default"){
		  htmlText += "<div id=\"lightNormalExtra\">" +
				"<div id=\"ingredientName\">" + topping.toppingName + ": </div>" +
				"<div id=\"amountDiv\">" + 
					"<div id=\"light\"> <span id=\"lightText\">Light</span> </div>" + 
					"<div id=\"normal\"> <span id=\"normalText\">Normal</span> </div>" +
					"<div id=\"extra\"> <span id=\"extraText\">Extra</span> </div>" +
				"</div>";
		  //If toppings is for a pizza
		  if(topping.isPizza == "true"){
			  htmlText += "<div id=\"sideOfPizzaDiv\">" + 
							"<div id=\"leftSide\"><span id=\"leftSideText\"></span></div>" + 
		   					"<div id=\"wholeSide\"><span id=\"wholeSideText\"></span></div>" +
		   					"<div id=\"rightSide\"><span id=\"rightSideText\"></span></div>" + 
	   				   "</div>";
		  }
		  htmlText += "<div id=\"removeIngredient\"> <span id=\"removeIngredientText\">Remove</span> </div> </div>";
	  }
	  
	}


	htmlText += "</div>";


	//Create div and insert main topping html.
		// Get a reference to the existing div
		const mainOptionsDiv = document.getElementById("mainOptions");
		const mainToppings1 = document.createElement("div");
	  
	  	//CHANGE TO 'mainOptions' LATER
	  	mainToppings1.id = "mainOptions1";
	  	mainToppings1.innerHTML = htmlText;
	
	
	  	// Insert the new div after the existing div
	  	mainOptionsDiv.insertBefore(mainToppings1, mainOptionsDiv.firstChild);
	  	addRemoveListeners();
	  	addSelectedOptionListeners();
	  	addUpdateSelOptListeners();
	
	
	  	


  