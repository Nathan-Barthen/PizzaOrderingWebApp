  
 /* Used for all pages
 *  Used for the insert the html for the header at the top of every page. 
 *  
*/

	const categoryNames = [];
		document.querySelectorAll('[id^="categoryName"]').forEach((el) => {
		  categoryNames.push(el.textContent);
		});
		console.log(categoryNames);
	
	const contentDiv = document.querySelector(".content");
	const pageBody = document.querySelector("#pageBody");

	//IF the [+] is clicked created the div for the topping, and append div above the [+]
	
	  
	  const mainHeader = document.createElement("div");
	  mainHeader.id = "topHeader";
	  mainHeader.innerHTML = `
	  
			
			<div id="logo">
				<img id="pizzaLogo" src="/images/PizzaLogo.jpg">
			</div>
			<div id="hours">
				<div id="operatingHours">Hours</div>
					<div id="hiddenOperatingHours">
						<div id="day">Mon: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Tue: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Wed: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Thr: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Fri: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Sat: <span id="dayHours"> 11:00am - 7:00pm </span>	</div>
						<div id="day">Sun: <span id="dayHours"> Closed </span>				</div>
					
					</div>
				<div id="openClosed">Open</div>
			</div>
		
		<div id="${categoryNames[0].toString().toLowerCase()}">
		    <span id="${categoryNames[0].toString().toLowerCase()}Text">${categoryNames[0]}</span>
		</div>
		<div id="hidden${categoryNames[0].toString()}">
		    <div id="item">Custom Pizzas</div>
		    <div id="item">Pepperoni Pizzas</div>
		    <div id="item">Three Meat Pizzas</div>
		</div>
		<div id="${categoryNames[1].toString().toLowerCase()}">
		    <span id="${categoryNames[1].toString().toLowerCase()}Text">${categoryNames[1]}</span>
		</div>
		<div id="hidden${categoryNames[1].toString()}">
		    <div id="item">Breadsticks</div>
		    <div id="item">Cheesesticks</div>
		    <div id="item">Motz Sticks</div>
		    <div id="item">Pretzel Sticks</div>
		</div>
		<div id="${categoryNames[2].toString().toLowerCase()}">
		    <span id="${categoryNames[2].toString().toLowerCase()}Text">${categoryNames[2]}</span>
		</div>
		<div id="hidden${categoryNames[2].toString()}">
		    <div id="item">Ranch Wings</div>
		    <div id="item">Mild Wings</div>
		    <div id="item">Boneless Wings</div>
		</div>
		<div id="${categoryNames[3].toString().toLowerCase()}">
		    <span id="${categoryNames[3].toString().toLowerCase()}Text">${categoryNames[3]}</span>
		</div>
		<div id="hidden${categoryNames[3].toString()}">
		    <div id="item">Ziti ${categoryNames[3]}</div>
		    <div id="item">Spaghetti ${categoryNames[3]}</div>
		</div>
		<div id="${categoryNames[4].toString().toLowerCase()}">
		    <span id="${categoryNames[4].toString().toLowerCase()}Text">${categoryNames[4]}</span>
		</div>
		<div id="hidden${categoryNames[4].toString()}">
		    <div id="item">Pepperoni ${categoryNames[4]}</div>
		    <div id="item">Steak ${categoryNames[4]}</div>
		    <div id="item">Beef ${categoryNames[4]}</div>
		</div>
		<div id="${categoryNames[5].toString().toLowerCase()}">
		    <span id="${categoryNames[5].toString().toLowerCase()}Text">${categoryNames[5]}</span>
		</div>
		<div id="hidden${categoryNames[5].toString()}">
		    <div id="item">${categoryNames[5]} Cake</div>
		    <div id="item">${categoryNames[5]} Brownie</div>
		</div>
		<div id="${categoryNames[6].toLowerCase()}">
	    	<span id="${categoryNames[6].toLowerCase()}Text">${categoryNames[6]}</span>
		</div>
		<div id="hidden${categoryNames[6].toString()}">
		    <div id="item">Mt Dew</div>
		    <div id="item">Coke</div>
		    <div id="item">Root Beer</div>
		</div>
		<div id="${categoryNames[7].toLowerCase()}">
		    <span id="${categoryNames[7].toLowerCase()}Text">${categoryNames[7]}</span>
		</div>
		<div id="hidden${categoryNames[7].toString()}">
		    <div id="item">Salad</div>
		    <div id="item">Dips</div>
		</div>
		<div id="spaceBetween"></div>
		<div id="login">Login-in | Sign-up</div>
		<div id="checkout">Checkout</div>

		
				
		`;
	
		contentDiv.insertBefore(mainHeader, contentDiv.firstChild);
	
	
	
	
	
  