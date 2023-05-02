/*Used for adminShowAllDeletePage.html.
 * At the adminShowAllDeletePage, when an admin clicks on one of them items listed
 *     This will redirect the admin to a page listing the items description and ingredients.
 *         At this new page, the admin will be able to delete the item from the menu.
 *  
*/

	const items = document.querySelectorAll('#itemCategory #itemInCategory');

	items.forEach((item) => {
	  item.addEventListener('click', () => {
	    const categoryName = item.parentNode.querySelector('#category').textContent;
	    const itemName = item.textContent;
	    window.location.href = `/pizzaStore/admin/delete/${categoryName}/${itemName}`;
	  });
	});
