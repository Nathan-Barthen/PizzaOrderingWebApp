/* Used for homePage.html
 * 	When the user clicks on a category (div = categoryBorder)...
 * 		It will direct them to the url /pizzaStore/{categoryName}
 * 				{categoryName} will be the text inside of div=categoryItemName
 *  
*/

	// Get all category divs
	const categoryDivs = document.querySelectorAll('#category');
	
	// Loop through category divs and add event listener to categoryBorder
	categoryDivs.forEach(categoryDiv => {
	  const categoryBorder = categoryDiv.querySelector('#categoryBorder');
	  const categoryItemName = categoryDiv.querySelector('#categoryItemName').innerText;
	  
	  categoryBorder.addEventListener('click', () => {
	    window.location.href = `/pizzaStore/${categoryItemName}`;
	  });
	});
  