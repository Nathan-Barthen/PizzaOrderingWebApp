/* Used for adminOptionsPage.html.
 * This create the url mappings to for each user listed.
 * 		-For each User:
 * 			-Mapping to Give Admin.
 * 			-Mapping to Rewmove Admin
 * 			-Mapping to Delete Account.
 *  
 *  This also changes the color of isAdmin div depending if it is true or false.
*/

// Get all the spans for each user
var giveAdminSpans = document.getElementsByClassName('giveAdminSpan');
var removeAdminSpans = document.getElementsByClassName('removeAdminSpan');
var deleteAccountSpans = document.getElementsByClassName('deleteAccountSpan');

// Add event listeners to the spans
for (var i = 0; i < giveAdminSpans.length; i++) {
  (function(userEmail) {
    giveAdminSpans[i].addEventListener('click', function() {
      window.location.href = '/pizzaStore/giveAdmin/email/' + userEmail;
    });
  })(giveAdminSpans[i].parentNode.parentNode.querySelector('#email').textContent.trim());
}

for (var i = 0; i < removeAdminSpans.length; i++) {
  (function(userEmail) {
    removeAdminSpans[i].addEventListener('click', function() {
      window.location.href = '/pizzaStore/removeAdmin/email/' + userEmail;
    });
  })(removeAdminSpans[i].parentNode.parentNode.querySelector('#email').textContent.trim());
}

for (var i = 0; i < deleteAccountSpans.length; i++) {
  (function(userEmail) {
    deleteAccountSpans[i].addEventListener('click', function() {
      window.location.href = '/pizzaStore/deleteUser/email/' + userEmail;
    });
  })(deleteAccountSpans[i].parentNode.parentNode.querySelector('#email').textContent.trim());
}



//Get all div elements with class name "isAdmin"
var isAdminDivs = document.getElementsByClassName('isAdmin');

// Loop through each div element
for (var i = 0; i < isAdminDivs.length; i++) {
  var isAdminText = isAdminDivs[i].textContent.trim();

  // Check if the text equals 'true'
  if (isAdminText === 'true') {
    isAdminDivs[i].style.color = 'blue';
  } else {
    isAdminDivs[i].style.color = 'red';
  }
}