

document.addEventListener("DOMContentLoaded", function () {

  const getCSSVar = (name, fallback) => {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return val ? val : fallback;
  };

  const primaryColor = getCSSVar('--bs-primary', '#0d6efd');
  const successColor = getCSSVar('--bs-success', '#198754');
  const warningColor = getCSSVar('--bs-warning', '#ffc107');
  const infoColor = getCSSVar('--bs-info', '#0dcaf0');
  const borderColor = getCSSVar('--bs-border-color', '#f1f1f1');
  const secondaryColor = getCSSVar('--bs-secondary', '#6c757d');

  // Sales Overview Chart (Area/Line)
  if (document.querySelector("#sales-overview-chart")) {
    var optionsSales = {
      series: [{
        name: 'This Week',
        data: [4200, 5800, 4800, 6800, 5200, 7200, 6000]
      }, {
        name: 'Last Week',
        data: [2500, 3200, 2100, 3800, 2900, 4100, 3100]
      }],
      chart: {
        height: 280,
        type: 'area',
        toolbar: { show: false },
        fontFamily: 'inherit'
      },
      colors: [primaryColor, successColor],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 4] },
      fill: {
        type: ['gradient', 'solid'],
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.2,
          opacityTo: 0.05,
          stops: [0, 100]
        },
        opacity: [1, 0] // Hide fill for the second line
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: secondaryColor } }
      },
      yaxis: {
        labels: {
          style: { colors: secondaryColor },
          formatter: function (value) {
            return "$" + (value / 1000) + "K";
          }
        }
      },
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
      },
      legend: { show: false },
      tooltip: {
        y: { formatter: function (val) { return "$" + val } }
      }
    };
    new ApexCharts(document.querySelector("#sales-overview-chart"), optionsSales).render();
  }

  // Sales by Channel (Donut)
  if (document.querySelector("#sales-channel-chart")) {
    var optionsDonut = {
      series: [14250, 6780, 2980, 769],
      chart: {
        type: 'donut',
        height: 250,
        fontFamily: 'inherit'
      },
      labels: ['Online Store', 'Mobile App', 'Marketplace', 'Others'],
      colors: [primaryColor, successColor, warningColor, infoColor],
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '13px',
                color: secondaryColor,
                offsetY: 20
              },
              value: {
                show: true,
                fontSize: '22px',
                fontWeight: 700,
                color: secondaryColor,
                offsetY: -10,
                formatter: function (val) {
                  return "$" + Number(val).toLocaleString();
                }
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total Sales',
                fontSize: '13px',
                color: secondaryColor,
                formatter: function (w) {
                  return "$24,780.50";
                }
              }
            }
          },
          expandOnClick: false
        }
      },
      stroke: { width: 0 },
      legend: { show: false },
      tooltip: {
        y: { formatter: function (val) { return "$" + val } }
      }
    };
    new ApexCharts(document.querySelector("#sales-channel-chart"), optionsDonut).render();
  }

  // Orders Overview (Bar Chart)
  if (document.querySelector("#orders-overview-bar-chart")) {
    var optionsBar = {
      series: [{
        name: 'Orders',
        data: [150, 220, 180, 280, 200, 310, 240]
      }],
      chart: {
        type: 'bar',
        height: 220,
        toolbar: { show: false },
        fontFamily: 'inherit'
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '25%',
        }
      },
      colors: [primaryColor],
      dataLabels: { enabled: false },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: secondaryColor } }
      },
      yaxis: {
        labels: {
          style: { colors: secondaryColor }
        }
      },
      grid: {
        show: false
      },
      legend: { show: false },
      tooltip: {
      }
    };
    new ApexCharts(document.querySelector("#orders-overview-bar-chart"), optionsBar).render();
  }

});
