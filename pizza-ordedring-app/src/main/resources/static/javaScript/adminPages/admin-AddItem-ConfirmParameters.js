/*Used for sign-upPage.html
 * 	Ensures the parameters  for sign-up is acceptable
 * 
 * 	First and Last Name: Must be at least 2 characters. Cannot be empty.
 *  Address: Must contain at least one number, at least one letter, and a space
 * 	Email: Must contain an '@', then a letter, and end in '.com'
 * 	Password: Ensures the two passwords match for the user.
 * 			  Also makes sure it is at least 7 characters long. Must contain one capital and one number
 *  
*/

  const signUpForm = document.getElementById('addItemForm');

  signUpForm.addEventListener('submit', function(event) {
	  
	  //Get item name fields.
	  const itemName = document.getElementsByName('itemName')[0];
	  const itemNameErrorMessages = document.getElementById('itemNameErrorMessages');
	  
	  //Get category name fields.
	  const categoryName = document.getElementsByName('categoryName')[0];
	  const categoryNameErrorMessages = document.getElementById('categoryNameErrorMessages');
	  
	  // Get itemPrice fields
	  const itemPrice = document.getElementsByName('itemPrice')[0];
	  const itemPriceErrorMessages = document.getElementById('itemPriceErrorMessages');
	  
	  //Get itemDescription fields
	  const itemDescription = document.getElementsByName('itemDescription')[0];
	  const itemDescriptionErrorMessages = document.getElementById('itemDescriptionErrorMessages');
	  
	  //Get email fields
	  const emailField = document.getElementsByName('email')[0];
	  const emailErrorMessages = document.getElementById('emailErrorMessages');
	  
	  //Get password fields.
	  const passwordField = document.getElementById('password');
	  const confirmPasswordField = document.getElementById('confirmPassword');
	  const passwordErrorMessages = document.getElementById('passwordErrorMessages');
	  
	  
	  //Check item name
		  //Check if item name is empty
		  if (itemName.value.trim() === '') {
			  itemNameErrorMessages.innerHTML = '*Item name cannot be empty.';
		        event.preventDefault();
		  }
		  else {
			  itemNameErrorMessages.innerHTML = '';
		  }
	  
		  
	  //Check category name
		  //Check if category name is empty
		  if (categoryName.value.trim() === '') {
			  categoryNameErrorMessages.innerHTML = '*Category name cannot be empty.';
		        event.preventDefault();
		    }
		  else {
			  categoryNameErrorMessages.innerHTML = '';
		  }
		  
		 
		// Check item price number
		  const itemPriceRegex = /^\$?\d+(\.\d{1,2})?$/;
		  //If item price is entered
		  
		  if (!itemPriceRegex.test(itemPrice.value)) {
			  itemPriceErrorMessages.innerHTML = '*Please follow the format $0.00';
			  event.preventDefault();
		  }
		  else {
			  itemPriceErrorMessages.innerHTML = '';
		  } 
	 
		//Check item description
		  //Check if item description is empty
		  if (itemDescription.value.trim() === '') {
			  itemDescriptionErrorMessages.innerHTML = '*Item description cannot be empty.';
		        event.preventDefault();
		  }
		  else {
			  itemDescriptionErrorMessages.innerHTML = '';
		  }
	
		  
	
		  
		  
	  //Check passwords
		  //Check if passwords match
		  if (passwordField.value !== confirmPasswordField.value) {
			  firstNameErrorMessages.innerHTML = '*Passwords do not match.';
			  event.preventDefault();
		  }
		  //Check if password matches required characters.
		  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/;
		  if (!passwordRegex.test(passwordField.value)) {
			  passwordErrorMessages.innerHTML = '*Password must be at least 7 characters with one capital and one number.';
			  event.preventDefault();
		  }
	  
		
		  
		  
		  
		  
		

  });
