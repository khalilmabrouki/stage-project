

document.addEventListener("DOMContentLoaded", function () {

  const getCSSVar = (name, fallback) => {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return val ? val : fallback;
  };

  // Dynamic Theme Colors
  const primaryColor = getCSSVar('--bs-primary', '#0d6efd');
  const successColor = getCSSVar('--bs-success', '#198754');
  const warningColor = getCSSVar('--bs-warning', '#ffc107');
  const purpleColor = getCSSVar('--bs-indigo', '#6610f2'); // Fallback to indigo if purple not found
  const borderColor = getCSSVar('--bs-border-color', '#f1f1f1');
  const secondaryColor = getCSSVar('--bs-secondary', '#6c757d');
  const lightColor = getCSSVar('--bs-border-color-translucent', '#e9ecef'); // good background for donut

  // Common Sparkline Options
  var sparklineOptions = {
    chart: {
      type: 'area',
      width: 80,
      height: 40,
      sparkline: { enabled: true }
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: { title: { formatter: function (seriesName) { return '' } } },
      marker: { show: false }
    }
  };

  // Total Jobs Sparkline
  var optJobs = { ...sparklineOptions, series: [{ data: [12, 14, 2, 47, 42, 15, 47] }], colors: [primaryColor] };
  new ApexCharts(document.querySelector("#sparkline-jobs"), optJobs).render();

  // Applications Sparkline
  var optApps = { ...sparklineOptions, series: [{ data: [47, 45, 74, 14, 56, 37, 48] }], colors: [successColor] };
  new ApexCharts(document.querySelector("#sparkline-applications"), optApps).render();

  // Interviews Sparkline
  var optInt = { ...sparklineOptions, series: [{ data: [15, 75, 47, 65, 14, 2, 41] }], colors: [warningColor] };
  new ApexCharts(document.querySelector("#sparkline-interviews"), optInt).render();

  // Hired Sparkline
  var optHired = { ...sparklineOptions, series: [{ data: [47, 15, 2, 65, 47, 75, 15] }], colors: [purpleColor] };
  new ApexCharts(document.querySelector("#sparkline-hired"), optHired).render();


  // Main Job Statistics Area Chart
  var optionsMain = {
    series: [{
      name: 'Applied Jobs',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'Interviewed',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    chart: {
      height: 350,
      type: 'area',
      toolbar: { show: false },
      fontFamily: 'inherit'
    },
    colors: [primaryColor, warningColor],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: { colors: secondaryColor }
      }
    },
    grid: {
      borderColor: borderColor,
      strokeDashArray: 3,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    }
  };
  new ApexCharts(document.querySelector("#job-statistics-chart"), optionsMain).render();

  // Profile Views Donut Chart
  var optionsDonut = {
    series: [76, 24],
    chart: { type: 'donut', height: 200 },
    labels: ['Viewed', 'Unseen'],
    colors: [successColor, lightColor],
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: { size: '75%' },
        expandOnClick: false
      }
    },
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { enabled: false }
  };
  new ApexCharts(document.querySelector("#profile-views-chart"), optionsDonut).render();

  // Application Status Bar Chart
  var optionsBar = {
    series: [{
      name: 'Applications',
      data: [400, 300, 200, 100]
    }],
    chart: {
      type: 'bar',
      height: 200,
      toolbar: { show: false },
      fontFamily: 'inherit'
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '30%'
      }
    },
    colors: [primaryColor],
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Submitted', 'Reviewed', 'Interview', 'Hired'],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: { colors: secondaryColor, fontWeight: 500 }
      }
    },
    grid: {
      show: false
    }
  };
  new ApexCharts(document.querySelector("#application-status-chart"), optionsBar).render();

  // Profile Strength Radial Chart
  var optionsProfile = {
    series: [85],
    chart: {
      type: 'radialBar',
      height: 180,
      fontFamily: 'inherit',
      sparkline: { enabled: true }
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '70%' },
        dataLabels: {
          name: { show: false },
          value: {
            show: true,
            fontSize: '22px',
            fontWeight: 700,
            offsetY: 8,
            formatter: function (val) { return val + "%" }
          }
        },
        track: { background: lightColor }
      }
    },
    colors: [primaryColor],
    stroke: { lineCap: 'round' }
  };
  var profileChartEl = document.querySelector("#profile-strength-chart");
  if (profileChartEl) {
    new ApexCharts(profileChartEl, optionsProfile).render();
  }

});
