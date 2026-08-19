class DirectionManager {
  constructor() {
    this.dir = localStorage.getItem('dir') || 'ltr';
    this.init();
  }

  init() {
    this.applyDirection(this.dir);
    this.bindEvents();
  }

  bindEvents() {
    const dirSwitcher = document.getElementById('dir-switcher');
    if (dirSwitcher) {
      dirSwitcher.addEventListener('click', () => {
        this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';
        this.applyDirection(this.dir);
        this.updateRadioInputs();
      });
    }

    const dirRadios = document.querySelectorAll('input[name="dir-mode"]');
    dirRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.dir = e.target.value;
          this.applyDirection(this.dir);
        }
      });
    });
    this.updateRadioInputs();
  }

  updateRadioInputs() {
    const radio = document.querySelector(`input[name="dir-mode"][value="${this.dir}"]`);
    if (radio) radio.checked = true;
  }

  applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('dir', dir);
  }
}

DirectionManager;
