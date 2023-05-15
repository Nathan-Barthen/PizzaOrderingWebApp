/* Used for itemPage.html and editItemPage.html
 * 		Controls the number / amount of the item.
 * 		Listens for clicks on the increase and decrease button. Changed number on click.
 * 			-The value cannot go below 1 and cannot go above 12.
 */

const increaseButton = document.getElementById('increaseNumberDiv');
const decreaseButton = document.getElementById('decreaseNumberDiv');
const numberElement = document.getElementById('numberOfItem');

increaseButton.addEventListener('click', () => {
  let number = parseInt(numberElement.textContent);
  if (number < 12) {
    number++;
    numberElement.textContent = number;
  }
});

decreaseButton.addEventListener('click', () => {
  let number = parseInt(numberElement.textContent);
  if (number > 1) {
    number--;
    numberElement.textContent = number;
  }
});
