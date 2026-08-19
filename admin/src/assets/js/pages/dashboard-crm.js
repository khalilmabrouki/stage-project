

document.addEventListener("DOMContentLoaded", function () {

  const getCSSVar = (name, fallback) => {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return val ? val : fallback;
  };

  const primaryColor = getCSSVar('--bs-primary', '#0d6efd');
  const successColor = getCSSVar('--bs-success', '#198754');
  const warningColor = getCSSVar('--bs-warning', '#ffc107');
  const infoColor = getCSSVar('--bs-info', '#0dcaf0');
  const dangerColor = getCSSVar('--bs-danger', '#dc3545');
  const secondaryColor = getCSSVar('--bs-secondary', '#6c757d');
  const borderColor = getCSSVar('--bs-border-color', '#f1f1f1');

  // 1. Sales Pipeline (Funnel)
  if (document.querySelector("#sales-pipeline-chart")) {
    var optionsPipeline = {
      series: [
        {
          name: "Funnel Series",
          data: [1250, 950, 620, 310, 142]
        }
      ],
      chart: {
        type: 'bar',
        height: 280,
        fontFamily: 'inherit',
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          barHeight: '80%',
          isFunnel: true,
          distributed: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ': ' + val
        },
        dropShadow: { enabled: true }
      },
      colors: [primaryColor, successColor, warningColor, infoColor, dangerColor],
      xaxis: {
        categories: ['New Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won']
      },
      legend: { show: false }
    };
    new ApexCharts(document.querySelector("#sales-pipeline-chart"), optionsPipeline).render();
  }

  // 2. Leads Overview (Area/Line)
  if (document.querySelector("#leads-overview-chart")) {
    var optionsLeads = {
      series: [{
        name: 'New Leads',
        data: [420, 600, 500, 640, 510, 720]
      }, {
        name: 'Converted Leads',
        data: [150, 320, 220, 390, 250, 400]
      }],
      chart: {
        height: 250,
        type: 'area',
        toolbar: { show: false },
        fontFamily: 'inherit'
      },
      colors: [primaryColor, successColor],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.05,
          stops: [0, 100]
        }
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: secondaryColor } }
      },
      yaxis: {
        labels: { style: { colors: secondaryColor } }
      },
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
      },
      legend: { show: false },
      markers: { size: 4 }
    };
    new ApexCharts(document.querySelector("#leads-overview-chart"), optionsLeads).render();
  }

  // 3. Top Performing Sources (Donut)
  if (document.querySelector("#sources-chart")) {
    var optionsSources = {
      series: [1102, 612, 367, 245, 132],
      chart: {
        type: 'donut',
        height: 200,
        fontFamily: 'inherit'
      },
      labels: ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Other'],
      colors: [primaryColor, successColor, warningColor, infoColor, dangerColor],
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: { show: false },
              value: {
                show: true,
                fontSize: '16px',
                fontWeight: 700,
                color: secondaryColor,
                formatter: function (val) {
                  return val + "%";
                }
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                fontSize: '14px',
                color: secondaryColor,
                formatter: function (w) {
                  return "45%";
                }
              }
            }
          }
        }
      },
      stroke: { width: 0 },
      legend: { show: false }
    };
    new ApexCharts(document.querySelector("#sources-chart"), optionsSources).render();
  }

  // 4. Deal Status (Column)
  if (document.querySelector("#deal-status-chart")) {
    var optionsStatus = {
      series: [{
        name: 'Deals',
        data: [120, 140, 100, 70, 160, 50]
      }],
      chart: {
        type: 'bar',
        height: 230,
        toolbar: { show: false },
        fontFamily: 'inherit'
      },
      colors: [primaryColor, primaryColor, primaryColor, primaryColor, successColor, dangerColor],
      plotOptions: {
        bar: {
          columnWidth: '35%',
          borderRadius: 2,
          distributed: true,
        }
      },
      dataLabels: { enabled: false },
      legend: { show: false },
      xaxis: {
        categories: ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'],
        labels: { style: { colors: secondaryColor, fontSize: '12px' } },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: { style: { colors: secondaryColor } }
      },
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: { lines: { show: true } }
      }
    };
    new ApexCharts(document.querySelector("#deal-status-chart"), optionsStatus).render();
  }

  // 5. Tasks Overview (RadialBar)
  if (document.querySelector("#tasks-overview-chart")) {
    var optionsTasks = {
      series: [72],
      chart: {
        height: 220,
        type: 'radialBar',
        fontFamily: 'inherit'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
          track: {
            background: borderColor,
            margin: 0
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: 20,
              show: true,
              color: secondaryColor,
              fontSize: '12px'
            },
            value: {
              offsetY: -10,
              color: primaryColor,
              fontSize: '24px',
              fontWeight: 700,
              show: true,
            }
          }
        }
      },
      colors: [primaryColor],
      labels: ['Completed'],
      stroke: { lineCap: 'round' }
    };
    new ApexCharts(document.querySelector("#tasks-overview-chart"), optionsTasks).render();
  }

});
