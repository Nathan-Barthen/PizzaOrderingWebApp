/*Used for itemPage.html
 * Used for the user comments section at the bottom of the item
 * 		Show the number of characters left out of 250. (Ex. 115/250)
*/
  
  	const maxCharacters = 250;
    const textArea1 = document.querySelector('#itemDescription');
    const countDisplay1 = document.querySelector('#countDisplay');

    textArea1.addEventListener('input', () => {
        const currentLength = textArea1.value.length;
        countDisplay1.textContent = `${currentLength}/${maxCharacters}`;
    });
  

  
  