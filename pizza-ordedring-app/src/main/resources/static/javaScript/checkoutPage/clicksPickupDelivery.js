/*Used for chackoutPage.html.
 * When the user clicks on the [Pickup] or [Delivery] box's it will change the color to reflect their selection.
 *  Also changes the text below the buttons based on what the user clicks
 *    Clicks Delivery: 'Delivery to" {usersHomeAddr}'
 *    Clicks Pickup: 'Pickup at: {storeLocation '
*/

	//Change background of [Delivery] and [Pickup] when user clicks them
		//Also change the text below it.

		const deliverySelector = document.querySelector('#deliverySelector');
		const pickupSelector = document.querySelector('#pickupSelector');
		
		const collectionType = document.getElementById('collectionType');
		const collectionLocation = document.getElementById('collectionLocation');
		
		const editButton2 = document.getElementById("editLocationBtn");
		
		//Clicks delivery
		deliverySelector.addEventListener('click', () => {
		  deliverySelector.style.backgroundColor = 'rgb(213, 128, 255)';
		  pickupSelector.style.backgroundColor = 'rgb(204, 204, 204)';
		  
		  collectionType.textContent = 'Delivery to: ';
		  collectionLocation.textContent = usersHomeAddr.textContent;
		  
		  //Show edit button
		  editButton2.style.display = "block";
		});
		
		//Clicks pickup
		pickupSelector.addEventListener('click', () => {
		  pickupSelector.style.backgroundColor = 'rgb(204, 102, 255)';
		  deliverySelector.style.backgroundColor = 'rgb(204, 204, 204)';
		  
		  collectionType.textContent = 'Pickup at: ';
		  collectionLocation.textContent = storeLocation.textContent;
		  
		  //Hide edit button.
		  editButton2.style.display = "none";
		});

	

  