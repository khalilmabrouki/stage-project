function initAnimations() {
  const animationCards = document.querySelectorAll('.animation-card');
  
  if (animationCards.length === 0) return;

  animationCards.forEach(card => {
    const box = card.querySelector('.animation-box');
    const select = card.querySelector('.animation-select');
    const btn = card.querySelector('.animation-btn');

    if (box && select && btn) {
      // Store original classes
      const originalClasses = box.className;
      
      btn.addEventListener('click', () => {
        const animationName = select.value;
        if (!animationName) return;

        // Reset
        box.className = originalClasses;
        // Force reflow
        void box.offsetWidth;
        // Add animation
        box.classList.add('animate__animated', `animate__${animationName}`);
      });
    }
  });
}
