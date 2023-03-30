/*Used for homePage.html.
 * If logged in user is an admin, they will see a button that when clicked will redirected them to 
 *   a page where they can edit the menu. (Remove items, edit items, add items)
 *  
*/

	const editMenuDiv = document.getElementById('adminEditMenu');
	
	editMenuDiv.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/admin/optionsPage';
	});