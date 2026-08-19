function initInteractiveRatings() {
  const ratingContainers = document.querySelectorAll('.rating-container:not(.read-only)');

  ratingContainers.forEach((container) => {
    const stars = container.querySelectorAll('.rating-star');
    const feedback = container.querySelector('.rating-value');

    stars.forEach((star, index) => {
      // Hover event
      star.addEventListener('mouseover', () => {
        resetStars(stars);
        highlightStars(stars, index);
      });

      // Mouseleave event
      star.addEventListener('mouseleave', () => {
        resetStars(stars);
        const selectedVal = parseInt(container.getAttribute('data-selected') || '0');
        if (selectedVal > 0) {
          highlightStars(stars, selectedVal - 1);
        }
      });

      // Click event
      star.addEventListener('click', () => {
        const value = index + 1;
        container.setAttribute('data-selected', value.toString());
        resetStars(stars);
        highlightStars(stars, index);
        
        if (feedback) {
          feedback.textContent = `You rated this ${value} star${value > 1 ? 's' : ''}!`;
          feedback.classList.remove('d-none');
        }
      });
    });
  });

  function highlightStars(stars, maxIndex) {
    for (let i = 0; i <= maxIndex; i++) {
      stars[i].classList.add('text-warning');
      stars[i].classList.remove('text-muted');
      // Fill the SVG
      const svg = stars[i].querySelector('svg');
      if (svg) {
        svg.setAttribute('fill', 'currentColor');
      }
    }
  }

  function resetStars(stars) {
    stars.forEach((star) => {
      star.classList.remove('text-warning');
      star.classList.add('text-muted');
      const svg = star.querySelector('svg');
      if (svg) {
        svg.setAttribute('fill', 'none');
      }
    });
  }
}
