/* Used for all pages when user is logged in.
 * 
 * All pages
 * 	Javascript to hide / show a account information dropdowns.
 * 
 * Also listens for clicks on the hidden account elements.
 * 		-Clicks View Orders
 * 		-Clicks Edit Account
 * 		-Clicks Change Password
 * 		-Clicks Logout
*/


	// Get a reference to the Wings category div
	var loggedIn = document.getElementById('loggedIn');
	
	// Get a reference to the hidden div
	var hiddenLoggedInElements = document.getElementById('hiddenLoggedInElements');
	
	// If Wings category is clicked, show hidden div (dropdown menu)
	loggedIn.addEventListener('click', () => {
		hiddenLoggedInElements.style.display = "block";
	});
	
	// If user clicks outside of the dropdown menu, hide dropdown.
	document.addEventListener('click', (event) => {
	  var clickedElement = event.target;
	  
	  var isClickedOutsideLogged = !loggedIn.contains(clickedElement);
	  var isClickedOutsideHidden = !hiddenLoggedInElements.contains(clickedElement);
	
	  if (hiddenLoggedInElements.style.display == "block") {
	    if (isClickedOutsideHidden && isClickedOutsideLogged) {
	    	hiddenLoggedInElements.style.display = "none";
	    }
	  }
	});
	
	
	//Changes background color when hovering over elements.
	
	// Get references to the elements
	const loggedInElements = document.querySelectorAll('.loggedInElement');

	// Change the background color of the hovered div and set it back to default when the mouse is no longer hovering
	for (var i = 0; i < loggedInElements.length; i++) {
	  loggedInElements[i].addEventListener('mouseover', function() {
	    this.style.backgroundColor = 'rgb(128, 128, 255)';
	  });
	  loggedInElements[i].addEventListener('mouseout', function() {
	    this.style.backgroundColor = 'rgb(51, 51, 255)';
	  });
	}
	  
	  
	  // Redirects to url on click
	// Add click listeners to the divs with class 'loggedInElement'
	var editMenuDiv = document.getElementById('editMenu');
	var viewOrdersDiv = document.getElementById('viewOrders');
	var editAccountDiv = document.getElementById('editAccount');
	var changePasswordDiv = document.getElementById('changePassword');
	var logoutDiv = document.getElementById('logout');

	if(editMenuDiv != null){
		editMenuDiv.addEventListener('click', function() {
		  window.location.href = '/pizzaStore/admin/optionsPage';
		});
	}

	viewOrdersDiv.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/viewOrders';
	});

	editAccountDiv.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/editAccountInformation';
	});

	changePasswordDiv.addEventListener('click', function() {
	  window.location.href = '/pizzaStore/changeAccountPassword';
	});

	logoutDiv.addEventListener('click', function() {
	  window.location.href = '/logout';
	});
