(function() {
    'use strict';

    let filtersDiv;

    function addFiltersDiv() {
        var targetElement = document.querySelector('.MuiBox-root.css-7v0sgd');
        if (targetElement) {
            filtersDiv = document.createElement('div');
            filtersDiv.className = 'Filters';
            filtersDiv.style.marginBottom = '-25px';

            var personalButton = document.createElement('button');
            personalButton.innerText = 'Personal';

            var filterByNameButton = document.createElement('button');
            filterByNameButton.innerText = 'Filter by Name';
            filterByNameButton.className = 'dropdown-btn';

            var filterByColorButton = document.createElement('button');
            filterByColorButton.innerText = 'Filter by Color';
            filterByColorButton.className = 'dropdown-btn';

            var resetButton = document.createElement('button');
            resetButton.innerText = 'Reset';

            var dropdownMenuName = document.createElement('ul');
            dropdownMenuName.className = 'dropdown-menu';
            dropdownMenuName.style.display = 'none';

            var dropdownMenuColor = document.createElement('ul');
            dropdownMenuColor.className = 'dropdown-menu';
            dropdownMenuColor.style.display = 'none';

            let selectedNames = new Set();
            let selectedColors = new Set();

            personalButton.addEventListener('click', function() {
                resetFilters();
                var nameElement = document.querySelector('.MuiTypography-root.MuiTypography-subtitle1.MuiTypography-noWrap.css-aj6ovs');
                if (nameElement) {
                    var personalName = nameElement.innerText;
                    applyPersonalFilter(personalName);
                }
            });

            filterByNameButton.addEventListener('click', function() {
                if (dropdownMenuColor.style.display === 'block') {
                    dropdownMenuColor.style.display = 'none';
                }

                dropdownMenuName.style.display = dropdownMenuName.style.display === 'block' ? 'none' : 'block';
                dropdownMenuName.innerHTML = '';

                var names = new Set();
                var iconButtons = document.querySelectorAll('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-1n031t6');
                iconButtons.forEach(function(button) {
                    var ariaLabel = button.getAttribute('aria-label');
                    if (ariaLabel) {
                        var authorName = ariaLabel.match(/Author (.*?) -/);
                        if (authorName && authorName[1]) {
                            names.add(authorName[1]);
                        }
                    }
                });

                names.forEach(function(name) {
                    var listItem = document.createElement('li');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = name;
                    checkbox.checked = selectedNames.has(name);
                    listItem.style.color = 'black';
                    listItem.style.fontSize = '0.8rem';
                    listItem.style.whiteSpace = 'nowrap';
                    listItem.style.display = 'flex';
                    listItem.style.alignItems = 'center';
                    listItem.appendChild(checkbox);
                    var label = document.createElement('label');
                    label.appendChild(document.createTextNode(name));
                    label.style.marginLeft = '10px';
                    label.style.cursor = 'pointer';
                    listItem.appendChild(label);
                    checkbox.addEventListener('click', function(event) {
                        event.stopPropagation();
                    });
                    checkbox.addEventListener('change', function() {
                        if (checkbox.checked) {
                            selectedNames.add(name);
                        } else {
                            selectedNames.delete(name);
                        }
                        applyFilter();
                    });
                    label.addEventListener('click', function(event) {
                        event.stopPropagation();
                        checkbox.checked = !checkbox.checked;
                        checkbox.dispatchEvent(new Event('change'));
                    });
                    dropdownMenuName.appendChild(listItem);
                });

                applyFilter();
            });

            let isColorListPopulated = false;

            filterByColorButton.addEventListener('click', function() {
                if (dropdownMenuName.style.display === 'block') {
                    dropdownMenuName.style.display = 'none';
                }

                if (dropdownMenuColor.style.display === 'block') {
                    dropdownMenuColor.style.display = 'none';
                } else {
                    dropdownMenuColor.style.display = 'block';
                }

                if (isColorListPopulated) {
                    return;
                }

                var colors = new Set();
                var colorElements = document.querySelectorAll('.MuiBox-root.css-e8tykc');

                colorElements.forEach(function(element) {
                    var firstChild = element.firstElementChild;
                    if (firstChild) {
                        var text = firstChild.innerText.trim();
                        if (text) {
                            colors.add(text);
                        }
                    }
                });

                isColorListPopulated = true;

                colors.forEach(function(color) {
                    var listItem = document.createElement('li');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = color;
                    checkbox.checked = selectedColors.has(color);
                    listItem.style.color = 'black';
                    listItem.style.fontSize = '0.8rem';
                    listItem.style.whiteSpace = 'nowrap';
                    listItem.style.display = 'flex';
                    listItem.style.alignItems = 'center';
                    listItem.appendChild(checkbox);
                    var label = document.createElement('label');
                    label.appendChild(document.createTextNode(color));
                    label.style.marginLeft = '10px';
                    label.style.cursor = 'pointer';
                    listItem.appendChild(label);

                    checkbox.addEventListener('click', function(event) {
                        event.stopPropagation();
                    });
                    checkbox.addEventListener('change', function() {
                        if (checkbox.checked) {
                            selectedColors.add(color);
                        } else {
                            selectedColors.delete(color);
                        }
                        applyColorFilter();
                    });
                    label.addEventListener('click', function(event) {
                        event.stopPropagation();
                        checkbox.checked = !checkbox.checked;
                        checkbox.dispatchEvent(new Event('change'));
                    });

                    dropdownMenuColor.appendChild(listItem);
                });

                applyColorFilter();
            });

            function applyFilter() {
                var parentElements = document.querySelectorAll('.MuiBox-root.css-1rdqg8f');
                parentElements.forEach(function(parentElement) {
                    var iconButtons = parentElement.querySelectorAll('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-1n031t6');
                    var colorElements = parentElement.querySelectorAll('.MuiBox-root.css-e8tykc');
                    var matchesName = false;
                    var matchesColor = false;

                    if (selectedNames.size === 0) {
                        matchesName = true;
                    } else {
                        iconButtons.forEach(function(button) {
                            var ariaLabel = button.getAttribute('aria-label');
                            if (ariaLabel) {
                                selectedNames.forEach(function(name) {
                                    if (ariaLabel.includes(`Author ${name} -`)) {
                                        matchesName = true;
                                    }
                                });
                            }
                        });
                    }

                    if ((matchesName || selectedNames.size === 0) && (matchesColor || selectedColors.size === 0)) {
                        parentElement.style.display = '';
                    } else {
                        parentElement.style.display = 'none';
                    }
                });
            }

            function applyColorFilter() {
                var parentElements = document.querySelectorAll('.MuiBox-root.css-1rdqg8f');
                parentElements.forEach(function(parentElement) {
                    var colorElements = parentElement.querySelectorAll('.MuiBox-root.css-e8tykc');
                    var iconButtons = parentElement.querySelectorAll('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-1n031t6');
                    var matchesColor = false;
                    var matchesName = false;

                    if (selectedNames.size === 0) {
                        matchesName = true;
                    } else {
                        iconButtons.forEach(function(button) {
                            var ariaLabel = button.getAttribute('aria-label');
                            if (ariaLabel) {
                                selectedNames.forEach(function(name) {
                                    if (ariaLabel.includes(`Author ${name} -`)) {
                                        matchesName = true;
                                    }
                                });
                            }
                        });
                    }

                    colorElements.forEach(function(element) {
                        var text = element.firstElementChild ? element.firstElementChild.innerText.trim() : '';
                        if (selectedColors.has(text)) {
                            matchesColor = true;
                        }
                    });

                    if ((matchesColor || selectedColors.size === 0) && (matchesName || selectedNames.size === 0)) {
                        parentElement.style.display = '';
                    } else {
                        parentElement.style.display = 'none';
                    }
                });
            }

            function handleFilterToggle(type, value) {
                if (type === "name") {
                    if (selectedNames.has(value)) {
                        selectedNames.delete(value);
                    } else {
                        selectedNames.add(value);
                    }
                } else if (type === "color") {
                    if (selectedColors.has(value)) {
                        selectedColors.delete(value);
                    } else {
                        selectedColors.add(value);
                    }
                }

                applyFilter();
                applyColorFilter();
            }

            function applyPersonalFilter(personalName) {
                var parentElements = document.querySelectorAll('.MuiBox-root.css-1rdqg8f');
                parentElements.forEach(function(parentElement) {
                    var iconButtons = parentElement.querySelectorAll('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-1n031t6');
                    var matches = false;
                    iconButtons.forEach(function(button) {
                        var ariaLabel = button.getAttribute('aria-label');
                        if (ariaLabel && ariaLabel.includes(`Author ${personalName} -`)) {
                            matches = true;
                        }
                    });
                    parentElement.style.display = matches ? '' : 'none';
                });
            }

            function resetFilters() {
                var checkboxesName = dropdownMenuName.querySelectorAll('input[type="checkbox"]');
                checkboxesName.forEach(function(checkbox) {
                    checkbox.checked = false;
                });
                selectedNames.clear();

                var checkboxesColor = dropdownMenuColor.querySelectorAll('input[type="checkbox"]');
                checkboxesColor.forEach(function(checkbox) {
                    checkbox.checked = false;
                });
                selectedColors.clear();

                applyFilter();
                applyColorFilter();
                dropdownMenuName.style.display = 'none';
                dropdownMenuColor.style.display = 'none';
            }

            resetButton.addEventListener('click', resetFilters);

            var buttonStyle = {
                WebkitFontSmoothing: 'antialiased',
                textSizeAdjust: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxSizing: 'border-box',
                WebkitTapHighlightColor: 'transparent',
                outline: '0',
                border: '0',
                margin: '0 5px',
                cursor: 'pointer',
                userSelect: 'none',
                verticalAlign: 'middle',
                appearance: 'none',
                textDecoration: 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontWeight: '500',
                fontSize: '0.875rem',
                lineHeight: '1.75',
                textTransform: 'uppercase',
                minWidth: '64px',
                padding: '6px 16px',
                borderRadius: '4px',
                transition: 'none',
                color: 'rgb(255, 255, 255)',
                backgroundColor: 'rgb(33, 33, 33)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px'
            };

            var dropdownMenuStyle = {
                position: 'absolute',
                top: '100%',
                left: '0',
                backgroundColor: 'white',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                listStyle: 'none',
                padding: '0',
                margin: '0',
                zIndex: '9999'
            };

            var dropdownItemHoverStyle = {
                backgroundColor: '#f0f0f0'
            };

            Object.assign(personalButton.style, buttonStyle);
            Object.assign(filterByNameButton.style, buttonStyle);
            Object.assign(filterByColorButton.style, buttonStyle);
            Object.assign(resetButton.style, buttonStyle);
            Object.assign(dropdownMenuName.style, dropdownMenuStyle);
            Object.assign(dropdownMenuColor.style, dropdownMenuStyle);

            var style = document.createElement('style');
            style.innerHTML = `
                .Filters {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                }
                .Filters button {
                    display: block;
                    margin: auto;
                }
                .dropdown-menu li {
                    padding: 10px;
                    color: black;
                    font-size: 0.8rem;
                }
                .dropdown-menu li:hover {
                    background-color: ${dropdownItemHoverStyle.backgroundColor};
                }
            `;
            document.head.appendChild(style);

            filterByNameButton.appendChild(dropdownMenuName);
            filterByColorButton.appendChild(dropdownMenuColor);

            filtersDiv.appendChild(personalButton);
            filtersDiv.appendChild(filterByNameButton);
            filtersDiv.appendChild(filterByColorButton);
            filtersDiv.appendChild(resetButton);

            targetElement.parentNode.insertBefore(filtersDiv, targetElement.nextSibling);

            document.addEventListener('click', function(event) {
                if (!filtersDiv.contains(event.target)) {
                    dropdownMenuName.style.display = 'none';
                    dropdownMenuColor.style.display = 'none';
                }
            });

            applyFilter();
            applyColorFilter();
        }
    }

    function removeFiltersDiv() {
        if (filtersDiv && filtersDiv.parentNode) {
            filtersDiv.parentNode.removeChild(filtersDiv);
            filtersDiv = null;
        }
    }

    function waitForElement(selector, callback) {
        var element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else {
            setTimeout(function() {
                waitForElement(selector, callback);
            }, 500);
        }
    }

    function onUrlChange(callback) {
        let lastUrl = location.href;
        new MutationObserver(() => {
            const currentUrl = location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                callback();
            }
        }).observe(document, { subtree: true, childList: true });
    }

    function checkAndRunScript() {
        if (location.href.startsWith('https://madame.ynap.biz/worklist/')) {
            waitForElement('.MuiBox-root.css-7v0sgd', addFiltersDiv);
        } else {
            removeFiltersDiv();
        }
    }

    checkAndRunScript();

    onUrlChange(() => {
        checkAndRunScript();
    });
})();
