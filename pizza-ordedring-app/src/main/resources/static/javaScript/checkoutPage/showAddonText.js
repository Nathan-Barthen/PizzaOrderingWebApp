
//If addons exist for a given item. It will add the text add-on(s) above the toppings.

// Select all div elements with id 'cartItem'
const cartItems = document.querySelectorAll('#cartItem');

// Loop through each cart item
cartItems.forEach((cartItem) => {
  // Check if a div with class name 'addonsExist' exists within the cart item
  const addonsExistDiv = cartItem.querySelector('.addonsExist');
  
  // If 'addonsExist' div exists, add 'Add-on(s)' text to 'addonsTextDiv'
  if (addonsExistDiv) {
    const addonsTextText = cartItem.querySelector('#addonsTextText');
    const addonsTextDiv = cartItem.querySelector('#addonsTextDiv');
    
    addonsTextText.textContent = 'Add-on(s)';
    addonsTextDiv.style.display = "flex";
  }
});

