class LayoutManager {
  constructor() {
    this.sidebarSize = localStorage.getItem('sidebar-size') || 'expanded';
    this.layoutMode = localStorage.getItem('layout-mode') || 'vertical';
    this.init();
  }

  init() {
    this.applySidebarSize(this.sidebarSize);
    this.applyLayoutMode(this.layoutMode);
    this.bindEvents();
    this.createOverlay();
    this.initActiveMenu();
  }

  initActiveMenu() {
    let currentPath = window.location.pathname;
    let currentFileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    if (!currentFileName) currentFileName = 'index.html';
    
    const menus = document.querySelectorAll('.sidebar-menu, .horizontal-menu');
    
    menus.forEach(menu => {
      const links = menu.querySelectorAll('a');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        
        let linkFileName = href.substring(href.lastIndexOf('/') + 1);
        
        if (linkFileName === currentFileName) {
          link.classList.add('active');
          
          // Check if it's inside a submenu
          const submenu = link.closest('.sidebar-submenu');
          if (submenu) {
            // Add show class if it's a collapse (sidebar)
            if (submenu.classList.contains('collapse')) {
              submenu.classList.add('show');
            }
            
            // Find the toggle
            let toggle;
            if (submenu.hasAttribute('aria-labelledby')) {
              const toggleId = submenu.getAttribute('aria-labelledby');
              toggle = menu.querySelector(`#${toggleId}`);
            } else if (submenu.hasAttribute('id')) {
              const toggleId = submenu.getAttribute('id');
              toggle = menu.querySelector(`[data-bs-toggle="collapse"][href="#${toggleId}"]`);
            }
            
            if (toggle) {
              toggle.classList.add('bg-primary', 'bg-opacity-10', 'active');
              toggle.setAttribute('aria-expanded', 'true');
              const icon = toggle.querySelector('.nav-icon');
              if (icon) icon.classList.add('text-primary');
            }
          } else {
            // If it's a top-level link that is active, add highlight classes
            link.classList.add('bg-primary', 'bg-opacity-10', 'text-primary', 'active');
            const icon = link.querySelector('.nav-icon');
            if (icon) icon.classList.add('text-primary');
          }

          // Scroll the active link into view only for the sidebar
          if (menu.classList.contains('sidebar-menu')) {
            link.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'sidebar-overlay';
    document.body.appendChild(this.overlay);
    
    // Add CSS for overlay via JS to avoid needing a separate file
    Object.assign(this.overlay.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1060,
      display: 'none',
      opacity: 0,
      transition: 'opacity 0.3s'
    });

    this.overlay.addEventListener('click', () => {
      this.closeMobileSidebar();
    });
  }

  bindEvents() {
    const sidebarToggler = document.getElementById('sidebar-toggler');
    if (sidebarToggler) {
      sidebarToggler.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
          this.toggleMobileSidebar();
        } else {
          e.preventDefault();
          const currentSize = document.documentElement.getAttribute('data-sidebar-size') || 'expanded';
          const newSize = currentSize === 'expanded' ? 'collapsed' : 'expanded';
          this.sidebarSize = newSize;
          this.applySidebarSize(newSize);
          
          const pinCheckbox = document.getElementById('sidebar-pin-checkbox');
          if (pinCheckbox) {
            pinCheckbox.checked = (newSize === 'expanded');
          }
        }
      });
    }

    const pinCheckbox = document.getElementById('sidebar-pin-checkbox');
    if (pinCheckbox) {
      pinCheckbox.addEventListener('change', (e) => {
        const newSize = e.target.checked ? 'expanded' : 'collapsed';
        this.sidebarSize = newSize;
        this.applySidebarSize(newSize);
      });
      
      // Sync initial state
      pinCheckbox.checked = (this.sidebarSize === 'expanded');
    }

    const sidebarSizeRadios = document.querySelectorAll('input[name="sidebar-size"]');
    if (sidebarSizeRadios.length > 0) {
      sidebarSizeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.checked) {
            this.sidebarSize = e.target.value;
            this.applySidebarSize(this.sidebarSize);
          }
        });
      });
    }

    const layoutRadios = document.querySelectorAll('input[name="layout-mode"]');
    if (layoutRadios.length > 0) {
      layoutRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.checked) {
            this.layoutMode = e.target.value;
            this.applyLayoutMode(this.layoutMode);
          }
        });
      });
    }
  }

  toggleMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('show');
      if (sidebar.classList.contains('show')) {
        this.overlay.style.display = 'block';
        setTimeout(() => this.overlay.style.opacity = 1, 10);
      } else {
        this.closeMobileSidebar();
      }
    }
  }

  closeMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.remove('show');
    if (this.overlay) {
      this.overlay.style.opacity = 0;
      setTimeout(() => this.overlay.style.display = 'none', 300);
    }
  }

  applySidebarSize(size) {
    document.documentElement.setAttribute('data-sidebar-size', size);
    localStorage.setItem('sidebar-size', size);
    
    const radio = document.getElementById(`sidebar-size-${size}`);
    if (radio) {
      radio.checked = true;
    }
    
    const pinCheckbox = document.getElementById('sidebar-pin-checkbox');
    if (pinCheckbox) {
      pinCheckbox.checked = (size === 'expanded');
    }
    
    // Dispatch resize event so ApexCharts redraws to fit new container size
    // Wait for the 0.3s CSS transition to finish before dispatching
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 310);
  }

  applyLayoutMode(mode) {
    document.documentElement.setAttribute('data-layout', mode);
    localStorage.setItem('layout-mode', mode);
    
    const radio = document.getElementById(`layout-mode-${mode}`);
    if (radio) {
      radio.checked = true;
    }

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 310);
  }
}

LayoutManager;
