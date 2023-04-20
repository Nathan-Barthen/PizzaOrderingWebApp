/*
 * Used to show an error, if there is an error creating an item. 
 */

				
	    var popupElement = document.getElementById("popup");
	    if (popupElement.innerText.includes("failed")) {
	    	
	        alert(popupElement.innerText);
	    }
				  
