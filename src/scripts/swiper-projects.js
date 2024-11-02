const project_swiper = new Swiper(".our-projects__swiper", {
  slidesPerView: 1,
  spaceBetween: 64,

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
  },

  navigation: {
    nextEl: ".our-projects__swiper-button-next",
    prevEl: ".our-projects__swiper-button-prev",
  },
});
