// import namedColors from 'color-name-list';
const Color = require('color');

const colorCaptions = document.querySelectorAll('.color-choice__caption');
const colorElements = document.querySelectorAll('.color-choice');
const drawnColorText = document.querySelector('.game-dashboard__color-name > span');
const changeCurrentColorOfElements = document.querySelector('.game-dashboard__randomize-colors');
const selectColorSystem = document.querySelector('.game-dashboard__change-color-system');
const submitAnswerButton = document.querySelector('.game-dashboard__submit-answer');
const randomizeRgbColorValues = () => {
    const rValueFromRGB = Math.round(Math.random() * 255);
    const gValueFromRGB = Math.round(Math.random() * 255);
    const bValueFromRGB = Math.round(Math.random() * 255);
    return `rgb(${rValueFromRGB}, ${gValueFromRGB}, ${bValueFromRGB})`;
};

const renderElementsWithRandomColors = () => {
    colorElements.forEach((el) => {
        el.style.backgroundColor = `${randomizeRgbColorValues()}`;
        el.firstElementChild.textContent = 'Reveal color';
        el.firstElementChild.classList.remove('revealed');
        console.log(Math.round(Math.random() * colorElements.length));
        el.removeAttribute('disabled', '');
        el.firstElementChild.checked = false;
    });
    colorCaptions.forEach(el => {
        el.classList.remove('revealed')
        el.textContent = 'Reveal color';
    })
    
    drawnColorText.textContent = colorElements[Math.round(Math.random() * colorElements.length)].style.backgroundColor;
};

window.addEventListener('DOMContentLoaded', renderElementsWithRandomColors);

changeCurrentColorOfElements.addEventListener('click', renderElementsWithRandomColors);
colorCaptions.forEach((captionEl) => {
    captionEl.addEventListener('click', () => {
        captionEl.classList.add('revealed');
        const parent = captionEl.closest('.color-choice');
        captionEl.textContent = parent.style.backgroundColor;
    });
});

// selectColorSystem.addEventListener('blur', () => {
//     const currectDrawnColor = drawnColorText.textContent;
//     console.log(currectDrawnColor);
//     switch (selectColorSystem.value) {
//         case 'RGB':
//             drawnColorText.textContent = Color(currectDrawnColor).rgb();
//             console.log(drawnColorText);
//             break;
//         case 'HEX':
//             drawnColorText.textContent = Color(currectDrawnColor).hex();
//             console.log(drawnColorText);
//             break;
//         case 'HSL':
//             drawnColorText.textContent = Color(currectDrawnColor).hsl();
//             console.log(drawnColorText);
//             break;
//     }
// });

const validateAnswerFromUser = () => {
    colorElements.forEach((colorElement) => {
        const checkboxState = colorElement.firstElementChild.checked;
        const currentBackgroundValue = colorElement.style.backgroundColor;
        if (checkboxState && currentBackgroundValue === drawnColorText.textContent) {
            console.log(currentBackgroundValue === drawnColorText.textContent)
            console.log('you guessed that !');
        } else if (checkboxState && currentBackgroundValue !== drawnColorText) {
            colorElement.setAttribute('disabled', '')
        }
    });
};

submitAnswerButton.addEventListener('click', validateAnswerFromUser);
