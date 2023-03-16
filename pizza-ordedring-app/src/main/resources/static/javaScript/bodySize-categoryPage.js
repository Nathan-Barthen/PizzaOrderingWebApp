/*
 * Effects categoryPage.html
 * Changes the size of #pageBody div based on the number of foodItems rows.
*/

	const foodItemsCols = document.querySelectorAll('#foodItems-row');
	const height = 100 + (320 * foodItemsCols.length);
	document.querySelector('#pageBody').style.height = height + 'px';