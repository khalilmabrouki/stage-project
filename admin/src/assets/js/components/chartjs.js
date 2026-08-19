

function initChartJS() {
  const getThemeColor = (name) => getComputedStyle(document.documentElement).getPropertyValue(`--bs-${name}`).trim() || '#000000';
  
  const primary = getThemeColor('primary');
  const success = getThemeColor('success');
  const warning = getThemeColor('warning');
  const danger = getThemeColor('danger');
  const info = getThemeColor('info');

  Chart.defaults.color = '#6c757d';
  Chart.defaults.font.family = 'inherit';

  const lineCtx = document.getElementById('chartjs-line');
  if (lineCtx) {
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{ label: 'Dataset 1', data: [65, 59, 80, 81, 56, 55, 40], fill: false, borderColor: primary, tension: 0.1 }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const barCtx = document.getElementById('chartjs-bar');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{ label: 'Dataset 1', data: [65, 59, 80, 81, 56, 55, 40], backgroundColor: [primary, success, warning, danger, info, primary, success] }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const pieCtx = document.getElementById('chartjs-pie');
  if (pieCtx) {
    new Chart(pieCtx, {
      type: 'pie',
      data: { labels: ['Red', 'Blue', 'Yellow'], datasets: [{ data: [300, 50, 100], backgroundColor: [danger, primary, warning] }] },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const doughnutCtx = document.getElementById('chartjs-doughnut');
  if (doughnutCtx) {
    new Chart(doughnutCtx, {
      type: 'doughnut',
      data: { labels: ['Red', 'Blue', 'Yellow'], datasets: [{ data: [300, 50, 100], backgroundColor: [danger, primary, warning] }] },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const polarCtx = document.getElementById('chartjs-polar');
  if (polarCtx) {
    new Chart(polarCtx, {
      type: 'polarArea',
      data: { labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'], datasets: [{ data: [11, 16, 7, 3, 14], backgroundColor: [danger, success, warning, '#ccc', primary] }] },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const radarCtx = document.getElementById('chartjs-radar');
  if (radarCtx) {
    new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [{ label: 'My First Dataset', data: [65, 59, 90, 81, 56, 55, 40], fill: true, backgroundColor: 'rgba(54, 162, 235, 0.2)', borderColor: primary, pointBackgroundColor: primary }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const scatterCtx = document.getElementById('chartjs-scatter');
  if (scatterCtx) {
    new Chart(scatterCtx, {
      type: 'scatter',
      data: { datasets: [{ label: 'Scatter Dataset', data: [{ x: -10, y: 0 }, { x: 0, y: 10 }, { x: 10, y: 5 }, { x: 0.5, y: 5.5 }], backgroundColor: danger }] },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  const bubbleCtx = document.getElementById('chartjs-bubble');
  if (bubbleCtx) {
    new Chart(bubbleCtx, {
      type: 'bubble',
      data: { datasets: [{ label: 'First Dataset', data: [{ x: 20, y: 30, r: 15 }, { x: 40, y: 10, r: 10 }], backgroundColor: success }] },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}
