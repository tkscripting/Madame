(function () {
    'use strict';

    // ========== RUNWAY & MATCH CHECK ==========
    let runwayMatchedOnce = false;

    function checkForRunway() {
        const paragraphs = document.querySelectorAll('.MuiTypography-root.MuiTypography-body2.css-1vrac05');

        paragraphs.forEach(paragraph => {
            const text = paragraph.textContent.trim().toUpperCase();
            if ((text.includes("RUNWAY") || text.includes("LOOK")) &&
                !paragraph.parentElement.querySelector('.runway-check-message')) {

                const newElement = document.createElement('p');
                newElement.className = 'runway-check-message';
                newElement.style.fontWeight = 'bold';
                newElement.style.margin = '0';
                newElement.style.color = 'red';
                newElement.style.fontSize = '0.9em';
                newElement.style.whiteSpace = 'nowrap';
                newElement.textContent = 'Check for Runway';

                paragraph.parentNode.insertBefore(newElement, paragraph.nextSibling);
                runwayMatchedOnce = true;
            }
        });
    }

    function findMatches() {
        const headerEl = document.querySelector('.MuiTypography-root.MuiTypography-subtitle1.MuiTypography-noWrap.css-uznm26');
        if (headerEl) {
            const headerText = headerEl.textContent.trim();
            if (headerText.includes('FW') || headerText.includes('FJ')) {
                return;
            }
        }

        const items = Array.from(document.querySelectorAll('.MuiBox-root.css-0'));
        const data = [];

        items.forEach((box, index) => {
            const brandEl = box.querySelector('.css-biu9sh');
            const colorEl = box.querySelector('.MuiTypography-root.MuiTypography-body2.css-1pngg4p');
            const descEl = box.querySelector('.MuiTypography-root.MuiTypography-body2.css-1vrac05');
            const vidEl = box.querySelector('.css-1nyh8gd');

            if (brandEl && colorEl && descEl && vidEl) {
                const brand = brandEl.textContent.trim();
                const color = colorEl.textContent.trim();
                let vid = vidEl.textContent.trim();

                if (color.toLowerCase() === 'unknown') return;

                const vidNumbers = vid.split(' ').map(num => num.trim());
                if (vidNumbers.length > 1) {
                    const largerVid = vidNumbers.reduce((max, num) => (num.length > max.length ? num : max), "");
                    vid = largerVid;
                }

                data.push({
                    index,
                    box,
                    descContainer: descEl.parentElement,
                    brand,
                    color,
                    vid
                });
            }
        });

        data.forEach((item, i) => {
            const matches = data.filter((other, j) =>
                i !== j && item.brand === other.brand && item.color === other.color
            );

            if (matches.length > 0) {
                const alreadyAppended = item.descContainer.querySelector('.match-label');
                if (!alreadyAppended) {
                    const p = document.createElement('p');
                    p.textContent = 'Possible Match';
                    p.className = 'match-label';
                    p.style.color = '#a64ac9';
                    p.style.margin = '4px 0 0 0';
                    p.style.fontWeight = 'bold';
                    item.descContainer.appendChild(p);
                }

                const existingVids = Array.from(item.descContainer.querySelectorAll('.match-vid')).map(el => el.textContent);

                matches.forEach(match => {
                    if (!existingVids.includes(match.vid)) {
                        const vidLine = document.createElement('p');
                        vidLine.textContent = match.vid;
                        vidLine.className = 'match-vid';
                        vidLine.style.color = '#a64ac9';
                        vidLine.style.margin = '0';
                        vidLine.style.fontSize = '0.8em';
                        item.descContainer.appendChild(vidLine);
                    }
                });
            }
        });
    }

    function safeRunAllChecks(retries = 10) {
        if (document.querySelector('.MuiBox-root.css-0')) {
            checkForRunway();
            findMatches();
        } else if (retries > 0) {
            setTimeout(() => safeRunAllChecks(retries - 1), 500);
        }
    }

    const unifiedObserver = new MutationObserver(() => {
        checkForRunway();
        findMatches();
    });

    unifiedObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('load', () => {
        safeRunAllChecks();
    });

})();
