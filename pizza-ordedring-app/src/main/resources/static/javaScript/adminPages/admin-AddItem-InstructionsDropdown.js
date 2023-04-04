/**
 * Used to control the dropdown (and content) of the topping instructions */

		const instructionsContent = document.getElementById('instructionsContent');
        var toggleInstructionsDiv = document.getElementById('instructionsTitleDiv');
        
        instructionsContent .style.display = 'none';
        toggleInstructionsDiv.addEventListener('click', function() {
            // If the content is currently shown, hide it
            if (instructionsContent .style.display === 'flex') {
            	instructionsContent .style.display = 'none';
            }
            // Otherwise, show the content
            else {
            	instructionsContent .style.display = 'flex';
            }
          });
                