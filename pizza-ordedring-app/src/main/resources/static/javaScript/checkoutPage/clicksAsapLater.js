/*Used for chackoutPage.html.
 * When the user clicks on the [ASAP] or [Later] box's it will change the color to reflect their selection.
 *  Also changes the text below the buttons based on what the user clicks
 *  	Click Later: Reveals a dropdown box to select a date and time.
 *      CLick ASAP: Hides dropdown box.
*/

	//Change background of [ASAP] and [Future] when user clicks them
		//Also change the text below it.

		const timeAsap = document.getElementById('timeAsap');
		const timeLater = document.getElementById('timeLater');
		
		const laterDateSelectorDiv1 = document.getElementById('laterDateSelectorDiv');
		
		//Clicks ASAP
		timeAsap.addEventListener('click', () => {
			
			timeAsap.style.backgroundColor = 'rgb(213, 128, 255)';
			timeLater.style.backgroundColor = 'rgb(204, 204, 204)';
		 
			laterDateSelectorDiv1.style.display = "none";
		});
		
		//Clicks Later
		timeLater.addEventListener('click', () => {
			timeLater.style.backgroundColor = 'rgb(204, 102, 255)';
		    timeAsap.style.backgroundColor = 'rgb(204, 204, 204)';
		  
		    laterDateSelectorDiv1.style.display = "flex";
		});

	

  