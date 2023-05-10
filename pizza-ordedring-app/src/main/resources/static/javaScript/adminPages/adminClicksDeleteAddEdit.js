/*Used for adminOptionsPage.html.
 * At the adminOptionsPage, an admin can add, edit, and remove items from the menu.
 *     This will redirect the admin to the box that they click (Delete, Add, Edit)
 *     Also has mapping for Edit/AllUsers.
 *     		-This will be where an admin can give admin powers, take away powers, and delete accounts.
 *  
*/

	const deleteItem = document.getElementById('deleteItem');
	const addItem = document.getElementById('addItem');
	const editItem = document.getElementById('editItem');
	const editUsers = document.getElementById('editUsers');
	
	deleteItem.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/admin/delete/showAllItems';
	});
	
	addItem.addEventListener('click', function() {
		  window.location.href = '/pizzaStore/admin/add/addAnItem';
	});
	
	editItem.addEventListener('click', function() {
		  window.location.href = '/pizzaStore/admin/edit/showAllItems';
	});
	editUsers.addEventListener('click', function() {
		  window.location.href = '/pizzaStore/admin/edit/AllUsers';
	});
	
	

