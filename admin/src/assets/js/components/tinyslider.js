

function initTinySlider() {
  const basicCarousel = document.querySelector('.basic-carousel');
  if (basicCarousel) {
    tns({
      container: '.basic-carousel',
      items: 1,
      slideBy: 'page',
      autoplay: false,
      gutter: 15,
      nav: true,
      navPosition: 'bottom',
      controls: true,
      controlsPosition: 'bottom',
      responsive: {
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    });
  }

  const autoplayCarousel = document.querySelector('.autoplay-carousel');
  if (autoplayCarousel) {
    tns({
      container: '.autoplay-carousel',
      items: 2,
      slideBy: 1,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayButtonOutput: false,
      gutter: 20,
      nav: true,
      navPosition: 'bottom',
      controls: false,
      controlsPosition: 'bottom',
      responsive: {
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    });
  }
}
