// ==UserScript==
// @name         Optimize List
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Optimizing spacing and layout of the worklist
// @match        https://madame.ynap.biz/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let isSwitchOn = false; // Flag to check if the switch is on

    // Check if the current URL matches the desired pattern
    function isValidUrl() {
        return window.location.href.startsWith('https://madame.ynap.biz/worklist/');
    }

    // Change text content based on conditions
    function changeTextContent() {
        const allChildElements = document.querySelectorAll('.MuiBox-root.css-hfakad');

        allChildElements.forEach(element => {
            const textContainer = element.querySelector('.MuiBox-root.css-b6m7zh');
            if (textContainer) {
                const text = textContainer.textContent.trim();

                switch (text) {
                    case "Front Still Life":
                        textContainer.textContent = "Index";
                        break;
                    case "Outfit 1":
                        textContainer.textContent = "OU";
                        break;
                    case "Front Model":
                        textContainer.textContent = "FR";
                        break;
                    case "Back Model":
                        textContainer.textContent = "BK";
                        break;
                    case "Back Still Life":
                        textContainer.textContent = "BK";
                        break;
                    case "Outfit 2":
                        textContainer.textContent = "OU 2";
                        break;
                    case "Detail 1":
                        textContainer.textContent = "CU";
                        break;
                    case "Side Still Life":
                        textContainer.textContent = "E1";
                        break;
                    case "Detail 2":
                        textContainer.textContent = "E1";
                        break;
                    case "Detail 3":
                        textContainer.textContent = "E2";
                        break;
                    case "Detail 4":
                        textContainer.textContent = "E3";
                        break;
                    case "Extra 1":
                        textContainer.textContent = "E4";
                        break;
                    case "Extra 2":
                        textContainer.textContent = "E5";
                        break;
                }
            }
        });
    }

    // Function to change the color of all matching paths to magenta
    function changePathColor() {
        const paths = document.querySelectorAll('path[d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2"]');

        paths.forEach(path => {
            path.setAttribute('fill', 'rgb(243, 114, 16)');
        });
    }

    function removeMuiBoxClass() {
        const elements = document.querySelectorAll('.MuiBox-root.css-14s4iyf');
        elements.forEach(element => {
            element.remove();
        });
    }

    // Add ID to MuiBox elements
    function addIdToMuiBoxElements() {
        const parentElement = document.querySelector('.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation2.css-1m9yl2a');

        if (parentElement) {
            const boxElements = parentElement.children;

            Array.from(boxElements).forEach((box) => {
                if (box.classList.contains('MuiBox-root') && box.classList.contains('css-0')) {
                    if (!box.id) {
                        box.id = 'VID';
                    }
                }
            });
        } else {
            console.log('Parent .MuiPaper-root not found.');
        }
    }

    setTimeout(() => {
        addIdToMuiBoxElements();
    }, 2000);

    // Create the switch element
    function createSwitch() {
        const switchWrapper = document.createElement('div');
        switchWrapper.style.display = 'inline-block';

        const switchLabel = document.createElement('label');
        switchLabel.style.position = 'relative';
        switchLabel.style.display = 'inline-block';
        switchLabel.style.width = '50px';
        switchLabel.style.height = '24px';
        switchLabel.style.cursor = 'pointer';
        switchLabel.style.borderRadius = '50px';
        switchLabel.style.backgroundColor = '#ccc';
        switchLabel.style.transition = 'background-color 0.3s ease';

        const switchInput = document.createElement('input');
        switchInput.type = 'checkbox';
        switchInput.style.opacity = '0';
        switchInput.style.width = '0';
        switchInput.style.height = '0';

        const switchCircle = document.createElement('span');
        switchCircle.style.position = 'absolute';
        switchCircle.style.top = '4px';
        switchCircle.style.left = '4px';
        switchCircle.style.width = '16px';
        switchCircle.style.height = '16px';
        switchCircle.style.borderRadius = '50%';
        switchCircle.style.backgroundColor = '#fff';
        switchCircle.style.transition = 'transform 0.3s ease';

        switchLabel.appendChild(switchInput);
        switchLabel.appendChild(switchCircle);
        switchWrapper.appendChild(switchLabel);

        // Load saved state from localStorage
        const savedState = localStorage.getItem('switchState');
        if (savedState === 'on') {
            switchInput.checked = true;
            switchLabel.style.backgroundColor = '#4cd964';
            switchCircle.style.transform = 'translateX(26px)';
            hideElementsWithoutImages();
            isSwitchOn = true;
        } else {
            switchInput.checked = false;
            switchLabel.style.backgroundColor = '#ccc';
            switchCircle.style.transform = 'translateX(0)';
            showElementsWithoutImages();
            isSwitchOn = false;
        }

        // Toggle switch state
        switchInput.addEventListener('change', function() {
            if (switchInput.checked) {
                switchLabel.style.backgroundColor = '#4cd964';
                switchCircle.style.transform = 'translateX(26px)';
                hideElementsWithoutImages();
                localStorage.setItem('switchState', 'on');
                isSwitchOn = true;
            } else {
                switchLabel.style.backgroundColor = '#ccc';
                switchCircle.style.transform = 'translateX(0)';
                showElementsWithoutImages();
                localStorage.setItem('switchState', 'off');
                isSwitchOn = false;
            }
        });

        return switchWrapper;
    }

    // Create text element
    function createText() {
        const textWrapper = document.createElement('span');
        textWrapper.style.marginLeft = '10px';
        textWrapper.style.fontSize = '1rem';
        textWrapper.style.fontWeight = 'normal';
        textWrapper.style.color = '#333';
        textWrapper.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
        textWrapper.innerText = 'Optimize List';

        return textWrapper;
    }

    // Append switch and text to target element
    function appendSwitchAndTextToTarget() {
        const targetElementSelector = '.MuiGrid-root.MuiGrid-item.css-bl06vm';
        const targetElement = document.querySelector(targetElementSelector);

        // Prevent adding the switch if already present
        if (document.querySelector('.optimize-switch')) return;

        if (targetElement && isValidUrl()) {
            const switchElement = createSwitch();
            const textElement = createText();

            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'flex-start';  // Keep them aligned to the left
            container.style.width = 'auto';                  // Let the width auto-adjust based on content
            container.style.flexShrink = '0';                // Prevent shrinking
            container.classList.add('optimize-switch');      // Add class to avoid duplicates

            container.appendChild(switchElement);
            container.appendChild(textElement);

            container.style.marginTop = '14px';
            container.style.marginLeft = '20px';

            targetElement.insertAdjacentElement('afterend', container);
            console.log('Switch and "Optimize List" added after the target element.');
        } else {
            console.log('Target element not found, retrying...');
            setTimeout(appendSwitchAndTextToTarget, 1000); // Retry after 1 second
        }
    }

    // Function to limit width of .MuiBox-root.css-o744zt to 100% of the viewport
    function limitWidthToViewport() {
        const boxElement = document.querySelector('.MuiBox-root.css-o744zt');
        if (boxElement) {
            boxElement.style.width = '100vw';      // Limit the width to 100% of the viewport
            boxElement.style.maxWidth = '100vw';   // Ensure no width overflow
            boxElement.style.overflowX = 'hidden'; // Hide horizontal overflow (no horizontal scrollbar)
            boxElement.style.overflowY = 'auto';   // Allow vertical scrolling if content overflows
        }
    }

    // Function to hide elements without images
    function hideElementsWithoutImages() {
        const parentContainers = document.querySelectorAll('.MuiBox-root.css-caosg6');
        parentContainers.forEach(parentContainer => {
            const hasImage = parentContainer.querySelector('img') !== null;
            const boxZero = parentContainer.closest('.MuiBox-root.css-0');

            if (boxZero) {
                boxZero.style.display = hasImage ? '' : 'none';
            }

            const childElements = parentContainer.querySelectorAll('.MuiBox-root.css-hfakad');
            childElements.forEach(element => {
                const textContainer = element.querySelector('.MuiBox-root.css-b6m7zh');
                if (textContainer) {
                    const text = textContainer.textContent.trim();
                    if (!hasImage && text !== '') {
                        element.style.display = 'none';
                    } else {
                        element.style.display = '';
                    }
                }
            });
        });
    }

    // Function to show all elements without images
    function showElementsWithoutImages() {
        const parentContainers = document.querySelectorAll('.MuiBox-root.css-caosg6');
        parentContainers.forEach(parentContainer => {
            const boxZero = parentContainer.closest('.MuiBox-root.css-0');
            if (boxZero) {
                boxZero.style.display = '';
            }

            const childElements = parentContainer.querySelectorAll('.MuiBox-root.css-hfakad');
            childElements.forEach(element => {
                element.style.display = '';
            });
        });
    }

    // Observe URL changes and re-run the function
    function observeUrlChanges() {
        let currentUrl = window.location.href;

        setInterval(() => {
            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                console.log('URL changed, checking for target element...');
                if (isValidUrl()) {
                    appendSwitchAndTextToTarget();
                }
            }
        }, 1000); // Check every second
    }

    // Call the function to start observing the URL changes
    observeUrlChanges();

    // Initial run of the function when the page loads
    if (isValidUrl()) {
        appendSwitchAndTextToTarget();
        limitWidthToViewport();
    }
})();
