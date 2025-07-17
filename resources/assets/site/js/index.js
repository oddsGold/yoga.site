import.meta.glob([
    '../images/**',
]);
// import { NavbarHandler } from './NavbarHandler.js';
import { SliderHandler } from './SliderHandler.js';

// const navbarHandler = new NavbarHandler();
$(document).ready(function() {
    const popularSlider = new SliderHandler('.popular');
});



