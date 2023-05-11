/*Used for chackoutPage.html.
 * When the user clicks on the [Later] box's it will show the dropdown boxes for time & later.
 * 		If today is selected: 
 * 			-It will only shot times from now (current time) to closing.
 *      If a day is selected where it is closed: 
 *      	-It will say no available times.
 *      If a future day is selected and it is not closed:
 *      	-It will show all times from opening to closing. 
 *      		-It will not allows for the first hour on opening and last hour before closing.
 *      			-This is to give times for opening and closing operations
 *  
*/

	const laterDateSelectorDiv = document.getElementById('laterDateSelectorDiv');

	//Create date dropdown
	const dateDropdown = document.createElement('select');
	dateDropdown.id = 'dateDropdown';
	dateDropdown.required = true;
	
	//Create time dropdown
	const timeDropdown = document.createElement('select');
	timeDropdown.id = 'timeDropdown';
	timeDropdown.required = true;
	
	//Populate date dropdown
	const maxDaysInFuture = 10;
	const startDate = new Date();
	for (let i = 0; i <= maxDaysInFuture; i++) {
	  const option = document.createElement('option');
	  const date = new Date(startDate);
	  date.setDate(date.getDate() + i);
	  option.value = date.toISOString();
	  option.text = formatDate(date);
	  dateDropdown.appendChild(option);
	}
	
	//Populate time dropdown
	
	const operatingHours1 = {};
	const hiddenOperatingHours = document.getElementById('hiddenOperatingHours');

	// loop through each day's hours and add them to the operatingHours1 object
	hiddenOperatingHours.querySelectorAll('#day').forEach(day => {
	  const dayOfWeek = day.innerText.slice(0, 3);
	  const hours = day.querySelector('#dayHours').innerText.split(' - ');
	  if (day.querySelector('#dayHours').innerText.trim() === "Closed") {
		  operatingHours1[dayOfWeek] = ['Closed'];
	  }
	  else {
		  operatingHours1[dayOfWeek] = hours;
	  }
	});



	
	
	const selectedDate = new Date();
	populateTimeDropdown(selectedDate);
	
	populateTimeDropdown(selectedDate);
	
	dateDropdown.addEventListener('change', (event) => {
	  const selectedDate = new Date(event.target.value);
	  populateTimeDropdown(selectedDate);
	});
	
	
	
	//Populates the dropdown with available times for the selected date
	function populateTimeDropdown(selectedDate) {
	  // Gets the day of the week for the selected date
	  const dayOfWeek = getDayOfWeek(selectedDate);
	  // Gets the operating hours for the day of the week
	  const hours = operatingHours1[dayOfWeek];
	
	  // Clears the existing options from the dropdown
	  timeDropdown.innerHTML = '';
	
	  // If the location is closed on the selected day, adds a disabled option with the text "No available times"
	  if (hours.length === 1 && hours[0] === 'Closed') {
	    const option = document.createElement('option');
	    option.text = 'No available times';
	    option.disabled = true;
	    timeDropdown.appendChild(option);
	  } else {
	    // Parses the opening and closing times for the selected day
	    const startTime = parseTime(hours[0]);
	    const endTime = parseTime(hours[1]);
	
	    // Sets the time interval for each dropdown option to 30 minutes
	    const interval = 30;
	    let currentTime = new Date(startTime);
	
	    // Adds an option for each available time slot within the operating hours
	    while (currentTime <= endTime) {
	      const option = document.createElement('option');
	      option.value = currentTime.toTimeString().substring(0, 5);
	      option.text = formatTime(currentTime);
	      timeDropdown.appendChild(option);
	
	      // Increments the current time by the interval
	      currentTime.setMinutes(currentTime.getMinutes() + interval);
	    }
	  }
	}
	
	
	
	// Returns the day of the week (short name) for a given date
	function getDayOfWeek(date) {
	  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
	  const dayIndex = date.getDay();
	  return daysOfWeek[dayIndex];
	}
	
	
	
	// Parses a time string (e.g. '9:30am') into a Date object
	function parseTime(timeString) {
	  const [hour, minute, suffix] = timeString.match(/(\d+):(\d+)([ap]m)/).slice(1);
	  const hourNumber = parseInt(hour);
	  const minuteNumber = parseInt(minute);
	  let date = new Date();
	  date.setHours(hourNumber);
	  date.setMinutes(minuteNumber);
	  date.setSeconds(0);
	  if (suffix === 'pm' && hourNumber !== 12) {
	    date.setHours(hourNumber + 12);
	  }
	  return date;
	}
	
	
	
	// Formats a Date object as a string (e.g. '9:30 AM')
	function formatTime(time) {
	  const hour = time.getHours() % 12 || 12;
	  const minute = time.getMinutes().toString().padStart(2, '0');
	  const suffix = time.getHours() < 12 ? 'AM' : 'PM';
	  return `${hour}:${minute} ${suffix}`;
	}
	
	
	
	// Formats a Date object as a string (e.g. 'Mon, Mar 21')
	function formatDate(date) {
	  const options = { weekday: 'short', month: 'short', day: 'numeric' };
	  return date.toLocaleDateString('en-US', options);
	}
	
	
	
	//Returns an array of available time slots between openTime and closeTime
	//Populates the dropdown with available times for the selected date
	function populateTimeDropdown(selectedDate) {
		
		  // Gets the day of the week for the selected date
		  const dayOfWeek = getDayOfWeek(selectedDate);
		  
		  // Gets the operating hours for the day of the week
		  const hours = operatingHours1[dayOfWeek];
		  
		  // Clears the existing options from the dropdown
		  timeDropdown.innerHTML = '';
	
		  // If the location is closed on the selected day, adds a disabled option with the text "No available times"
		  if (hours.length === 1 && hours[0] === 'Closed') {
		    const option = document.createElement('option');
		    option.text = 'No available times';
		    option.disabled = true;
		    timeDropdown.appendChild(option);
		  } 
		  else {
		    // Parses the opening and closing times for the selected day
		    const startTime = parseTime(hours[0]);
		    const endTime = parseTime(hours[1]);
	
		    // Sets the time interval for each dropdown option to 30 minutes
		    const interval = 30;
		    let currentTime = new Date(startTime);
	
		    // Check if selected date is today's date
		    const today = new Date();
		    const isToday = selectedDate.getDate() === today.getDate() &&
		                    selectedDate.getMonth() === today.getMonth() &&
		                    selectedDate.getFullYear() === today.getFullYear();
	
		    // Subtract / add an hour for available time to account for opening / closing period
		    // Adds an option for each available time slot within the operating hours
		    if (isToday) {
			      const currentHour = today.getHours();
			      if (currentHour < endTime.getHours()) {
				        // If the current time is before closing, set the start time to the current time
				        currentTime = today;
				        currentTime.setMinutes(Math.ceil(currentTime.getMinutes() / interval) * interval);
				        // If the current time is after opening, add an hour to the start time
				        if (currentHour > startTime.getHours() || (currentHour === startTime.getHours() && currentTime.getMinutes() >= startTime.getMinutes())) {
				        	currentTime.setHours(currentTime.getHours() + 1);
				        }
			      } 
			      else {
				        // If the current time is after closing, there are no available times today
				        const option = document.createElement('option');
				        option.text = 'No available times';
				        option.disabled = true;
				        timeDropdown.appendChild(option);
				        return;
			      }
		    } 
		    else {
		    	currentTime.setMinutes(currentTime.getMinutes() + interval + 30);
		    	endTime.setMinutes(endTime.getMinutes() - 60);
		    }
	
		    while (currentTime <= endTime) {
			      const option = document.createElement('option');
			      option.value = currentTime.toTimeString().substring(0, 5);
			      option.text = formatTime(currentTime);
			      timeDropdown.appendChild(option);
		
			      // Increments the current time by the interval
			      currentTime.setMinutes(currentTime.getMinutes() + interval);
		    }
		  }
	}

	
	
	
	// Returns the day of the week (short name) for a given date
	function getDayOfWeek(date) {
	  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
	  const dayIndex = date.getDay();
	  return daysOfWeek[dayIndex];
	}
	
	
	
	// Parses a time string (e.g. '9:30am') into a Date object
	function parseTime(timeString) {
	  const [hour, minute, suffix] = timeString.match(/(\d+):(\d+)([ap]m)/).slice(1);
	  const hourNumber = parseInt(hour);
	  const minuteNumber = parseInt(minute);
	  let date = new Date();
	  date.setHours(hourNumber);
	  date.setMinutes(minuteNumber);
	  date.setSeconds(0);
	  if (suffix === 'pm' && hourNumber !== 12) {
	    date.setHours(hourNumber + 12);
	  }
	  return date;
	}
	
	
	
	// Formats a Date object as a string (e.g. '9:30 AM')
	function formatTime(time) {
	  const hour = time.getHours() % 12 || 12;
	  const minute = time.getMinutes().toString().padStart(2, '0');
	  const suffix = time.getHours() < 12 ? 'AM' : 'PM';
	  return `${hour}:${minute} ${suffix}`;
	}
	
	
	
	// Formats a Date object as a string (e.g. 'Mon, Mar 21')
	function formatDate(date) {
	  const options = { weekday: 'short', month: 'short', day: 'numeric' };
	  return date.toLocaleDateString('en-US', options);
	}
	
	// Returns an array of available time slots between openTime and closeTime
			
			
	
	//Add dropdowns to div
	laterDateSelectorDiv.appendChild(dateDropdown);
	laterDateSelectorDiv.appendChild(timeDropdown);

  