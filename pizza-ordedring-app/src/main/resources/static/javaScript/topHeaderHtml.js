  
 /* Used for all pages
 *  Used for the insert the html for the header at the top of every page. 
 *  
*/

	const categoryNames = [];
		document.querySelectorAll('[id^="categoryName"]').forEach((el) => {
		  categoryNames.push(el.textContent);
		});
	
	const itemNames = [];
		document.querySelectorAll('[id^="itemName"]').forEach((el) => {
			itemNames.push(el.textContent);
		});

		
	var arrayOfHtmlText = "";
	categoryNames.forEach(category => {
		//Stores item for a given category
		var itemsByCategory = [];
		
		itemNames.forEach(item => {
			var firstSpaceIndex = item.indexOf(" ");
			var categoryName = item.substring(0, item.indexOf(" "));
			var actualItemName = item.substring(firstSpaceIndex + 1, item.length);

			 
			//If itemsByCategory matches current category iteration.
			if (categoryName == category) {
				//Add item name to list
			    itemsByCategory.push(actualItemName);
			}
			
		});	
		
		var itemsHtmlText = '';
	    itemsByCategory.forEach(itemN => {
	        itemsHtmlText += `<div id="item">${itemN}</div>`;
	    });

	    var htmlText = `
	        <div id="${category.toString().toLowerCase()}">
	            <span id="${category.toString().toLowerCase()}Text">${category}</span>
	        </div>
	        <div id="hidden${category.toString()}">
	            ${itemsHtmlText}
	        </div>
	    `;
	    
	    
	    arrayOfHtmlText += htmlText;
		
		
	});	
		
	const contentDiv = document.querySelector(".content");
	const pageBody = document.querySelector("#pageBody");

	//IF the [+] is clicked created the div for the topping, and append div above the [+]
	
	  
	  const mainHeader = document.createElement("div");
	  mainHeader.id = "topHeader";
	  mainHeader.innerHTML = `
	  
			
			<div id="logo">
				<img id="pizzaLogo" src="/images/PizzaLogo.jpg">
			</div>
			<div id="hours">
				<div id="operatingHours">Hours</div>
					<div id="hiddenOperatingHours">
						<div id="day">Mon: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Tue: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Wed: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Thr: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Fri: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Sat: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Sun: <span id="dayHours"> Closed </span>				</div>
					
					</div>
				<div id="openClosed">Open</div>
			</div>
		
		
			${arrayOfHtmlText}	
			
		<div id="spaceBetween"></div>
		<div id="login">Login-in | Sign-up</div>
		<div id="checkout">Checkout</div>

		
				
		`;
	
		contentDiv.insertBefore(mainHeader, contentDiv.firstChild);
	
	
	
	
	
  