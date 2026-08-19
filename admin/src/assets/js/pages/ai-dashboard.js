


document.addEventListener("DOMContentLoaded", function () {
   const getCSSVar = (name, fallback) => {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return val ? val : fallback;
  };
  // Common Theme Colors
  const primaryColor = getCSSVar('--bs-primary', '#0d6efd');
  const secondaryColor = getCSSVar('--bs-secondary', '#6c757d');
  const successColor = getCSSVar('--bs-success', '#198754');
  const warningColor = getCSSVar('--bs-warning', '#ffc107');
  const dangerColor = getCSSVar('--bs-danger', '#dc3545');
  const infoColor = getCSSVar('--bs-info', '#0dcaf0');
  const whiteColor = getCSSVar('--bs-white', '#ffffff');
    // --- 1. AI Requests Overview (Area Chart) ---
    var requestsChartOptions = {
        series: [{
            name: 'Requests',
            data: [3000, 4000, 3500, 5000, 7842, 4500, 5500]
        }],
        chart: {
            type: 'area',
            height: 250,
            toolbar: { show: false },
            fontFamily: 'inherit',
            background: 'transparent'
        },
        colors: [primaryColor], 
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.05,
                stops: [0, 90, 100]
            }
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        xaxis: {
            categories: ['May 12', 'May 13', 'May 14', 'May 15', 'May 16', 'May 17', 'May 18'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: secondaryColor, fontSize: '12px' }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) { return value / 1000 + "K"; },
                style: { colors: secondaryColor, fontSize: '12px' }
            }
        },
        grid: {
            borderColor: 'rgba(108, 117, 125, 0.1)',
            strokeDashArray: 4,
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: true } }
        },
        tooltip: {
            theme: 'dark'
        }
    };
    var requestsChart = new ApexCharts(document.querySelector("#ai-requests-chart"), requestsChartOptions);
    requestsChart.render();

    // --- 2. Requests by AI Model (Donut Chart) ---
    var modelsChartOptions = {
        series: [45.5, 22.7, 15.3, 9.7, 6.8],
        labels: ['GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'DALL·E 3', 'Others'],
        chart: {
            type: 'donut',
            height: 250,
            fontFamily: 'inherit',
            background: 'transparent'
        },
        colors: [primaryColor, dangerColor, successColor, warningColor, secondaryColor],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: { show: true, color: whiteColor },
                        value: {
                            show: true,
                            fontSize: '20px',
                            fontWeight: 700,
                            color: undefined // Inherits from body
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            fontSize: '14px',
                            color: secondaryColor,
                            formatter: function (w) {
                                return "24,568"
                            }
                        }
                    }
                }
            }
        },
        dataLabels: { enabled: false },
        stroke: { show: false },
        legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
            itemMargin: { horizontal: 5, vertical: 10 },
            formatter: function(seriesName, opts) {
                return seriesName + " <span style='float: right; margin-left: 20px; font-weight: 600;'>" + opts.w.globals.seriesTotals[opts.seriesIndex] + "%</span>"
            }
        },
        tooltip: { theme: 'dark' }
    };
    var modelsChart = new ApexCharts(document.querySelector("#ai-models-chart"), modelsChartOptions);
    modelsChart.render();

    // --- 3. Top Usage (Bar Chart) ---
    var usageChartOptions = {
        series: [{
            name: 'Usage',
            data: [7400, 5600, 3100, 2400, 1000]
        }],
        chart: {
            type: 'bar',
            height: 250,
            toolbar: { show: false },
            fontFamily: 'inherit',
            background: 'transparent'
        },
        colors: [primaryColor, infoColor, warningColor, successColor, secondaryColor],
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '45%',
                distributed: true,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) { return (val / 1000).toFixed(1) + "K"; },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: [secondaryColor]
            }
        },
        legend: { show: false },
        xaxis: {
            categories: ['GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'DALL·E 3', 'Others'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: secondaryColor, fontSize: '11px' }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) { return value / 1000 + "K"; },
                style: { colors: secondaryColor, fontSize: '11px' }
            }
        },
        grid: { show: false },
        tooltip: { theme: 'dark' }
    };
    var usageChart = new ApexCharts(document.querySelector("#ai-top-usage-chart"), usageChartOptions);
    usageChart.render();

    // --- 4. AI Credit Usage (Radial Bar Chart) ---
    var creditChartOptions = {
        series: [76],
        chart: {
            type: 'radialBar',
            height: 220,
            fontFamily: 'inherit',
            background: 'transparent'
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                hollow: {
                    margin: 15,
                    size: '65%',
                    background: 'transparent',
                },
                track: {
                    background: 'rgba(108, 117, 125, 0.1)',
                    strokeWidth: '100%',
                },
                dataLabels: {
                    show: true,
                    name: {
                        offsetY: 20,
                        show: true,
                        color: secondaryColor,
                        fontSize: '14px'
                    },
                    value: {
                        offsetY: -10,
                        color: undefined, // inherit
                        fontSize: '32px',
                        fontWeight: 700,
                        show: true,
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                gradientToColors: ['#0d6efd'],
                stops: [0, 100]
            }
        },
        stroke: { lineCap: 'round' },
        colors: ['#6f42c1'],
        labels: ['Used'],
    };
    var creditChart = new ApexCharts(document.querySelector("#ai-credit-chart"), creditChartOptions);
    creditChart.render();

    // --- 5. Date Picker ---
    const dateBtn = document.getElementById('ai-date-range');
    const dateText = document.getElementById('ai-date-text');
    if (dateBtn && dateText) {
        flatpickr(dateBtn, {
            mode: "range",
            dateFormat: "M j, Y",
            defaultDate: ["2025-05-12", "2025-05-18"],
            onChange: function(selectedDates, dateStr, instance) {
                if (selectedDates.length === 2) {
                    dateText.textContent = instance.formatDate(selectedDates[0], "M j, Y") + " - " + instance.formatDate(selectedDates[1], "M j, Y");
                }
            }
        });
    }
});

