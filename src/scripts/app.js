// import namedColors from 'color-name-list';
const Color = require('color');

const colorCaptions = document.querySelectorAll('.color-choice__caption');
const colorElements = document.querySelectorAll('.color-choice');
const drawnColorText = document.querySelector('.game-dashboard__color-name > span');
const changeCurrentColorOfElements = document.querySelector('.game-dashboard__randomize-colors');
const selectColorSystem = document.querySelector('.game-dashboard__change-color-system');
const submitAnswerButton = document.querySelector('.game-dashboard__submit-answer');
const correctAnswersAmount = document.querySelector('.statistics-dashboard__info_correct');
const finalPoints = document.querySelector('.statistics-dashboard__info_points');
const badAnswersAmount = document.querySelector('.statistics-dashboard__info_incorrect');
const correctColorNotification = document.querySelector('.drawn-color-pop-up');
const randomizeRgbColorValues = () => {
    const rValueFromRGB = Math.round(Math.random() * 255);
    const gValueFromRGB = Math.round(Math.random() * 255);
    const bValueFromRGB = Math.round(Math.random() * 255);
    return `rgb(${rValueFromRGB}, ${gValueFromRGB}, ${bValueFromRGB})`;
};
const returnElementsToInitialState = () => {
    submitAnswerButton.removeAttribute('disabled', '')
    colorElements.forEach((el) => {
        el.firstElementChild.textContent = 'Reveal color';
        el.removeAttribute('disabled', '');
        el.firstElementChild.checked = false;
    });
    colorCaptions.forEach((el) => {
        el.classList.remove('revealed');
        el.textContent = 'Reveal color';
        el.classList.remove('revealed');
    });
};

const renderElementsWithRandomColors = () => {
    colorElements.forEach((el) => {
        el.style.backgroundColor = `${randomizeRgbColorValues()}`;
    });
    drawnColorText.textContent = colorElements[Math.round(Math.random() * (colorElements.length - 1))].style.backgroundColor;
};

window.addEventListener('DOMContentLoaded', renderElementsWithRandomColors);

changeCurrentColorOfElements.addEventListener('click', () => {
    returnElementsToInitialState()
    renderElementsWithRandomColors();
});
colorCaptions.forEach((captionEl) => {
    captionEl.addEventListener('click', () => {
        captionEl.classList.add('revealed');
        const parent = captionEl.closest('.color-choice');
        captionEl.textContent = parent.style.backgroundColor;
    });
});

const validateAnswerFromUser = (button) => {
    colorElements.forEach((colorElement) => {
        const checkboxState = colorElement.firstElementChild.checked;
        const currentBackgroundValue = colorElement.style.backgroundColor;
        if (checkboxState && currentBackgroundValue === drawnColorText.textContent) {
            correctAnswersAmount.value++;
            submitAnswerButton.setAttribute('disabled', '');
            correctColorNotification.classList.add('active')
            setTimeout(() => {
                correctColorNotification.classList.remove('active')
            }, 4000)
            correctColorNotification.addEventListener('click', () => {
                correctColorNotification.classList.remove('active')
            })
        } else if (checkboxState && currentBackgroundValue !== drawnColorText) {
            colorElement.firstElementChild.checked = false
            badAnswersAmount.value++
            colorElement.setAttribute('disabled', '');
        }
    });
};

submitAnswerButton.addEventListener('click', ({ target }) => {
    console.log(target)
    validateAnswerFromUser(target);
});