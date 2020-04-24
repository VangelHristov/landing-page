(function iife(){
    'use strict';

    const toggle = (...items) => {
        items.forEach(domElement => domElement.classList.toggle('hide'));
    };

    const changeNavColor = function (domElement){
        if (window.pageYOffset === 0) {
            domElement.style.background = 'none';
            return;
        }
        domElement.style.background = '#333333';
    };

    window.addEventListener('load', function (){
        const navContainer = document.querySelector('.nav-container');
        const navLinks     = document.querySelector('.nav-links');
        const navIcons     = document.querySelector('.nav-icons');
        const openMenu     = document.querySelector('#openSidebarMenu');
        const links        = document.querySelector('nav');

        links.addEventListener('click', function (event){
            const activeLink = document.querySelector('.nav-links .link.active');
            if (activeLink) {
                activeLink.classList.remove('active');
            }

            event.target.parentNode.classList.add('active');
        });

        openMenu.addEventListener('click', function (){
            toggle(navLinks, navIcons);
        });

        window.addEventListener('scroll', () => changeNavColor(navContainer));
        window.addEventListener('resize', () => changeNavColor(navContainer));
        window.addEventListener('load', () => changeNavColor(navContainer));
    });
})();
