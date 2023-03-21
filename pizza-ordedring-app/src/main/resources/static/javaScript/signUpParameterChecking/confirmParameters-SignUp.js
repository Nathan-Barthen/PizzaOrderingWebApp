/*Used for sign-upPage.html
 * 	Ensures the parameters  for sign-up is acceptable
 * 
 * 	First and Last Name: Must be at least 2 characters. Cannot be empty.
 * 
 * 	
 * 
 * 	Password: Ensures the two passwords match for the user.
 * 			  Also makes sure it is atleast 7 characters long. Must contain one capital and one number
 *  
*/

  const form = document.getElementById('signUpForm');
  form.addEventListener('submit', validateForm);

  function validateForm(event) {
	  
	  //Get first name fields.
	  const firstNameField = document.getElementsByName('firstname')[0];
	  const firstNameErrorMessages = document.getElementById('firstNameErrorMessages');
	  
	  //Get last name fields.
	  const lastNameField = document.getElementsByName('lastname')[0];
	  const lastNameErrorMessages = document.getElementById('lastNameErrorMessages');
	  
	  
	  //Get password fields.
	  const passwordField = document.getElementById('password');
	  const confirmPasswordField = document.getElementById('confirmPassword');
	  const passwordErrorMessages = document.getElementById('passwordErrorMessages');
	  
	  //Check if first name is empty
	  if (firstNameField.value.trim() === '') {
		  firstNameErrorMessages.innerHTML = '*First name cannot be empty.';
	        event.preventDefault();
	    }
	  //Check if first name is at least 2 characters
	  else if (firstNameField.value.trim().length < 2) {
		  firstNameErrorMessages.innerHTML = '*First name must be at least 2 characters.';
	        event.preventDefault();
	  }
	  else {
		  firstNameErrorMessages.innerHTML = '';
	        event.preventDefault();
	  }
	  
	  
	  //Check if first name is empty
	  if (lastNameField.value.trim() === '') {
		  	lastNameErrorMessages.innerHTML = '*Last name cannot be empty.';
	        event.preventDefault();
	    }
	  //Check if first name is at least 2 characters
	  else if (lastNameField.value.trim().length < 2) {
		  lastNameErrorMessages.innerHTML = '*Last name must be at least 2 characters.';
	        event.preventDefault();
	  }
	  else {
		  lastNameErrorMessages.innerHTML = '';
	        event.preventDefault();
	  }
	  
	  
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
	  
	  return true;
	}
