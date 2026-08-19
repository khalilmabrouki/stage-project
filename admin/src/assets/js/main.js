


































// Expose bootstrap globally for inline templates
window.bootstrap = bootstrap;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Systems
  const themeManager = new ThemeManager();
  const layoutManager = new LayoutManager();
  const directionManager = new DirectionManager();
  initI18n();

  // Initialize Charts safely
  try { new JobAnalyticsChart(); } catch (e) {}
  try { new EcommerceAnalyticsChart(); } catch (e) {}

  // Initialize Icons
  
  lucide.createIcons();

  // Initialize Tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize Popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Re-initialize Lucide icons when Tooltips or Popovers are dynamically inserted
  const reinitIcons = (event) => {
    const targetId = event.target.getAttribute('aria-describedby');
    if (targetId) {
      const container = document.getElementById(targetId);
      if (container) {
        createIcons({
          root: container
        });
      }
    }
  };

  document.addEventListener('inserted.bs.tooltip', reinitIcons);
  document.addEventListener('inserted.bs.popover', reinitIcons);

  // Initialize Live Toasts
  const toastTrigger = document.getElementById('liveToastBtn');
  const toastLiveExample = document.getElementById('liveToast');
  if (toastTrigger && toastLiveExample) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener('click', () => {
      toastBootstrap.show();
    });
  }

  // Advanced UI Initializes (executed lazily or conditionally inside the functions)

// Execute functions safely
try { initCounter?.(); } catch(e) {}
try { initSweetAlerts?.(); } catch(e) {}
try { initSwiperSliders?.(); } catch(e) {}
try { initDraggableLists?.(); } catch(e) {}
try { initTourGuide?.(); } catch(e) {}
try { initInteractiveRatings?.(); } catch(e) {}
try { initWatermark?.(); } catch(e) {}
try { initAnimations?.(); } catch(e) {}
try { initHighlight?.(); } catch(e) {}
try { initRangeSliders?.(); } catch(e) {}
try { initTinySlider?.(); } catch(e) {}
try { initAdvancedForms?.(); } catch(e) {}
try { initEditor?.(); } catch(e) {}
try { initUpload?.(); } catch(e) {}
try { initWizard?.(); } catch(e) {}
try { initApexCharts?.(); } catch(e) {}
try { initChartJS?.(); } catch(e) {}
try { initECharts?.(); } catch(e) {}
try { initDataTables?.(); } catch(e) {}
try { initGridJS?.(); } catch(e) {}
try { initVectorMaps?.(); } catch(e) {}
try { initLeafletMaps?.(); } catch(e) {}
try { initWorldClock?.(); } catch(e) {}
});
