/*Used for categoryPage.html
 * 	Creates the rows of items for the selected category
*/
  
  	// Get the displayItems 
    var displayItems = [];
    var hiddenDisplayItems = document.querySelectorAll("#hiddenDisplayItems");

    hiddenDisplayItems.forEach(function(topping) {
        var obj = {
            itemName: topping.querySelector("#itemName").textContent,
            itemUrl: topping.querySelector("#itemUrl").textContent,
        };
        displayItems.push(obj);
    });

    // Get the foodItems-row div
    const foodItemsRow = document.getElementById("foodItems");

    // Define the number of items to show per row
    const itemsPerRow = 3;

    // Create a counter to keep track of the current row
    let currentRow = null;

    // Loop through the displayItems array
    for (let i = 0; i < displayItems.length; i++) {
        // Create a new foodItems-Item div for each item
        const foodItemsItem = document.createElement("div");
        foodItemsItem.id = "foodItems-Item";

        // Create a new itemBorder div for each item
        const itemBorder = document.createElement("div");
        itemBorder.id = "itemBorder";
        foodItemsItem.appendChild(itemBorder);

        // Create a new itemImgDiv div for each item
        const itemImgDiv = document.createElement("div");
        itemImgDiv.id = "itemImgDiv";
        itemBorder.appendChild(itemImgDiv);

        // Create a new itemImg img for each item
        const itemImg = document.createElement("img");
        itemImg.id = "itemImg";
        itemImg.src = displayItems[i].itemUrl;
        itemImgDiv.appendChild(itemImg);

        // Create a new itemName div for each item
        const itemName = document.createElement("div");
        itemName.id = "itemName";
        itemName.innerText = displayItems[i].itemName;
        itemBorder.appendChild(itemName);

        // If this is the first item, or an item that should start a new row,
        // create a new foodItems-row div
        if (i === 0 || i % itemsPerRow === 0) {
            currentRow = document.createElement("div");
            currentRow.id = "foodItems-row";
            currentRow.classList.add("new-row"); // you can add a new class here for new rows
            foodItemsRow.appendChild(currentRow);
        }

        // Add the item to the current foodItems-row div
        currentRow.appendChild(foodItemsItem);
    }

  
    clicksItemOnCategoryPage()
  
  