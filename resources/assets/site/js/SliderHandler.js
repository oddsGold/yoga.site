export class SliderHandler {
    constructor(selector) {
        this.selector = selector;
        this.initSlider();
    }

    initSlider() {
        if ($(this.selector).length) {
            $(this.selector).slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: false,
                arrows: true,
                dots: true,
                prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
                nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
                customPaging: function (slider, i) {
                    return '<span class="my-dot"></span>';
                },
                responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        centerMode: false,
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: false,
                    }
                }]
            })
                .on('setPosition', function (event, slick) {
                    slick.$slides.css('height', slick.$slideTrack.height() + 'px');
                });
        }
    }
}
