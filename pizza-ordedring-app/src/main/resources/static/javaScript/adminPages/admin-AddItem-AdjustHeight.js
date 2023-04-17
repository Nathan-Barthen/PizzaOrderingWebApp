  
 /* Used for adminAddItemPage.html
 *  Used to adjust the hight of the page based on the number of toppings added.
 *  
 *  
*/

// Get a reference to the #addItemDiv element
const addItemDiv = document.querySelector('#addItemDiv');

// Set the initial minimum height of the #addItemDiv to 700px
addItemDiv.style.minHeight = '800px';

// Add an event listener to the document that listens for changes to the DOM
document.addEventListener('DOMSubtreeModified', () => {
  // Get the number of #addItemToppingRow elements present on the page
  const numToppingRows = document.querySelectorAll('#addItemToppingRow').length;

  // Calculate the new minimum height of the #addItemDiv
  const newMinHeight = 700 + (numToppingRows * 90);

  // Set the new minimum height of the #addItemDiv
  addItemDiv.style.minHeight = `${newMinHeight}px`;
});


  