(function aboutCarousel(){
    'use strict';

    const nextOrFirst = function (domElement){
        return domElement.nextElementSibling
               ? domElement.nextElementSibling
               : domElement.parentElement.firstElementChild;
    };

    const toggleClass = (element, className) =>
        element.classList.toggle(className);

    const toggleOffCanvas = dataId =>
        document
            .querySelectorAll(`[data-for="${dataId}"`)
            .forEach(element => toggleClass(element, 'hidden'));

    const toggleCurrent = element => toggleClass(element, 'current');

    window.addEventListener('load', function (){
        setInterval(function (){
            const currentIndex = document.querySelector('.index.current');
            toggleCurrent(currentIndex);
            currentIndex.classList.remove('current');
            toggleOffCanvas(currentIndex.dataset.id);

            const nextIndex = nextOrFirst(currentIndex);
            toggleCurrent(nextIndex);
            toggleOffCanvas(nextIndex.dataset.id);
        }, 5000);
    });
})();
