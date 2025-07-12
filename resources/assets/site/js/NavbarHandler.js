export class NavbarHandler {
    constructor() {
        this.initNavLinks();
        this.initHamburger();
        this.initNavbarToggler();
        this.initResizeHandler();
    }

    initNavLinks() {
        document.querySelectorAll('.nav-link:not(.nav-link__disable)').forEach(anchor => {
            anchor.addEventListener('click', this.handleNavLinkClick.bind(this));
        });
    }

    handleNavLinkClick(event) {
        event.preventDefault();

        const hamburgerElement = document.querySelector('.js-hamburger');
        const targetId = event.target.getAttribute('href');

        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });

        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');

            document.body.classList.remove('no-scroll');
            hamburgerElement.classList.remove('is-active');
        }
    }

    initHamburger() {
        document.querySelector('.js-hamburger').addEventListener('click', this.toggleHamburger.bind(this));
    }

    toggleHamburger(event) {
        event.currentTarget.classList.toggle('is-active');
    }

    initNavbarToggler() {
        document.addEventListener('DOMContentLoaded', () => {
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('#navbarSupportedContent');

            navbarToggler.addEventListener('click', () => {
                document.body.classList.toggle('no-scroll', navbarCollapse.classList.contains('show'));
            });

            navbarCollapse.addEventListener('hidden.bs.collapse', () => {
                document.body.classList.remove('no-scroll');
            });

            navbarCollapse.addEventListener('shown.bs.collapse', () => {
                document.body.classList.add('no-scroll');
            });
        });
    }

    initResizeHandler() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        const screenWidth = window.innerWidth;
        const navbarCollapse = document.querySelector('#navbarSupportedContent');

        if (screenWidth >= 992 && navbarCollapse.classList.contains('show')) {
            const navbarToggle = document.querySelector('.navbar-toggler');
            navbarToggle.click();
        }
    }
}
