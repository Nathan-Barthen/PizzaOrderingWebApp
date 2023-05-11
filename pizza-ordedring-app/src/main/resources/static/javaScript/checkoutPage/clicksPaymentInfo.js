/*Used for chackoutPage.html.
 * When the user clicks 'Enter Payment Info' div.
 * 		This create a form and adds the necessary @RequestParams to the mapping.
 *  
*/

	const enterPaymentButtonDiv = document.getElementById('enterPaymentButtonDiv');

	enterPaymentButtonDiv.addEventListener('click', function() {
	  const form = document.createElement('form');
	  form.method = 'POST';
	  form.action = '/pizzaStore/checkout/updateOrderInformation';
	
	  // Create and append the input fields for the parameters
	  //Home address (delivery address)
	  const homeAddressInput = document.createElement('input');
	  homeAddressInput.type = 'hidden';
	  homeAddressInput.name = 'homeAddress';
	  homeAddressInput.value = document.getElementById('collectionLocation').textContent.trim();
	  form.appendChild(homeAddressInput);
	
	  //Home apt number (delivery apt number)
	  const aptNumberInput = document.createElement('input');
	  aptNumberInput.type = 'hidden';
	  aptNumberInput.name = 'aptNumber';
	  aptNumberInput.value = document.getElementById('collectionLocationApt').textContent.trim();
	  form.appendChild(aptNumberInput);
	  
	  //Delivery Instructions
	  const deliveryInstructionsInput = document.createElement('input');
	  deliveryInstructionsInput.type = 'hidden';
	  deliveryInstructionsInput.name = 'deliveryInstructions';
	  deliveryInstructionsInput.value = document.getElementById('additionalInstructions').value.trim();
	  form.appendChild(deliveryInstructionsInput);
	
	  //Check if ASAP or Later is selected.
	  const timeAsapDiv = document.getElementById('timeAsap');
	  
	  var asapOrLaterText = '';
	  
	    if (window.getComputedStyle(timeAsapDiv).backgroundColor === 'rgb(213, 128, 255)') {
	    	asapOrLaterText = 'asap';
	    } 
	    else {
	    	asapOrLaterText = "later";
	    	
	    	//Add later time and date
	    	  //Later date selected
		  	  const laterSelectedDateInput = document.createElement('input');
		  	  laterSelectedDateInput.type = 'hidden';
		  	  laterSelectedDateInput.name = 'laterSelectedDate';
		  	  laterSelectedDateInput.value = document.getElementById('dateDropdown').value;
		  	  form.appendChild(laterSelectedDateInput);
		  	
		  	  //Later time selected
		  	  const laterSelectedTimeInput = document.createElement('input');
		  	  laterSelectedTimeInput.type = 'hidden';
		  	  laterSelectedTimeInput.name = 'laterSelectedTime';
		  	  laterSelectedTimeInput.value = document.getElementById('timeDropdown').value;
		  	  form.appendChild(laterSelectedTimeInput);
	    }
	    
	    const asapOrLaterInput = document.createElement('input');
	    asapOrLaterInput.type = 'hidden';
	    asapOrLaterInput.name = 'asapOrLater';
	    asapOrLaterInput.value = asapOrLaterText;
	  	form.appendChild(asapOrLaterInput);
	  
	  
	    //Check if pickup at store was selected
	  	const pickupOrDeliveryDiv = document.getElementById('deliverySelector');
	  	var pickupOrDeliveryText = '';
		  
	    if (window.getComputedStyle(pickupOrDeliveryDiv).backgroundColor === 'rgb(213, 128, 255)') {
	    	pickupOrDeliveryText = 'delivery';
	    } 
	    else {
	    	pickupOrDeliveryText = "pickup";
	    }
	    
	    const pickupOrDeliveryInput = document.createElement('input');
	    pickupOrDeliveryInput.type = 'hidden';
	    pickupOrDeliveryInput.name = 'pickupAtStore';
	    pickupOrDeliveryInput.value = pickupOrDeliveryText;
	  	form.appendChild(pickupOrDeliveryInput);
	  	
	  	
	  
	
	  // Append the form to the document and submit it
	  document.body.appendChild(form);
	  form.submit();
	});

  