(function() {
    'use strict';

    function matchmakerTranslate(singleProduct, matchmakerSearch) {
        return fetch(`https://matchmaker-api.product.ynapgroup.com/${matchmakerSearch}`, {
            credentials: 'omit',
            headers: {
                accept: 'application/json, text/plain, */*',
                clientid: 'pidConverter',
                'content-type': 'application/json;charset=UTF-8',
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(singleProduct),
            method: 'POST',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(jsonResponse => {
            let matchedResponses = jsonResponse.matches;
            if (matchedResponses.length === 0) {
                console.warn(`No match found for ${matchmakerSearch}.`);
                return null;
            } else {
                return matchedResponses[0].translatedId;
            }
        }).catch(error => {
            console.error("Matchmaker request failed:", error);
            return null;
        });
    }

    function checkProduct(productString) {
        if (productString.match(/\d{10,19}/g)) {
            return [productString.match(/\d{10,19}/g), 'variants'];
        } else if (productString.match(/\d{6,7}/g)) {
            return [productString.match(/\d{6,7}/g), 'pids'];
        } else {
            return undefined;
        }
    }

    function addPidToWorklist() {
        const elements = document.querySelectorAll('.css-1nyh8gd');
        elements.forEach(element => {
            if (element.dataset.pidAdded) return;  // Prevent duplicate processing

            const number = element.textContent.trim();
            const product = checkProduct(number);

            if (product) {
                element.dataset.pidAdded = "true"; // Mark as processed to prevent duplication

                matchmakerTranslate(product[0], product[1]).then(resultNumber => {
                    if (resultNumber) {
                        const resultNode = document.createTextNode(resultNumber + ' ');
                        element.insertBefore(resultNode, element.firstChild);
                    }
                });
            }
        });
    }

    function monitorPage() {
        setInterval(() => {
            if (document.querySelector('.css-1nyh8gd')) {
                addPidToWorklist();
            }
        }, 500);
    }

    function initializeScript() {
        monitorPage();
    }

    window.addEventListener('DOMContentLoaded', initializeScript);
    window.addEventListener('load', initializeScript);
})();
