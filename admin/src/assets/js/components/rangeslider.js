

function initRangeSliders() {
  const basicSlider = document.getElementById('slider-basic');
  if (basicSlider) {
    noUiSlider.create(basicSlider, {
      start: [50],
      connect: [true, false],
      range: {
        'min': 0,
        'max': 100
      }
    });
  }

  const tooltipSlider = document.getElementById('slider-tooltips');
  if (tooltipSlider) {
    noUiSlider.create(tooltipSlider, {
      start: [20, 80],
      connect: true,
      tooltips: [true, true],
      range: {
        'min': 0,
        'max': 100
      }
    });
  }

  const stepSlider = document.getElementById('slider-step');
  if (stepSlider) {
    noUiSlider.create(stepSlider, {
      start: [40],
      step: 10,
      connect: [true, false],
      tooltips: true,
      range: {
        'min': 0,
        'max': 100
      }
    });
  }

  const successSlider = document.getElementById('slider-success');
  if (successSlider) {
    noUiSlider.create(successSlider, {
      start: [60],
      connect: [true, false],
      range: {
        'min': 0,
        'max': 100
      }
    });
  }

  const dangerSlider = document.getElementById('slider-danger');
  if (dangerSlider) {
    noUiSlider.create(dangerSlider, {
      start: [30, 70],
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
    });
  }
}
