/* Used for home, category, and item page.
 * Redirect the user to a page based on the text they enter in the item search bar.
*/


var userSearch = document.getElementById("userSearchInput");
userSearch.addEventListener("keydown", function(event) {
  if (event.keyCode == 13) {
    document.getElementById("searchForm").submit();
  }
});