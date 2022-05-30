const contentSections = document.querySelectorAll('.info-card');

contentSections.forEach((section) => {
    section.addEventListener('click', () => {
        const sectionTopicName = section.dataset.sectionName;
        console.log(sectionTopicName)
    })
})