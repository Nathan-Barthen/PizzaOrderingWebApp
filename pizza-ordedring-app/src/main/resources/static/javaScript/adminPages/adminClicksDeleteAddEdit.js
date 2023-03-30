/*Used for adminOptionsPage.html.
 * At the adminOptionsPage, an admin can add, edit, and remove items from the menu.
 *     This will redirect the admin to the box that they click (Delete, Add, Edit)
 *  
*/

	const deleteItem = document.getElementById('deleteItem');
	const addItem = document.getElementById('addItem');
	const editItem = document.getElementById('editItem');
	
	deleteItem.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/admin/delete/showAllItems';
	});
	
	addItem.addEventListener('click', function() {
		  window.location.href = '/pizzaStore/admin/add/addAnItem';
		});
	
	editItem.addEventListener('click', function() {
		  window.location.href = '/pizzaStore/admin/edit/showAllItems';
		});