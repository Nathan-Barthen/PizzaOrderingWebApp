/*Used for itemPage.html
 * Used for the mainOptions div. Used in the lightNoramlExtra Div.
 * 		-Changes color of the box for the selected amount / size. 
 * 			(Ex. Cheese:  Light - Normal - Extra. Will change background color for selected option.)
 *  		(Also works for Side of Pizza options, if applicable (Left, Whole, Right).
*/
  
 //Change the background color for the amount options (Light, Normal, Extra).
  	const lightTexts = document.querySelectorAll("#lightText");
	const normalTexts = document.querySelectorAll("#normalText");
	const extraTexts = document.querySelectorAll("#extraText");
	
	lightTexts.forEach((lightText) => {
	  lightText.addEventListener("click", () => {
	    const parentDiv = lightText.closest("#lightNormalExtra");
	    const normalText = parentDiv.querySelector("#normalText");
	    const extraText = parentDiv.querySelector("#extraText");
	
	    lightText.style.backgroundColor = "rgb(255, 133, 77)";
	    normalText.style.backgroundColor = "rgb(255, 238, 230)";
	    extraText.style.backgroundColor = "rgb(255, 238, 230)";
	  });
	});
	
	normalTexts.forEach((normalText) => {
	  normalText.addEventListener("click", () => {
	    const parentDiv = normalText.closest("#lightNormalExtra");
	    const lightText = parentDiv.querySelector("#lightText");
	    const extraText = parentDiv.querySelector("#extraText");
	
	    lightText.style.backgroundColor = "rgb(255, 238, 230)";
	    normalText.style.backgroundColor = "rgb(255, 133, 77)";
	    extraText.style.backgroundColor = "rgb(255, 238, 230)";
	  });
	});
	
	extraTexts.forEach((extraText) => {
	  extraText.addEventListener("click", () => {
	    const parentDiv = extraText.closest("#lightNormalExtra");
	    const lightText = parentDiv.querySelector("#lightText");
	    const normalText = parentDiv.querySelector("#normalText");
	
	    lightText.style.backgroundColor = "rgb(255, 238, 230)";
	    normalText.style.backgroundColor = "rgb(255, 238, 230)";
	    extraText.style.backgroundColor = "rgb(255, 133, 77)";
	  });
	});
  
  
  //Change the background color for the Side of Pizza options, if applicable (Left, Whole, Right).
	const leftSideTexts = document.querySelectorAll("#leftSideText");
	const wholeSideTexts = document.querySelectorAll("#wholeSideText");
	const rightSideTexts = document.querySelectorAll("#rightSideText");

	leftSideTexts.forEach((leftSideText) => {
	  leftSideText.addEventListener("click", () => {
	    const parentDiv = leftSideText.closest("#lightNormalExtra");
	    const wholeSideText = parentDiv.querySelector("#wholeSideText");
	    const rightSideText = parentDiv.querySelector("#rightSideText");

	    leftSideText.style.backgroundImage = "conic-gradient(from 0deg, rgb(191, 191, 191) 50%,  rgb(255, 133, 77) 50%)";
	    wholeSideText.style.backgroundImage = "conic-gradient(from 0deg, rgb(255, 238, 230) 50%, rgb(255, 238, 230) 50%)";
	    rightSideText.style.backgroundImage = "conic-gradient(from 0deg,  rgb(255, 238, 230) 50%, rgb(191, 191, 191) 50%)";
	  });
	});

	wholeSideTexts.forEach((wholeSideText) => {
	  wholeSideText.addEventListener("click", () => {
	    const parentDiv = wholeSideText.closest("#lightNormalExtra");
	    const leftSideText = parentDiv.querySelector("#leftSideText");
	    const rightSideText = parentDiv.querySelector("#rightSideText");

	    leftSideText.style.backgroundImage = "conic-gradient(from 0deg, rgb(255, 238, 230) 50%,  rgb(191, 191, 191) 50%)";
	    wholeSideText.style.backgroundImage = "conic-gradient(from 0deg, rgb(255, 133, 77) 50%, rgb(255, 133, 77) 50%)";
	    rightSideText.style.backgroundImage = "conic-gradient(from 0deg,  rgb(255, 238, 230) 50%, rgb(191, 191, 191) 50%)";
	  });
	});

	rightSideTexts.forEach((rightSideText) => {
	  rightSideText.addEventListener("click", () => {
	    const parentDiv = rightSideText.closest("#lightNormalExtra");
	    const leftSideText = parentDiv.querySelector("#leftSideText");
	    const wholeSideText = parentDiv.querySelector("#wholeSideText");

	    leftSideText.style.backgroundImage = "conic-gradient(from 0deg, rgb(255, 238, 230) 50%,  rgb(191, 191, 191) 50%)";
	    wholeSideText.style.backgroundImage = "conic-gradient(from 0deg, rgb(255, 238, 230) 50%, rgb(255, 238, 230) 50%)";
	    rightSideText.style.backgroundImage = "conic-gradient(from 0deg,  rgb(255, 133, 77) 50%, rgb(191, 191, 191) 50%)";
	  });
	});
  

  
  