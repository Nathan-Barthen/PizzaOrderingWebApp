/*
* Javascript to hide / show operating hours at the top of the webpage 
*    Triggers when clicking 'Hours'
*/

	// Get a reference to the operatingHours div
	const operatingHours = document.getElementById('operatingHours');
	
	// Get a reference to the hidden div
	const hiddenHoursDiv = document.getElementById('hiddenOperatingHours');
	
	// Add a click event listener to the operatingHours div
	hiddenHoursDiv.style.display = 'none';
	 
	operatingHours.addEventListener('click', () => {
	  // Toggle the visibility of the hidden div
	  if (hiddenHoursDiv.style.display === 'none') {
		  hiddenHoursDiv.style.display = 'flex';
		  hiddenHoursDiv.style.flexDirection = 'column';

	  } 
	  else {
		  hiddenHoursDiv.style.display = 'none';
	  }
	});

	
	
	
	//Hide pizzas div if user clicks anywhere (other than inside of the div)
	document.addEventListener('click', (event) => {
		  const clickedElement = event.target;
		  
		  const isClickedOutsideHours = !operatingHours.contains(clickedElement);
		  const isClickedOutsideHiddenHours = !hiddenHoursDiv.contains(clickedElement);
		  
		  if(hiddenHoursDiv.style.display === 'flex') {
			  if (isClickedOutsideHours && isClickedOutsideHiddenHours) {
				  hiddenHoursDiv.style.display = 'none';
			  }
			  else {
			  }
		  }
	});
	
	
	//Change background color on hover of 'Hours'
	operatingHours.addEventListener('mouseover', function() {
	    this.style.backgroundColor = 'rgb(0, 64, 255)';
	  });
	operatingHours.addEventListener('mouseout', function() {
	    this.style.backgroundColor = 'rgb(51, 102, 255)';
	  });
	