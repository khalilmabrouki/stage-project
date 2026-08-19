function initWizard() {
  const wizardNavBtns = document.querySelectorAll('.wizard-step-btn');
  const wizardSteps = document.querySelectorAll('.wizard-step');
  const btnPrev = document.getElementById('wizard-prev');
  const btnNext = document.getElementById('wizard-next');
  const btnSubmit = document.getElementById('wizard-submit');
  const progressBar = document.querySelector('.wizard-progress-bar');
  
  if (!wizardNavBtns.length || !wizardSteps.length) return;

  let currentStep = 0;
  const totalSteps = wizardSteps.length;

  function updateWizard() {
    // Update nav buttons
    wizardNavBtns.forEach((btn, index) => {
      if (index === currentStep) {
        btn.classList.add('active', 'btn-primary');
        btn.classList.remove('btn-light', 'text-secondary');
      } else if (index < currentStep) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-light', 'text-secondary', 'active');
      } else {
        btn.classList.remove('active', 'btn-primary');
        btn.classList.add('btn-light', 'text-secondary');
      }
    });

    // Update progress bar
    if (progressBar) {
      const progress = (currentStep / (totalSteps - 1)) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Show/hide steps
    wizardSteps.forEach((step, index) => {
      if (index === currentStep) {
        step.classList.remove('d-none');
        step.classList.add('active');
      } else {
        step.classList.add('d-none');
        step.classList.remove('active');
      }
    });

    // Update action buttons
    if (currentStep === 0) {
      btnPrev.classList.add('d-none');
    } else {
      btnPrev.classList.remove('d-none');
    }

    if (currentStep === totalSteps - 1) {
      btnNext.classList.add('d-none');
      btnSubmit.classList.remove('d-none');
    } else {
      btnNext.classList.remove('d-none');
      btnSubmit.classList.add('d-none');
    }
  }

  function validateStep(stepIndex) {
    const step = wizardSteps[stepIndex];
    const inputs = step.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      step.classList.add('was-validated');
    }
    return isValid;
  }

  // Event listeners
  btnNext?.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;
    
    if (currentStep < totalSteps - 1) {
      currentStep++;
      updateWizard();
    }
  });

  btnPrev?.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateWizard();
    }
  });

  wizardNavBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // Validate before moving forward
      if (index > currentStep) {
        if (!validateStep(currentStep)) return;
      }
      currentStep = index;
      updateWizard();
    });
  });

  // Initialize
  updateWizard();
}
