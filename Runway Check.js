(function() {
    'use strict';

    // Flag to track if matches are found
    let matchesFound = false;

    // Function to check and add the <p> element
    function checkForRunway() {
        // Get all elements with the class "MuiTypography-root MuiTypography-body2 css-1vrac05" for <p>
        const paragraphs = document.querySelectorAll('.MuiTypography-root.MuiTypography-body2.css-1vrac05');

        let matched = false; // Flag to check if we found any matches

        paragraphs.forEach(paragraph => {
            const text = paragraph.textContent.trim();

            // Check if the text contains "RUNWAY" or "LOOK" (case-insensitive)
            if ((text.toUpperCase().includes("RUNWAY") || text.toUpperCase().includes("LOOK"))) {

                // Check if the message has already been added to avoid duplicates
                if (!paragraph.parentElement.querySelector('.runway-check-message')) {

                    // Create a new <p> element with bold red text
                    const newElement = document.createElement('p');
                    newElement.className = 'runway-check-message'; // Add a class for future reference
                    newElement.style.fontWeight = 'bold';
                    newElement.style.margin = '0';
                    newElement.style.color = 'red';
                    newElement.style.fontSize = '0.9em'; // Adjust font size slightly smaller
                    newElement.style.whiteSpace = 'nowrap'; // Prevent wrapping, making it fit on one line
                    newElement.textContent = 'Check for Runway';

                    // Insert the new <p> after the current <p>
                    paragraph.parentNode.insertBefore(newElement, paragraph.nextSibling);
                }

                matched = true; // Set flag to true if we found at least one match
            }
        });

        // If matches are found, stop the observer
        if (matched && !matchesFound) {
            matchesFound = true; // Set the flag to indicate that matches are found
            observer.disconnect(); // Stop the observer once matches are found
        }
    }

    // Mutation observer to monitor changes in the DOM and run checkForRunway when necessary
    const observer = new MutationObserver(() => {
        checkForRunway(); // Run the function to check for matches
    });

    // Start observing the body for added or changed nodes
    observer.observe(document.body, { childList: true, subtree: true });

    // Run initial check on page load
    window.addEventListener('load', () => {
        checkForRunway();
    });

})();

