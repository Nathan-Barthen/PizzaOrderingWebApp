  
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
	  var costExtra = parseFloat(topping.querySelector("#additionalCostExtra").textContent);
	  costExtra = costExtra.toFixed(2);
	  
	  var obj = {
	    toppingName: topping.querySelector("#toppingName").textContent,
	    toppingType: topping.querySelector("#toppingType").textContent,
	    isPizza: topping.querySelector("#isPizza").textContent,
	    selectedToppOption: topping.querySelector("#selectedToppOption").textContent,
	    selectedToppAmount: topping.querySelector("#selectedToppAmount").textContent,
	    sideOfPizza: topping.querySelector("#sideOfPizza").textContent,
	    toppingOptions: Array.from(topping.querySelectorAll("#toppingOptions")).map(function(opt) {
	      return opt.textContent;
	    }),
	    additionalCostExtra: costExtra
	  };
	  toppings.push(obj);
	});
	
	var htmlText = "";
	if(toppings.length >= 1){
		htmlText +=  "<div id=\"mainOption-toppings\">" + 
   				 "	<div id=\"mainOption-toppingsTitleDiv\"><span id=\"mainOption-toppingsTitle\">Included</span></div>";
	}
	else {
		htmlText +=  "<div id=\"mainOption-toppings\">" + 
			 "	<div id=\"mainOption-toppingsTitleDiv\"><span id=\"mainOption-toppingsTitle\"></span></div>";
	}
	//Iterate over array and save html code.
	
	for (var i = 0; i < toppings.length; i++) {
	  var topping = toppings[i];
	  //If topping requires a dropdown box
	  if(topping.toppingType == "dropdown"){
		  var zindex = (toppings.length + 5) - i;
		  htmlText += "<div id=\"mainOptions-dropdownContainer\"> <label id=\"dropdownLabelName\">" 
		      + topping.toppingName + ": </label>" +
		           "<div class=\"dropdown\" style=\"z-index:" + zindex + "\"> <div id=\"selectedOption\">"+ topping.selectedToppOption +"</div> <ul class=\"dropdown-menu\">";
		  
		  for (var j = 0; j < topping.toppingOptions.length; j++) {
		    var option = topping.toppingOptions[j];
		    htmlText += "<li><a href=\"#\">" + option + "</a></li>";
		  }
		  
		  htmlText += "</ul> </div>" + "<div id=\"amountDiv\">";
		  
		  if(topping.selectedToppAmount == "Light"){
			  htmlText += 	"<div id=\"light\"> <span id=\"lightText\" style=\"background-color: rgb(255, 133, 77);\">Light</span> </div>" +
							"<div id=\"normal\"> <span id=\"normalText\" style=\"background-color: rgb(255, 238, 230);\">Normal</span> </div>" +
							"<div id=\"extra\"> <span id=\"extraText\">Extra</span> </div>";
		  }
		  else if(topping.selectedToppAmount == "Extra") {
			  htmlText += 	"<div id=\"light\"> <span id=\"lightText\">Light</span> </div>" +
							"<div id=\"normal\"> <span id=\"normalText\" style=\"background-color: rgb(255, 238, 230);\">Normal</span> </div>" +
							"<div id=\"extra\"> <span id=\"extraText\" style=\"background-color: rgb(255, 133, 77);\">Extra</span> </div>";
		  }
		  else {
	  		htmlText += "<div id=\"light\"> <span id=\"lightText\">Light</span> </div>" +
						"<div id=\"normal\"> <span id=\"normalText\">Normal</span> </div>" +
						"<div id=\"extra\"> <span id=\"extraText\" >Extra</span> </div>";
		  }
		   					
		  htmlText += "</div>";
		  if(topping.selectedToppAmount == "Extra"){
			  htmlText += "<div id=\"toppPriceDiv\" class=\"dropdownToppPrice\"> <span id=\"toppPriceText\"> + $" + topping.additionalCostExtra + "</span> </div> </div>";
		  }
		  else {
			  htmlText += "<div id=\"toppPriceDiv\" class=\"dropdownToppPrice\"> <span id=\"toppPriceText\" style=\"display:none\"> + $" + topping.additionalCostExtra + "</span> </div> </div>";
		  }
		  
	  }
	  
	  //If topping is default (no dropdown box)
	  else if(topping.toppingType == "default"){
		  htmlText += "<div id=\"lightNormalExtra\">" +
				"<div id=\"ingredientName\">" + topping.toppingName + ": </div>" +
				"<div id=\"amountDiv\">";
		  if(topping.selectedToppAmount == "Light"){
			  htmlText += 	"<div id=\"light\"> <span id=\"lightText\" style=\"background-color: rgb(255, 133, 77);\">Light</span> </div>" +
							"<div id=\"normal\"> <span id=\"normalText\" style=\"background-color: rgb(255, 238, 230);\">Normal</span> </div>" +
							"<div id=\"extra\"> <span id=\"extraText\">Extra</span> </div>";
		  }
		  else if(topping.selectedToppAmount == "Extra") {
			  htmlText += 	"<div id=\"light\"> <span id=\"lightText\">Light</span> </div>" +
							"<div id=\"normal\"> <span id=\"normalText\" style=\"background-color: rgb(255, 238, 230);\">Normal</span> </div>" +
							"<div id=\"extra\"> <span id=\"extraText\" style=\"background-color: rgb(255, 133, 77);\">Extra</span> </div>";
		  }
		  else {
	  		htmlText += "<div id=\"light\"> <span id=\"lightText\">Light</span> </div>" +
						"<div id=\"normal\"> <span id=\"normalText\">Normal</span> </div>" +
						"<div id=\"extra\"> <span id=\"extraText\" >Extra</span> </div>";
		  }
		   					
		  htmlText +=		 "</div>";
		  //If toppings is for a pizza
		  if(topping.isPizza == "true"){
			  htmlText += "<div id=\"sideOfPizzaDiv\">";
			  if(topping.sideOfPizza == "Left"){
				  htmlText += 	"<div id=\"leftSide\"><span id=\"leftSideText\" style=\"background-image: conic-gradient(from 0deg, rgb(191, 191, 191) 50%, rgb(255, 133, 77) 50%);\"></span></div>" + 
			 					"<div id=\"wholeSide\"><span id=\"wholeSideText\" style=\"background-image: conic-gradient(from 0deg, rgb(255, 238, 230) 50%, rgb(255, 238, 230) 50%);\"></span></div>" +
			   					"<div id=\"rightSide\"><span id=\"rightSideText\"></span></div>" ;
			  }
			  else if(topping.sideOfPizza == "Right") {
				  htmlText += 	"<div id=\"leftSide\"><span id=\"leftSideText\"></span></div>" + 
			 					"<div id=\"wholeSide\"><span id=\"wholeSideText\" style=\"background-image: conic-gradient(from 0deg, rgb(255, 238, 230) 50%, rgb(255, 238, 230) 50%);\"></span></div>" +
			   					"<div id=\"rightSide\"><span id=\"rightSideText\" style=\"background-image: conic-gradient(from 0deg, rgb(255, 133, 77) 50%, rgb(191, 191, 191) 50%);\"></span></div>" ;
			  }
			  else {
		  		htmlText += "<div id=\"leftSide\"><span id=\"leftSideText\"></span></div>" + 
							"<div id=\"wholeSide\"><span id=\"wholeSideText\"></span></div>" +
		   					"<div id=\"rightSide\"><span id=\"rightSideText\"></span></div>" ;
			  }
			   					
			  htmlText += "</div>";
		  }
		  if(topping.selectedToppAmount == "Extra"){
			  htmlText += "<div id=\"toppPriceDiv\" class=\"dropdownToppPrice\"> <span id=\"toppPriceText\"> + $" + topping.additionalCostExtra + "</span> </div>";
		  }
		  else {
			  htmlText += "<div id=\"toppPriceDiv\" class=\"dropdownToppPrice\"> <span id=\"toppPriceText\" style=\"display:none\"> + $" + topping.additionalCostExtra + "</span> </div>";
		  }
		  
		  if(topping.selectedToppAmount == "None"){ 
			  htmlText += "<div id=\"removeIngredient\"> <span id=\"removeIngredientText\">Add</span> </div> </div>";
		  }
		  else {
			  htmlText += "<div id=\"removeIngredient\"> <span id=\"removeIngredientText\">Remove</span> </div> </div>";
		  }
		  
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
	  	addUpdateForCosts();
	  	addSelectedOptionListeners();
	  	addUpdateSelOptListeners();
	  	
	
	  	


  