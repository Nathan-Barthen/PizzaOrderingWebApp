/*Used for itemPage.html
 * 
 *  Updates the price shown by topping if the user selects extra.
 * 	   This works for both main and additional topping
 *  
*/
function addUpdateForCosts() {

	//Main Options - Show extra cost when clicked. Hide when normal or light is clicked (no extra cost applied)
	var mainOptionsDiv2 = document.querySelector("#mainOptions");
	var targetDivs2 = mainOptionsDiv2.querySelectorAll("#mainOptions-dropdownContainer, #lightNormalExtra");
	
	targetDivs2.forEach(function(targetDiv) {
	  var toppPriceText2 = targetDiv.querySelector("#toppPriceText");
	  var light = targetDiv.querySelector("#light");
	  var normal = targetDiv.querySelector("#normal");
	  var extra = targetDiv.querySelector("#extra");
	  
	  light.addEventListener("click", function() {
	    toppPriceText2.style.display = "none";
	  });
	
	  normal.addEventListener("click", function() {
	    toppPriceText2.style.display = "none";
	  });
	
	  extra.addEventListener("click", function() {
	    toppPriceText2.style.display = "";
	  });
	});

}

function addUpdateForAddonCosts() {

	//Addon Toppings - Change cost when extra is applied / clicked.
	var mainOptionsDiv3 = document.querySelector("#add-ons_Extra");
	var targetDivs3 = mainOptionsDiv3.querySelectorAll("#addonOptions-dropdownContainer, #lightNormalExtra");
	
	targetDivs3.forEach(function(targetDiv) {
	  var toppPriceText3 = targetDiv.querySelector("#toppPriceText");

	  var toppPricesHidden = targetDiv.querySelector("#toppPricesHidden");
	  
	  var addonPriceElements = toppPricesHidden.querySelectorAll("#hiddenAddonPrice");
	  var addonPrice = 0;
	  addonPriceElements.forEach(function(addonPriceElement) {
	    addonPrice += parseFloat(addonPriceElement.textContent);
	  });

	  var extraPriceElements = toppPricesHidden.querySelectorAll("#hiddenExtraPrice");
	  var extraPrice = 0;
	  extraPriceElements.forEach(function(extraPriceElement) {
	    extraPrice += parseFloat(extraPriceElement.textContent);
	  });
	  
	  var light3 = targetDiv.querySelector("#light");
	  var normal3 = targetDiv.querySelector("#normal");
	  var extra3 = targetDiv.querySelector("#extra");
	  
	  light3.addEventListener("click", function() {
		  toppPriceText3.textContent = "$" + addonPrice.toFixed(2);
		});

		normal3.addEventListener("click", function() {
		  toppPriceText3.textContent = "$" + addonPrice.toFixed(2);
		});

		extra3.addEventListener("click", function() {
		  toppPriceText3.textContent = "$" + (parseFloat(addonPrice) + parseFloat(extraPrice)).toFixed(2);
		});
	});

}