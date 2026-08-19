/*
Template Name: DashLite - Admin Template
Author: AI
File: dashboard-crypto.js
Description: Crypto Dashboard Chart Init for Redesign
*/



document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  const getCSSVar = (name, fallback) => {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return val ? val : fallback;
  };
  // Common Theme Colors
  const primaryColor = getCSSVar('--bs-primary', '#0d6efd');
  const successColor = getCSSVar('--bs-success', '#198754');
  const warningColor = getCSSVar('--bs-warning', '#ffc107');
  const dangerColor = getCSSVar('--bs-danger', '#dc3545');
  const infoColor = getCSSVar('--bs-info', '#0dcaf0');
  const WhiteColor = getCSSVar('--bs-white', '#ffffff');
  const blackColor = getCSSVar('--bs-black', '#000000');
  const purpleColor = '#6f42c1';

  // 1. Portfolio Overview Chart
  if (document.querySelector("#portfolio-overview-chart")) {
    var optionsPortfolio = {
      series: [{
        name: 'Portfolio Value',
        data: [75000, 82000, 105000, 88000, 95000, 86000, 101000, 98000, 115000, 124563]
      }],
      chart: {
        height: 320,
        type: 'area',
        fontFamily: 'inherit',
        toolbar: {
          show: false
        }
      },
      colors: [primaryColor],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.05,
          stops: [0, 90, 100]
        }
      },
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColors: primaryColor,
        strokeWidth: 2,
        hover: {
          size: 6,
        }
      },
      xaxis: {
        categories: ['12 May', '13 May', '14 May', '15 May', '16 May', '17 May', '18 May', '19 May', '20 May', '21 May'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: '#8c9097'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return "$" + value / 1000 + "k";
          },
          style: {
            colors: '#8c9097'
          }
        }
      },
      grid: {
        borderColor: 'rgba(0,0,0,0.05)',
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$" + val.toLocaleString()
          }
        }
      }
    };

    var portfolioChart = new ApexCharts(document.querySelector("#portfolio-overview-chart"), optionsPortfolio);
    portfolioChart.render();
  }

  // 2. Asset Allocation Donut
  if (document.querySelector("#asset-allocation-chart")) {
    var optionsAllocation = {
      series: [40.35, 25.12, 12.35, 8.25, 6.15, 7.78],
      chart: {
        type: 'donut',
        height: 250,
        fontFamily: 'inherit',
      },
      labels: ['Bitcoin', 'Ethereum', 'Solana', 'BNB', 'XRP', 'Others'],
      colors: [warningColor, primaryColor, successColor, infoColor, purpleColor, '#a1a1a1'],
      stroke: {
        width: 0
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '14px',
                color: '#8c9097',
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: '18px',
                fontWeight: 'bold',
                color: primaryColor,
                formatter: function (val) {
                  return val + "%"
                }
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                fontSize: '14px',
                color: primaryColor,
                formatter: function (w) {
                  return "$124,563.50"
                }
              }
            }
          }
        }
      }
    };

    var allocationChart = new ApexCharts(document.querySelector("#asset-allocation-chart"), optionsAllocation);
    allocationChart.render();
  }

  // 3. Watchlist Sparklines
  var sparklineOptions = {
    chart: {
      type: 'line',
      width: 60,
      height: 25,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return ''
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  var renderSparkline = function (id, data, color) {
    if (document.querySelector(id)) {
      var options = Object.assign({}, sparklineOptions, {
        series: [{ data: data }],
        colors: [color]
      });
      new ApexCharts(document.querySelector(id), options).render();
    }
  };

  renderSparkline("#wl-sparkline-btc", [25, 45, 30, 60, 40, 70, 85], successColor);
  renderSparkline("#wl-sparkline-eth", [15, 25, 20, 35, 30, 45, 50], successColor);
  renderSparkline("#wl-sparkline-sol", [10, 20, 15, 30, 50, 40, 65], successColor);
  renderSparkline("#wl-sparkline-xrp", [40, 35, 45, 30, 25, 20, 15], dangerColor);
  renderSparkline("#wl-sparkline-ada", [10, 15, 12, 18, 15, 22, 25], successColor);

  // 4. Fear & Greed Radial Bar
  if (document.querySelector("#fear-greed-chart")) {
    var optionsFearGreed = {
      series: [74],
      chart: {
        type: 'radialBar',
        width: 50,
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            size: '60%',
          },
          track: {
            background: '#e9ecef',
            strokeWidth: '100%',
            margin: 0,
          },
          dataLabels: {
            show: true,
            name: {
              show: false
            },
            value: {
              show: true,
              fontSize: '10px',
              fontWeight: 'bold',
              color: primaryColor,
              offsetY: 4
            }
          }
        }
      },
      fill: {
        type: 'solid',
        colors: [successColor]
      },
      stroke: {
        lineCap: 'round'
      }
    };

    var fearGreedChart = new ApexCharts(document.querySelector("#fear-greed-chart"), optionsFearGreed);
    fearGreedChart.render();
  }

});
