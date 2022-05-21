// import namedColors from 'color-name-list';

const colorCaptions = document.querySelectorAll('.color-choice__caption');
const colorElements = document.querySelectorAll('.color-choice');
const drawnColorText = document.querySelector('.game-dashboard__color-name');
const changeCurrentColorOfElements = document.querySelector('.game-dashboard__randomize-colors');
const randomizeRgbColorValues = () => {
    const rValueFromRGB = Math.round(Math.random() * 255);
    const gValueFromRGB = Math.round(Math.random() * 255);
    const bValueFromRGB = Math.round(Math.random() * 255);
    return `rgb(${rValueFromRGB}, ${gValueFromRGB}, ${bValueFromRGB})`;
};

const renderElementsWithRandomColors = () => {
    colorElements.forEach((el) => {
        el.style.backgroundColor = `${randomizeRgbColorValues()}`;
        el.firstElementChild.textContent = 'Reveal color'
        el.firstElementChild.classList.remove('revealed');
        console.log(Math.round(Math.random() * colorElements.length))
    }); 
    drawnColorText.textContent = `Your color is: ${colorElements[Math.round(Math.random() * colorElements.length)].style.backgroundColor}`;

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
