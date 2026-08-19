

document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. Usage Over Time (Area Chart) ---
    var usageOverTimeOptions = {
        series: [{
            name: 'Usage',
            data: [400, 300, 1000, 1500, 900, 800, 1000, 1400]
        }],
        chart: {
            type: 'area',
            height: 250,
            toolbar: { show: false },
            fontFamily: 'inherit',
            background: 'transparent',
            parentHeightOffset: 0,
        },
        colors: ['#0d47a1'], // Dark blue line
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.05,
                stops: [0, 90, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: "#8b5cf6", // Purple/blue fade
                        opacity: 0.3
                    },
                    {
                        offset: 100,
                        color: "#8b5cf6",
                        opacity: 0
                    }
                ]
            }
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: 'straight', // Straight lines between points
            width: 2.5
        },
        markers: {
            size: 5,
            colors: ['#fff'],
            strokeColors: '#0d47a1',
            strokeWidth: 2.5,
            hover: {
                size: 7
            }
        },
        xaxis: {
            categories: ['May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16', 'May 17', 'May 18'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#6c757d', fontSize: '12px', fontWeight: 500 }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) { 
                    if(value >= 1000) return (value / 1000) + "K";
                    return value;
                },
                style: { colors: '#6c757d', fontSize: '12px', fontWeight: 500 }
            },
            min: 0,
            max: 2000,
            tickAmount: 4
        },
        grid: {
            show: false, // Hidden grid lines in the screenshot
        },
        tooltip: {
            theme: 'light'
        }
    };
    if (document.querySelector("#usage-over-time-chart")) {
        var usageOverTimeChart = new ApexCharts(document.querySelector("#usage-over-time-chart"), usageOverTimeOptions);
        usageOverTimeChart.render();
    }

    // --- 2. Usage by Platform (Donut Chart) ---
    var platformChartOptions = {
        series: [35.6, 25.8, 15.2, 12.7, 10.7],
        chart: {
            type: 'donut',
            height: 220,
            fontFamily: 'inherit',
            background: 'transparent'
        },
        colors: ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087'], // Matching or standard colors, using bootstrap standard as base:
        // Actually matching screenshot: Dark Blue, Green, Yellow, Cyan, Red
        colors: ['#03396c', '#198754', '#ffc107', '#0dcaf0', '#dc3545'],
        plotOptions: {
            pie: {
                donut: {
                    size: '75%',
                    labels: {
                        show: true,
                        name: { 
                            show: true, 
                            color: '#6c757d',
                            offsetY: 20,
                            fontSize: '12px'
                        },
                        value: {
                            show: true,
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#212529',
                            offsetY: -5,
                            formatter: function (val) {
                                return val + "%"
                            }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            fontSize: '12px',
                            color: '#6c757d',
                            formatter: function (w) {
                                return "12,586"
                            }
                        }
                    }
                }
            }
        },
        dataLabels: { enabled: false },
        stroke: { show: false },
        legend: { show: false },
        tooltip: { theme: 'light' }
    };
    if (document.querySelector("#usage-by-platform-chart")) {
        var platformChart = new ApexCharts(document.querySelector("#usage-by-platform-chart"), platformChartOptions);
        platformChart.render();
    }

    // --- 3. Success Rate Over Time (Line Chart) ---
    var successRateOptions = {
        series: [{
            name: 'Success Rate',
            data: [40, 65, 60, 58, 62, 58, 60, 65]
        }],
        chart: {
            type: 'line',
            height: 250,
            toolbar: { show: false },
            fontFamily: 'inherit',
            background: 'transparent',
            parentHeightOffset: 0,
        },
        colors: ['#198754'], // Green line
        dataLabels: { enabled: false },
        stroke: {
            curve: 'straight',
            width: 2.5
        },
        markers: {
            size: 5,
            colors: ['#fff'],
            strokeColors: '#198754',
            strokeWidth: 2.5,
            hover: {
                size: 7
            }
        },
        xaxis: {
            categories: ['May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16', 'May 17', 'May 18'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#6c757d', fontSize: '12px', fontWeight: 500 }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) { return value + "%"; },
                style: { colors: '#6c757d', fontSize: '12px', fontWeight: 500 }
            },
            min: 0,
            max: 100,
            tickAmount: 5
        },
        grid: {
            borderColor: 'rgba(108, 117, 125, 0.15)',
            strokeDashArray: 4,
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } }
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: function (val) {
                    return val + "%"
                }
            }
        }
    };
    if (document.querySelector("#success-rate-chart")) {
        var successRateChart = new ApexCharts(document.querySelector("#success-rate-chart"), successRateOptions);
        successRateChart.render();
    }
});
