document.addEventListener("DOMContentLoaded", function () {
    const getCSSVar = (name, fallback) => {
        const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        return val ? val : fallback;
    };

    const primaryColor = getCSSVar('--bs-primary', '#0d6efd');
    const secondaryColor = getCSSVar('--bs-secondary', '#6c757d');
    const successColor = getCSSVar('--bs-success', '#198754');
    const warningColor = getCSSVar('--bs-warning', '#ffc107');
    const dangerColor = getCSSVar('--bs-danger', '#dc3545');
    const infoColor = getCSSVar('--bs-info', '#0dcaf0');

    // --- Helper for Sparkline Mini-Charts ---
    function renderSparkline(elementId, seriesData, color) {
        const el = document.querySelector(elementId);
        if (!el) return;
        const options = {
            series: [{ data: seriesData }],
            chart: {
                type: 'line',
                width: 100,
                height: 38,
                sparkline: { enabled: true }
            },
            colors: [color],
            stroke: { curve: 'smooth', width: 2.5 },
            tooltip: { enabled: false }
        };
        const chart = new ApexCharts(el, options);
        chart.render();
    }

    // Render Sparklines
    renderSparkline("#lms-sparkline-students", [12, 14, 11, 19, 24, 28, 35], primaryColor);
    renderSparkline("#lms-sparkline-courses", [40, 42, 45, 48, 52, 55, 60], infoColor);
    renderSparkline("#lms-sparkline-hours", [300, 450, 400, 600, 750, 700, 920], successColor);
    renderSparkline("#lms-sparkline-revenue", [12, 15, 18, 14, 22, 26, 31], warningColor);

    // --- 1. Tabbed Main Learning Analytics (Multi-Gradient Area Chart) ---
    const analyticsEl = document.querySelector("#lms-analytics-chart");
    if (analyticsEl) {
        const analyticsChartOptions = {
            series: [{
                name: 'New Enrollments',
                data: [1400, 2100, 1800, 2900, 3800, 3200, 4400, 5100, 4700, 5900, 6400, 7200]
            }, {
                name: 'Course Completions',
                data: [900, 1300, 1100, 1900, 2600, 2300, 3100, 3800, 3500, 4400, 4900, 5600]
            }],
            chart: {
                type: 'area',
                height: 320,
                toolbar: { show: false },
                fontFamily: 'inherit',
                background: 'transparent'
            },
            colors: [primaryColor, successColor],
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
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: {
                    style: { colors: secondaryColor, fontSize: '12px' }
                }
            },
            yaxis: {
                labels: {
                    formatter: function (value) { return value >= 1000 ? (value / 1000).toFixed(1) + "k" : value; },
                    style: { colors: secondaryColor, fontSize: '12px' }
                }
            },
            grid: {
                borderColor: 'rgba(108, 117, 125, 0.1)',
                strokeDashArray: 4,
                xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                labels: { colors: secondaryColor }
            },
            tooltip: { theme: 'dark' }
        };
        const analyticsChart = new ApexCharts(analyticsEl, analyticsChartOptions);
        analyticsChart.render();
    }

    // --- 2. Category Distribution (Donut Chart) ---
    const categoryEl = document.querySelector("#lms-category-chart");
    if (categoryEl) {
        const categoryChartOptions = {
            series: [42, 24, 18, 10, 6],
            labels: ['Fullstack Web', 'AI & Machine Learning', 'UI/UX Design', 'Cloud & DevOps', 'Business'],
            chart: {
                type: 'donut',
                height: 270,
                fontFamily: 'inherit',
                background: 'transparent'
            },
            colors: [primaryColor, infoColor, successColor, warningColor, dangerColor],
            plotOptions: {
                pie: {
                    donut: {
                        size: '74%',
                        labels: {
                            show: true,
                            name: { show: true, color: secondaryColor },
                            value: { show: true, fontSize: '22px', fontWeight: 700 },
                            total: {
                                show: true,
                                label: 'Total Courses',
                                fontSize: '13px',
                                color: secondaryColor,
                                formatter: function () { return "1,450"; }
                            }
                        }
                    }
                }
            },
            dataLabels: { enabled: false },
            stroke: { show: false },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: { horizontal: 8, vertical: 4 }
            },
            tooltip: { theme: 'dark' }
        };
        const categoryChart = new ApexCharts(categoryEl, categoryChartOptions);
        categoryChart.render();
    }

    // --- 3. Weekly Study Hours (Bar Chart) ---
    const engagementEl = document.querySelector("#lms-engagement-chart");
    if (engagementEl) {
        const engagementChartOptions = {
            series: [{
                name: 'Study Hours',
                data: [420, 680, 810, 990, 1140, 720, 480]
            }],
            chart: {
                type: 'bar',
                height: 220,
                toolbar: { show: false },
                fontFamily: 'inherit',
                background: 'transparent'
            },
            colors: [primaryColor],
            plotOptions: {
                bar: {
                    borderRadius: 6,
                    columnWidth: '38%',
                    distributed: false
                }
            },
            dataLabels: { enabled: false },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { style: { colors: secondaryColor, fontSize: '12px' } }
            },
            yaxis: {
                labels: {
                    formatter: function (val) { return val + "h"; },
                    style: { colors: secondaryColor, fontSize: '12px' }
                }
            },
            grid: { borderColor: 'rgba(108, 117, 125, 0.1)', strokeDashArray: 4 },
            tooltip: { theme: 'dark' }
        };
        const engagementChart = new ApexCharts(engagementEl, engagementChartOptions);
        engagementChart.render();
    }

    // --- 4. Flatpickr Date Range Picker ---
    const dateBtn = document.getElementById('lms-date-range');
    const dateText = document.getElementById('lms-date-text');
    if (dateBtn && dateText && typeof flatpickr !== 'undefined') {
        flatpickr(dateBtn, {
            mode: "range",
            dateFormat: "M j, Y",
            defaultDate: ["2025-05-01", "2025-05-31"],
            onChange: function (selectedDates, dateStr, instance) {
                if (selectedDates.length === 2) {
                    dateText.textContent = instance.formatDate(selectedDates[0], "M j, Y") + " - " + instance.formatDate(selectedDates[1], "M j, Y");
                }
            }
        });
    }
});
