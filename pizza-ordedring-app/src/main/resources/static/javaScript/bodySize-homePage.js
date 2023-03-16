/*
 * Effects homePage.html
 * Changes the size of #pageBody div based on the number of foodCategories rows.
*/

	const foodCategoryCols = document.querySelectorAll('#foodCategories-row');
	const height = 100 + (400 * foodCategoryCols.length);
	document.querySelector('#pageBody').style.height = height + 'px';