(function () {
    'use strict';

    // React-compatible input injection
    function simulateReactInput(element, value) {
        const prototype = element instanceof HTMLTextAreaElement
            ? HTMLTextAreaElement.prototype
            : HTMLInputElement.prototype;

        const nativeSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
        nativeSetter.call(element, value);
        element.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function extractPIDsOnly(productString) {
        const pidMatches = productString.match(/\b\d{6,7}\b/g);
        return pidMatches && pidMatches.length > 0 ? [pidMatches, "pids"] : undefined;
    }

    function productStringConvert(pidArray) {
        return "[" + pidArray.map(p => `"${p}"`).join(",") + "]";
    }

    async function matchmakerTranslate(pids, matchmakerSearch) {
        const response = await fetch(`https://matchmaker-api.product.ynapgroup.com/${matchmakerSearch}`, {
            credentials: "omit",
            headers: {
                accept: "application/json, text/plain, */*",
                clientid: "pidConverter",
                "content-type": "application/json;charset=UTF-8"
            },
            referrerPolicy: "no-referrer",
            body: productStringConvert(pids),
            method: "POST",
            mode: "cors"
        });

        const jsonResponse = await response.json();
        return jsonResponse.matches;
    }

    document.addEventListener('paste', async (e) => {
        const pastedText = (e.clipboardData || window.clipboardData).getData('text').trim();
        const product = extractPIDsOnly(pastedText);

        if (!product) return;

        const [pids, type] = product;
        const matches = await matchmakerTranslate(pids, type);

        if (matches && matches.length > 0) {
            const translatedList = matches.map(m => m.translatedId).join(' ');
            const input = e.target;
            if (input && typeof input.value === 'string') {
                e.preventDefault();
                simulateReactInput(input, translatedList);
            }
        } else {
            alert(`No VID matches found for pasted PIDs. Please double-check at https://matchmaker.product.ynapgroup.com/`);
        }
    }, true);
})();
