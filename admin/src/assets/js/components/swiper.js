

function initSwiperSliders() {
  const basicEl = document.querySelector('.swiper-basic');
  const cardsEl = document.querySelector('.swiper-cards');
  const multipleEl = document.querySelector('.swiper-multiple');

  if (basicEl) {
    new Swiper('.swiper-basic', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }

  if (cardsEl) {
    new Swiper('.swiper-cards', {
      effect: 'cards',
      grabCursor: true
    });
  }

  if (multipleEl) {
    new Swiper('.swiper-multiple', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      }
    });
  }

  const coverflowEl = document.querySelector('.swiper-coverflow');
  if (coverflowEl) {
    new Swiper('.swiper-coverflow', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }

  const verticalEl = document.querySelector('.swiper-vertical');
  if (verticalEl) {
    new Swiper('.swiper-vertical', {
      direction: 'vertical',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
}
