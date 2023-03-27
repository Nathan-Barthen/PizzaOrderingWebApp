/* Used for checkoutPage.html
 * Used to allow the user to change delivery address
 * 		If the user clicks the 'Edit' button, it will reveal textboxes to change the user address.
 * 		When they update the addresses and click 'Update', the textboxes will disappear
*/
  
  	const collectionLocation1 = document.getElementById("collectionLocation");
	const collectionLocationApt = document.getElementById("collectionLocationApt");
	const editButton1 = document.getElementById("editLocationBtn");
	
	editButton1.addEventListener("click", () => {
	  if (editButton1.innerText === "Edit") {
	    const originalTextLocation = collectionLocation1.getAttribute("data-original-text");
	    const originalTextLocationApt = collectionLocationApt.getAttribute("data-original-text");
	    collectionLocation1.innerHTML = `<input type="text" placeholder="*Address" value="${originalTextLocation}"/>`;
	    collectionLocationApt.innerHTML = `<input type="text" placeholder="Apt/Bldg" value="${originalTextLocationApt}" />`;
	   
	    
	    // Remove border radius and border
	    collectionLocation1.style.borderRadius = "0";
	    collectionLocation1.style.border = "none";
	    collectionLocationApt.style.borderRadius = "0";
	    collectionLocationApt.style.border = "none";
	    
	    editButton1.innerText = "Update";
	  } 
	  else {
	    const newLocation = collectionLocation1.querySelector("input").value;
	    const newLocationApt = collectionLocationApt.querySelector("input").value;
	    collectionLocation1.innerHTML = newLocation;
	    collectionLocationApt.innerHTML = newLocationApt ? newLocationApt : "";
	    
	    // Add border radius and border
	    collectionLocation1.style.borderRadius = "10px";
	    collectionLocation1.style.border = "1px solid gray";
	    collectionLocationApt.style.borderRadius = "10px";
	    collectionLocationApt.style.border = "1px solid gray";
	    
	    editButton1.innerText = "Edit";
	  }
	});



  
  