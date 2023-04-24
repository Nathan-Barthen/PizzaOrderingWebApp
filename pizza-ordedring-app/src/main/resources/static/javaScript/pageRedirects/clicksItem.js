/* Used for category.html & all other pages.
 * 
 * All pages
 * 	When the user clicks on a dropdown at the top of the page, it will reveal items.
 * 		When one of these items are clicked, it will direct them to the url /pizzaStore/{categoryName}/{itemName}
 * 			{categoryName} will be the text inside of their respective parent div
 * 				{itemName} will be the text inside of div=item
 * 
 * categoryPage.html
 * 	When the user clicks on a item (div = itemBorder)...
 * 		It will direct them to the url /pizzaStore/{categoryName}/{itemName}
 * 				{categoryName} will be the text inside of div=menuTitle
 * 				{itemName} will be the text inside of div=itemName
 *  
*/


//Used the dropdown menu at the top of any page and clicks on an item
	// Get all the div elements with the id of "item"
	const topItemDivs = document.querySelectorAll("#hiddenPizzas div, #hiddenSides div, #hiddenWings div, #hiddenPasta div, #hiddenWedgie div, #hiddenDesserts div, #hiddenDrinks div, #hiddenMisc div");
	
	// Add a click event listener to each item div
	topItemDivs.forEach(function(div) {
	  div.addEventListener("click", function() {
	    // Get the category name
	    const topCategoryName = this.parentNode.previousElementSibling.textContent.trim();
	    // Get the item name
	    const topItemName = this.textContent;
	    // Redirect to the URL with the category name and item name
	    window.location.href = `/pizzaStore/${topCategoryName}/${topItemName}`;
	  });
	});



//Clicks on an item div in categoryPage.html
	// Get the menu title
		const menuTitle = document.getElementById('menuTitle').textContent;
		
		// Get all the item divs
		const itemDivs = document.querySelectorAll('#foodItems-Item');
		
		// Add an event listener to each item div
		itemDivs.forEach(itemDiv => {
		    const itemBorder = itemDiv.querySelector('#itemBorder');
		    const itemName1 = itemDiv.querySelector('#itemName').textContent;
		    
		    itemBorder.addEventListener('click', () => {
		        window.location.href = `/pizzaStore/${menuTitle}/${itemName1}`;
		    });
		});

  
	
	