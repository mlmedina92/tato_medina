// función de carrusel jqery
$(".slider-nav").slick({
  dots: true, //puntitos navegacion
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 400,
  speed: 400,
  slidesToShow: 4,
  slidesToScroll: 1, // scrolear de a 1
  lazyLoad: 'ondemand',

  responsive: [
    {
      breakpoint: 1024, //tablet
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600, //mobile
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
});
