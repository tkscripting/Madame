// ==UserScript==
// @name         Clear Colors
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Makes the colors on the work list stand out more
// @author       Tyler
// @match        https://madame.ynap.biz/worklist/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const isValidColor = (str) => {
        const s = new Option().style;
        s.color = str;
        return s.color !== '';
    };

    const commonStyles = {
        color: 'white',
        borderRadius: "15px",
        paddingLeft: '10px',
        paddingRight: '10px',
        fontWeight: 'bold'
    };

    const removeClass = () => {
        const elements = document.querySelectorAll('.MuiBox-root.css-1wnzdoc');
        elements.forEach((element) => {
            element.classList.remove('MuiBox-root', 'css-1wnzdoc');
        });
    };

    const changeTextColor = () => {
        removeClass();
        const elements = document.querySelectorAll('.MuiTypography-root.MuiTypography-body2.css-1pngg4p');

        elements.forEach((element) => {
            const text = element.textContent.trim();

            if (text === "Multi") {
                element.style.background = 'linear-gradient(to right, red, orange, green, blue, indigo, violet)';
                element.style.backgroundSize = '100% 100%';
                Object.assign(element.style, commonStyles);
            }
            else if (text === "White") {
                element.style.background = 'white';
                element.style.border = '1px solid black';
                Object.assign(element.style, commonStyles);
                element.style.color = "black";
            }
            else if (text === "Ivory") {
                element.style.backgroundColor = '#dbdbc3';
                Object.assign(element.style, commonStyles);
            }
            else if (text === "Beige") {
                element.style.backgroundColor = '#c9c5b1';
                Object.assign(element.style, commonStyles);
            }
            else if (text === "Ecru") {
                element.style.backgroundColor = '#e0cd95';
                Object.assign(element.style, commonStyles);
            }
            else if (text === "Dark brown") {
                element.style.backgroundColor = '#4B2C20';
                Object.assign(element.style, commonStyles);
            }
            else if (text === "Taupe") {
                element.style.backgroundColor = '#ab8f76';
                Object.assign(element.style, commonStyles);
            }
            else if (text === "Cream") {
                element.style.backgroundColor = '#d9d7b6';
                Object.assign(element.style, commonStyles);
            }
            else if (text === "Camel") {
                element.style.backgroundColor = '#C19A6B';
                Object.assign(element.style, commonStyles);
            }
            else if (text === "Off-white") {
                element.style.backgroundColor = '#c9c8c7';
                Object.assign(element.style, commonStyles);
            }
            else if (isValidColor(text)) {
                element.style.backgroundColor = text;
                Object.assign(element.style, commonStyles);
            }
        });
    };

    window.addEventListener('load', changeTextColor);
    setInterval(changeTextColor, 1000);
})();
