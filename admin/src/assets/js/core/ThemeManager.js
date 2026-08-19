class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.sidebarTheme = localStorage.getItem('sidebarTheme') || 'default';
    this.headerTheme = localStorage.getItem('headerTheme') || 'default';
    this.smartTheme = localStorage.getItem('smartTheme') || 'default';
    this.themePreset = localStorage.getItem('themePreset') || 'default';
    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.applySidebarTheme(this.sidebarTheme);
    this.applyHeaderTheme(this.headerTheme);
    this.applySmartTheme(this.smartTheme);
    this.applyPreset(this.themePreset);
    this.bindEvents();
  }

  bindEvents() {
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
      themeSwitcher.addEventListener('click', () => {
        this.smartTheme = 'default';
        this.applySmartTheme(this.smartTheme);
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        this.updateRadioInputs();
      });
    }

    const themeRadios = document.querySelectorAll('input[name="theme-mode"]');
    themeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.smartTheme = 'default';
          this.applySmartTheme(this.smartTheme);
          this.theme = e.target.value;
          this.applyTheme(this.theme);
          this.updateRadioInputs();
        }
      });
    });
    const headerRadios = document.querySelectorAll('input[name="header-theme"]');
    headerRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.headerTheme = e.target.value;
          this.applyHeaderTheme(this.headerTheme);
        }
      });
    });

    const sidebarRadios = document.querySelectorAll('input[name="sidebar-theme"]');
    sidebarRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.sidebarTheme = e.target.value;
          this.applySidebarTheme(this.sidebarTheme);
        }
      });
    });

    const smartRadios = document.querySelectorAll('input[name="smart-theme"]');
    smartRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.smartTheme = e.target.value;
          this.applySmartTheme(this.smartTheme);
        }
      });
    });

    const presetRadios = document.querySelectorAll('input[name="theme-preset"]');
    presetRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.themePreset = e.target.value;
          this.applyPreset(this.themePreset);
        }
      });
    });

    this.updateRadioInputs();
  }

  updateRadioInputs() {
    const themeRadio = document.querySelector(`input[name="theme-mode"][value="${this.theme}"]`);
    if (themeRadio) themeRadio.checked = true;

    const headerRadio = document.querySelector(`input[name="header-theme"][value="${this.headerTheme}"]`);
    if (headerRadio) headerRadio.checked = true;

    const sidebarRadio = document.querySelector(`input[name="sidebar-theme"][value="${this.sidebarTheme}"]`);
    if (sidebarRadio) sidebarRadio.checked = true;

    const smartRadio = document.querySelector(`input[name="smart-theme"][value="${this.smartTheme}"]`);
    if (smartRadio) smartRadio.checked = true;

    const presetRadio = document.querySelector(`input[name="theme-preset"][value="${this.themePreset}"]`);
    if (presetRadio) presetRadio.checked = true;
  }

  applySidebarTheme(theme) {
    document.documentElement.setAttribute('data-sidebar-theme', theme);
    localStorage.setItem('sidebarTheme', theme);
  }

  applyHeaderTheme(theme) {
    document.documentElement.setAttribute('data-header-theme', theme);
    localStorage.setItem('headerTheme', theme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
  }

  applySmartTheme(mode) {
    localStorage.setItem('smartTheme', mode);

    // Cleanup previous intervals/listeners
    if (this._timeInterval) {
      clearInterval(this._timeInterval);
      this._timeInterval = null;
    }
    if (this._battery && this._checkBattery) {
      this._battery.removeEventListener('levelchange', this._checkBattery);
      this._battery.removeEventListener('chargingchange', this._checkBattery);
    }

    if (mode === 'time') {
      const checkTime = () => {
        const hr = new Date().getHours();
        const newTheme = (hr >= 6 && hr < 18) ? 'light' : 'dark';
        if (this.theme !== newTheme) {
          this.theme = newTheme;
          this.applyTheme(newTheme);
          this.updateRadioInputs();
        }
      };
      checkTime();
      this._timeInterval = setInterval(checkTime, 60000);
    } else if (mode === 'battery') {
      if (navigator.getBattery) {
        navigator.getBattery().then(b => {
          this._battery = b;
          this._checkBattery = () => {
            const isLow = b.level <= 0.20 && !b.charging;
            const newTheme = isLow ? 'dark' : (localStorage.getItem('theme') || 'light');
            if (this.theme !== newTheme) {
              this.theme = newTheme;
              this.applyTheme(newTheme);
              this.updateRadioInputs();
            }
          };
          this._checkBattery();
          b.addEventListener('levelchange', this._checkBattery);
          b.addEventListener('chargingchange', this._checkBattery);
        });
      }
    }
  }

  applyPreset(preset) {
    localStorage.setItem('themePreset', preset);
    
    // Clean up any old injected style block just in case
    const styleEl = document.getElementById('theme-preset-overrides');
    if (styleEl) styleEl.remove();

    if (preset === 'default') {
      document.documentElement.removeAttribute('data-theme-preset');
    } else {
      document.documentElement.setAttribute('data-theme-preset', preset);
    }
  }


}

ThemeManager;
