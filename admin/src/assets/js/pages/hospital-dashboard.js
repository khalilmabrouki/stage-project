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

    // --- Helper for Sparklines ---
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
    renderSparkline("#hosp-sparkline-patients", [310, 340, 380, 360, 420, 490, 520], dangerColor);
    renderSparkline("#hosp-sparkline-doctors", [110, 115, 120, 118, 124, 126, 128], primaryColor);
    renderSparkline("#hosp-sparkline-beds", [85, 80, 78, 82, 86, 81, 84], successColor);
    renderSparkline("#hosp-sparkline-revenue", [280, 310, 330, 320, 360, 370, 384], infoColor);

    // --- 1. Admissions & Discharges Trend ---
    const admissionsEl = document.querySelector("#hospital-admissions-chart");
    if (admissionsEl) {
        const admissionsChartOptions = {
            series: [{
                name: 'Admissions',
                data: [320, 450, 390, 520, 610, 580, 690, 740, 710, 820, 890, 950]
            }, {
                name: 'Discharges',
                data: [280, 390, 340, 480, 550, 520, 630, 690, 660, 760, 830, 890]
            }],
            chart: {
                type: 'area',
                height: 310,
                toolbar: { show: false },
                fontFamily: 'inherit',
                background: 'transparent'
            },
            colors: [dangerColor, successColor],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.35,
                    opacityTo: 0.05,
                    stops: [0, 90, 100]
                }
            },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 3 },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { style: { colors: secondaryColor, fontSize: '12px' } }
            },
            yaxis: {
                labels: {
                    formatter: function (value) { return value; },
                    style: { colors: secondaryColor, fontSize: '12px' }
                }
            },
            grid: { borderColor: 'rgba(108, 117, 125, 0.1)', strokeDashArray: 4 },
            legend: { position: 'top', horizontalAlign: 'right', labels: { colors: secondaryColor } },
            tooltip: { theme: 'dark' }
        };
        const admissionsChart = new ApexCharts(admissionsEl, admissionsChartOptions);
        admissionsChart.render();
    }

    // --- 2. Patients by Department ---
    const deptEl = document.querySelector("#hospital-department-chart");
    if (deptEl) {
        const deptChartOptions = {
            series: [35, 25, 20, 12, 8],
            labels: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency'],
            chart: {
                type: 'donut',
                height: 270,
                fontFamily: 'inherit',
                background: 'transparent'
            },
            colors: [dangerColor, primaryColor, infoColor, warningColor, successColor],
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
                                label: 'Total Inpatients',
                                fontSize: '13px',
                                color: secondaryColor,
                                formatter: function () { return "1,240"; }
                            }
                        }
                    }
                }
            },
            dataLabels: { enabled: false },
            stroke: { show: false },
            legend: { position: 'bottom', horizontalAlign: 'center', itemMargin: { horizontal: 8, vertical: 4 } },
            tooltip: { theme: 'dark' }
        };
        const deptChart = new ApexCharts(deptEl, deptChartOptions);
        deptChart.render();
    }

    // --- 3. Blood Bank Inventory Stock (Bar Chart) ---
    const bloodEl = document.querySelector("#hospital-blood-stock-chart");
    if (bloodEl) {
        const bloodChartOptions = {
            series: [{
                name: 'Units Available',
                data: [42, 18, 55, 12, 38, 29, 14, 8]
            }],
            chart: {
                type: 'bar',
                height: 240,
                toolbar: { show: false },
                fontFamily: 'inherit',
                background: 'transparent'
            },
            colors: [dangerColor],
            plotOptions: {
                bar: {
                    borderRadius: 6,
                    columnWidth: '42%',
                    distributed: false
                }
            },
            dataLabels: { enabled: false },
            xaxis: {
                categories: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { style: { colors: secondaryColor, fontSize: '12px' } }
            },
            yaxis: {
                labels: {
                    formatter: function (val) { return val + " u"; },
                    style: { colors: secondaryColor, fontSize: '12px' }
                }
            },
            grid: { borderColor: 'rgba(108, 117, 125, 0.1)', strokeDashArray: 4 },
            tooltip: { theme: 'dark' }
        };
        const bloodChart = new ApexCharts(bloodEl, bloodChartOptions);
        bloodChart.render();
    }

    // --- 4. Flatpickr ---
    const dateBtn = document.getElementById('hospital-date-range');
    const dateText = document.getElementById('hospital-date-text');
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
