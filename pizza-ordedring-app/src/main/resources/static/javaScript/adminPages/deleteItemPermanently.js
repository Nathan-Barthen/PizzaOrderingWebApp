/*Used for adminDeleteItemPage.html.
 * At the adminDeleteItemPage, when an admin clicks the 'Delete' Box, the text will change to 'Are you Sure?'
 *     If they click on the box again, it will delete the item from the database, and 
 *     	redirect them to adminShowAllDeletePage. (page showing all items + ability to delete.)
 *  
*/

	const deleteItemDiv = document.getElementById('deleteItem');
	let isDeleteConfirmed = false;
	
	deleteItemDiv.addEventListener('click', function() {
	  //"Delete" is clicked - change text to 'Are you Sure?'
	  if (!isDeleteConfirmed) {
	    deleteItemDiv.textContent = 'Are you Sure?';
	    deleteItemDiv.style.backgroundColor = 'rgb(230, 0, 0)';
	    isDeleteConfirmed = true;
	  } 
	  //Deletes item - direct to delete Post Mapping
	  else {
		  // Get the form element & submit
		  var form = document.getElementById("myDeleteForm");
	
		  form.submit();

	  }
	});
