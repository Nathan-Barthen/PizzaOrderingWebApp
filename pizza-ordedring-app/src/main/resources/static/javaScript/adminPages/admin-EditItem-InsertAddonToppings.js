  
 /* Used for itemPage.html
  *
  *  Inserts the html for the main toppings based on topping specifications
  *  
  */

	//Take hidden html and generate topping html.
	//Get main toppings. Array of toppings
	var toppings = [];
	var hiddenAddToppings = document.querySelectorAll("#hiddenAdditionalToppings");
	
	hiddenAddToppings.forEach(function(topping) {
		var additionalCostExtra = parseFloat(topping.querySelector("#additionalCostExtra").textContent);
	    var additionalCostAddon = parseFloat(topping.querySelector("#additionalCostAddon").textContent);
	  
	    // Check if a trailing zero is needed
	    additionalCostExtra = additionalCostExtra.toFixed(2);
	    additionalCostAddon = additionalCostAddon.toFixed(2);
	  
	  var obj = {
	    toppingName: topping.querySelector("#toppingName").textContent,
	    toppingType: topping.querySelector("#toppingType").textContent,
	    isPizza: topping.querySelector("#isPizza").textContent,
	    toppingOptions: Array.from(topping.querySelectorAll("#toppingOptions")).map(function(opt) {
	      return opt.textContent;
	    }),
	    additionalCostExtra: additionalCostExtra,
	    additionalCostAddon: additionalCostAddon
	  };
	  toppings.push(obj);
	});
	
	var htmlText = "";
	
	//Iterate over array and save html code.
	
	for (var i = 0; i < toppings.length; i++) {
	  var topping = toppings[i];
	  var yesOrNo = "";
	  var oppositeOfYesOrNo = "";
	  if(topping.isPizza == "true"){
		  yesOrNo = "Yes";
		  oppositeOfYesOrNo = "No";
	  }
	  else {
		  yesOrNo = "No";
		  oppositeOfYesOrNo = "Yes";
	  }
	  
	  htmlText += "<div id=\"addItemToppingRow\">";
	  
	  
	  //If topping requires a dropdown box
	  if(topping.toppingType == "dropdown"){
		  var options = topping.toppingOptions.join(', ');
			
		  htmlText += "<div id=\"add-topping-title\" class=\"addItemToppingCol\">" + 
			   "<div id=\"add-toppingTitle\">" + 
			    "<span id=\"add-toppingTitleSpan\">Topping</span> -" +
			  "</div>" + 
			"</div>" +
			
			"<div id=\"add-topping-name\" class=\"addItemToppingCol\">" + 
			 "<div id=\"add-toppingName\">" +
			    "<span id=\"addItemToppingParamTitle\"> Name: </span>" + 
			    "<input type=\"text\" class=\"toppingNameValue\" value=\"" + topping.toppingName + "\" name=\"addonToppingsName\" placeholder=\"Name\">" + 
			  "</div>" + 
			  "<div id=\"checkToppingName\">" + 
			    "<span id=\"emptyText\"></span>" + 
			    "<div class=\"errorMessages\" id=\"toppingNameErrorMessages\"></div>" + 
			  "</div>" + 
			"</div>" +
			
			"<div id=\"add-topping-type\" class=\"addItemToppingCol\">" + 
			  "<div id=\"add-toppingType\">" + 
			    "<span id=\"addItemToppingParamTitle\"> Type: </span>" + 
			    "<div class=\"dropdown\" id=\"typeDropdown\">" + 
			      "<div id=\"typeSelectedOption\"> dropdown </div>" + 
			      "<ul class=\"dropdown-menu\" id=\"type-dropdown-menu\">" + 
			        "<li><a href=\"#\">default</a></li>" + 
			      "</ul>" + 
			    "</div>" + 
			  "</div>" + 
			  "<input type=\"hidden\" value=\"dropdown\" class=\"toppingTypeValue\" name=\"addonToppingsType\" id=\"toppingTypeInput\">" +
			  "<div id=\"checkToppingType\">" + 
			    "<span id=\"emptyText\"></span>" + 
			    "<div class=\"errorMessages\" id=\"toppingTypeErrorMessages\"></div>" + 
			  "</div>" +
			"</div>" + 
			
			"<div id=\"add-topping-types\" class=\"addItemToppingCol\">" + 
			  "<div id=\"add-toppingTypes\">" + 
			    "<span id=\"addItemToppingParamTitle\"> Types (,): </span>" + 
			    "<input type=\"text\" class=\"toppingTypesValue\" name=\"addonToppingsTypes\" value=\"" +options+ "\">" + 
			  "</div>" + 
			  "<div id=\"checkToppingTypes\">" + 
			    "<span id=\"emptyText\"></span>" + 
			    "<div class=\"errorMessages\" id=\"toppingTypesErrorMessages\"></div>" + 
			  "</div>" + 
			"</div>" + 
			
			"<div id=\"add-topping-isPizza\" class=\"addItemToppingCol\">" + 
			  "<div id=\"add-isPizza\">" + 
			    "<span id=\"addItemToppingParamTitle\"> IsPizza: </span>" + 
			    "<div class=\"dropdown\" id=\"isPizzaDropdown\">" + 
			      "<div id=\"isPizzaSelectedOption\">"+yesOrNo+"</div>" + 
			      "<ul class=\"dropdown-menu\" id=\"isPizza-dropdown-menu\">" + 
			        "<li><a href=\"#\">"+oppositeOfYesOrNo+"</a></li>" + 
			      "</ul>" + 
			    "</div>" + 
			  "</div>" + 
				"<input type=\"hidden\" value=\""+yesOrNo+"\" class=\"toppingIsPizzaValue\" name=\"addonToppingsIsPizza\" id=\"isPizzaInput\">" + 
				"<div id=\"checkisPizza\">" + 
				    "<span id=\"emptyText\"></span>" + 
				    "<div class=\"errorMessages\" id=\"isPizzaErrorMessages\"></div>" + 
				"</div>" + 
			"</div>" +
			"<div id=\"add-topping-addonPrice\" class=\"addItemToppingCol\">" +
				"<div id=\"add-toppingAddonCost\">" + 
				    "<span id=\"addItemToppingParamTitle\"> Addon ($): </span>" + 
				    "<input type=\"text\" class=\"toppingAddonValue\" value=\""+ topping.additionalCostAddon + "\" name=\"addonToppingsPrice\" placeholder=\"$0.00\"> " + 
				"</div>" + 
				"<div id=\"checkToppingAddonCost\">" + 
				    "<span id=\"emptyText\"></span>" + 
				    "<div class=\"errorMessages\" id=\"toppingAddonCostErrorMessages\"></div>" + 
				"</div>" + 
			"</div>"	+
			"<div id=\"add-topping-ExtraPrice\" class=\"addItemToppingCol\">" + 
				"<div id=\"add-toppingExtraCost\">" + 
				    "<span id=\"addItemToppingParamTitle\"> [Extra] ($): </span>" + 
				    "<input type=\"text\" class=\"toppingExtraValue\" value=\""+ topping.additionalCostExtra+"\" name=\"addonToppingsExtra\" placeholder=\"$0.00\">" + 
				"</div>" + 
				"<div id=\"checkToppingExtraCost\">" + 
				    "<span id=\"emptyText\"></span>" + 
				    "<div class=\"errorMessages\" id=\"toppingExtraCostErrorMessages\"></div>" + 
				"</div>" + 
			"</div>" + 
			
			 
			"<div id=\"removeTopping\"> - </div>";
			;
		  
	  }
	  
	  //If topping is default (no dropdown box)
	  else if(topping.toppingType == "default"){
		  htmlText += "<div id=\"add-topping-title\" class=\"addItemToppingCol\">" + 
		   "<div id=\"add-toppingTitle\">" + 
		    "<span id=\"add-toppingTitleSpan\">Topping</span> -" +
		  "</div>" + 
		"</div>" +
		
		"<div id=\"add-topping-name\" class=\"addItemToppingCol\">" + 
		 "<div id=\"add-toppingName\">" +
		    "<span id=\"addItemToppingParamTitle\"> Name: </span>" + 
		    "<input type=\"text\" class=\"toppingNameValue\" value=\"" + topping.toppingName + "\" name=\"addonToppingsName\" placeholder=\"Name\">" + 
		  "</div>" + 
		  "<div id=\"checkToppingName\">" + 
		    "<span id=\"emptyText\"></span>" + 
		    "<div class=\"errorMessages\" id=\"toppingNameErrorMessages\"></div>" + 
		  "</div>" + 
		"</div>" +
		
		"<div id=\"add-topping-type\" class=\"addItemToppingCol\">" + 
		  "<div id=\"add-toppingType\">" + 
		    "<span id=\"addItemToppingParamTitle\"> Type: </span>" + 
		    "<div class=\"dropdown\" id=\"typeDropdown\">" + 
		      "<div id=\"typeSelectedOption\"> default </div>" + 
		      "<ul class=\"dropdown-menu\" id=\"type-dropdown-menu\">" + 
		        "<li><a href=\"#\">dropdown</a></li>" + 
		      "</ul>" + 
		    "</div>" + 
		  "</div>" + 
		  "<input type=\"hidden\" value=\"dropdown\" class=\"toppingTypeValue\" name=\"addonToppingsType\" id=\"toppingTypeInput\">" +
		  "<div id=\"checkToppingType\">" + 
		    "<span id=\"emptyText\"></span>" + 
		    "<div class=\"errorMessages\" id=\"toppingTypeErrorMessages\"></div>" + 
		  "</div>" +
		"</div>" + 
		
		"<div id=\"add-topping-types\" class=\"addItemToppingCol\">" + 
		  "<div id=\"add-toppingTypes\">" + 
		    "<span id=\"addItemToppingParamTitle\"> Types (,): </span>" + 
		    "<input type=\"text\" class=\"toppingTypesValue\" name=\"addonToppingsTypes\">" + 
		  "</div>" + 
		  "<div id=\"checkToppingTypes\">" + 
		    "<span id=\"emptyText\"></span>" + 
		    "<div class=\"errorMessages\" id=\"toppingTypesErrorMessages\"></div>" + 
		  "</div>" + 
		"</div>" + 
		
		"<div id=\"add-topping-isPizza\" class=\"addItemToppingCol\">" + 
		  "<div id=\"add-isPizza\">" + 
		    "<span id=\"addItemToppingParamTitle\"> IsPizza: </span>" + 
		    "<div class=\"dropdown\" id=\"isPizzaDropdown\">" + 
		      "<div id=\"isPizzaSelectedOption\">"+yesOrNo+"</div>" + 
		      "<ul class=\"dropdown-menu\" id=\"isPizza-dropdown-menu\">" + 
		        "<li><a href=\"#\">"+oppositeOfYesOrNo+"</a></li>" + 
		      "</ul>" + 
		    "</div>" + 
		  "</div>" + 
			"<input type=\"hidden\" value=\""+yesOrNo+"\" class=\"toppingIsPizzaValue\" name=\"addonToppingsIsPizza\" id=\"isPizzaInput\">" + 
			"<div id=\"checkisPizza\">" + 
			    "<span id=\"emptyText\"></span>" + 
			    "<div class=\"errorMessages\" id=\"isPizzaErrorMessages\"></div>" + 
			"</div>" + 
		"</div>" +
		
		"<div id=\"add-topping-addonPrice\" class=\"addItemToppingCol\">" +
		"<div id=\"add-toppingAddonCost\">" + 
		    "<span id=\"addItemToppingParamTitle\"> Addon ($): </span>" + 
		    "<input type=\"text\" class=\"toppingAddonValue\" value=\""+ topping.additionalCostAddon + "\" name=\"addonToppingsPrice\" placeholder=\"$0.00\"> " + 
		"</div>" + 
		"<div id=\"checkToppingAddonCost\">" + 
		    "<span id=\"emptyText\"></span>" + 
		    "<div class=\"errorMessages\" id=\"toppingAddonCostErrorMessages\"></div>" + 
		"</div>" + 
		"</div>"	+
		"<div id=\"add-topping-ExtraPrice\" class=\"addItemToppingCol\">" + 
			"<div id=\"add-toppingExtraCost\">" + 
			    "<span id=\"addItemToppingParamTitle\"> [Extra] ($): </span>" + 
			    "<input type=\"text\" class=\"toppingExtraValue\" value=\""+ topping.additionalCostExtra+"\" name=\"addonToppingsExtra\" placeholder=\"$0.00\">" + 
			"</div>" + 
			"<div id=\"checkToppingExtraCost\">" + 
			    "<span id=\"emptyText\"></span>" + 
			    "<div class=\"errorMessages\" id=\"toppingExtraCostErrorMessages\"></div>" + 
			"</div>" + 
		"</div>" + 
		
		"<div id=\"removeToppingDiv\">" + 
			"<div id=\"removeTopping\"> - </div>" +
		"</div>";
	  }
	  htmlText += "</div>";
	}

	


	//Create div and insert addon topping html.
		// Get a reference to the existing div
		const addonOptionsDiv = document.getElementById("addAddonTopping");
		const addonToppings1 = document.createElement("div");
	  
	  	
	  	addonToppings1.id = "addonOptions1";
	  	addonToppings1.innerHTML = htmlText;
	
	
	  	// Insert the new div after the existing div
	  	const addAddonToppingDiv1 = document.querySelector("#addAddonToppingDiv");
	  	const addMainToppingDiv2 = document.querySelector("#addMainToppingDiv");
		addMainToppingDiv2.parentNode.insertBefore(addonToppings1, addAddonToppingDiv1);
		
		initRemoveTopping();
		initDropdownOptions();
		initTypeDropdowns();


  