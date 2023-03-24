/*Used for itemPage.html
 * Used for the user comments section at the bottom of the item
 * 		Show the number of characters left out of 500. (Ex. 115/250)
*/
  
  	const maxCharacters = 250;
    const textArea = document.querySelector('#additionalInstructions');
    const countDisplay = document.querySelector('#countDisplay');

    textArea.addEventListener('input', () => {
        const currentLength = textArea.value.length;
        countDisplay.textContent = `${currentLength}/${maxCharacters}`;
    });
  

  
  