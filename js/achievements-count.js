(function (){
    'use strict';

    const count = function (elements){
        let start    = 0;
        const values = [];
        elements.forEach(el => values.push(parseInt(el.dataset.value, 10)));
        const end = Math.max(...values);

        const interval = setInterval(function (){
            elements.forEach(element => {
                if (element.dataset.value >= start) {
                    element.textContent = start;
                }

                if (start === end) {
                    clearInterval(interval);
                }
            });

            start += 1;
        }, 10);
    };

    const container = document.querySelector(".achievements-container");
    const onScroll  = function (){
        const top    = window.pageYOffset;
        const bottom = window.pageYOffset + window.innerHeight;

        const rect      = container.getBoundingClientRect();
        const topBorder = rect.top + document.body.scrollTop;
        const height    = parseInt(window.getComputedStyle(container).height, 10);
        if (
            /* scrolling down */
            (topBorder >= top && topBorder + height <= bottom) ||
            /* scrolling up*/
            (topBorder <= top && topBorder + height < 0)
        ) {
            count(document.querySelectorAll(('.achievement-count')));
        }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
}());
