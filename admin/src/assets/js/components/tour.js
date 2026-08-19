

function initTourGuide() {
  const tourBtn = document.getElementById('start-tour-btn');

  if (tourBtn) {
    const driverObj = window.driver.js.driver({
      showProgress: true,
      steps: [
        {
          element: '#start-tour-btn',
          popover: {
            title: 'Welcome to the Tour!',
            description: 'This button launches the interactive walkthrough. Click it anytime to restart.',
            position: 'bottom'
          }
        },
        {
          element: '.sidebar-header',
          popover: {
            title: 'Floating Sidebar Header',
            description: 'Contains our branding zap logo and DashLite text.',
            position: 'right'
          }
        },
        {
          element: '.header-actions',
          popover: {
            title: 'Header Navigation Actions',
            description: 'Access profile summaries, search, or toggle between light and dark modes easily.',
            position: 'bottom'
          }
        },
        {
          element: '.page-content',
          popover: {
            title: 'Main Layout Container',
            description: 'Where all dashboard data panels and component card showcases render.',
            position: 'top'
          }
        }
      ]
    });

    tourBtn.addEventListener('click', () => {
      driverObj.drive();
    });
  }
}
