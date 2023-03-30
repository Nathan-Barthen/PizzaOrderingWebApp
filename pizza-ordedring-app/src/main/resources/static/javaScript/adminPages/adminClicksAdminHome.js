/*Used for adminPages
 * If the user clicks on this box/div, they will be taken to the admin home page,
 * 	where they can select to 'Delete', 'Add', 'Edit' items.
 *  
*/

	const deleteItem = document.getElementById('adminHome');
	
	deleteItem.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/admin/optionsPage';
	});