

function initApexCharts() {
  const getThemeColor = (name) => getComputedStyle(document.documentElement).getPropertyValue(`--bs-${name}`).trim() || '#000000';
  
  const primary = getThemeColor('primary');
  const success = getThemeColor('success');
  const warning = getThemeColor('warning');
  const danger = getThemeColor('danger');
  const info = getThemeColor('info');

  const commonOptions = {
    chart: { fontFamily: 'inherit', toolbar: { show: false } },
    colors: [primary, success, warning, danger, info],
  };

  if (document.getElementById('apex-line')) {
    new ApexCharts(document.getElementById('apex-line'), { ...commonOptions, series: [{ name: "Desktops", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }], chart: { type: 'line', height: 300 }, stroke: { curve: 'smooth' } }).render();
  }
  if (document.getElementById('apex-area')) {
    new ApexCharts(document.getElementById('apex-area'), { ...commonOptions, series: [{ name: "STOCK ABC", data: [31, 40, 28, 51, 42, 109, 100] }, { name: "STOCK XYZ", data: [11, 32, 45, 32, 34, 52, 41] }], chart: { type: 'area', height: 300 }, dataLabels: { enabled: false }, stroke: { curve: 'smooth' } }).render();
  }
  if (document.getElementById('apex-bar')) {
    new ApexCharts(document.getElementById('apex-bar'), { ...commonOptions, series: [{ data: [400, 430, 448, 470, 540, 580, 690] }], chart: { type: 'bar', height: 300 }, plotOptions: { bar: { horizontal: true } } }).render();
  }
  if (document.getElementById('apex-column')) {
    new ApexCharts(document.getElementById('apex-column'), { ...commonOptions, series: [{ name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63] }, { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91] }], chart: { type: 'bar', height: 300 }, plotOptions: { bar: { horizontal: false, columnWidth: '55%' } }, dataLabels: { enabled: false } }).render();
  }
  if (document.getElementById('apex-pie')) {
    new ApexCharts(document.getElementById('apex-pie'), { ...commonOptions, series: [44, 55, 13, 43, 22], chart: { type: 'pie', width: 380 }, labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'] }).render();
  }
  if (document.getElementById('apex-doughnut')) {
    new ApexCharts(document.getElementById('apex-doughnut'), { ...commonOptions, series: [44, 55, 41, 17, 15], chart: { type: 'donut', width: 380 }, labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'] }).render();
  }
  if (document.getElementById('apex-range-area')) {
    new ApexCharts(document.getElementById('apex-range-area'), { ...commonOptions, series: [{ name: 'New York Temperature', data: [{ x: 'Jan', y: [-2, 4] }, { x: 'Feb', y: [-1, 6] }, { x: 'Mar', y: [3, 10] }, { x: 'Apr', y: [8, 16] }, { x: 'May', y: [13, 22] }, { x: 'Jun', y: [18, 26] }] }], chart: { type: 'rangeArea', height: 300 }, stroke: { curve: 'straight' } }).render();
  }
  if (document.getElementById('apex-bubble')) {
    new ApexCharts(document.getElementById('apex-bubble'), { ...commonOptions, series: [{ name: 'Bubble1', data: [[1, 2, 30], [2, 4, 40], [3, 1, 20], [4, 6, 50]] }, { name: 'Bubble2', data: [[1, 3, 20], [2, 5, 30], [3, 2, 40], [4, 4, 30]] }], chart: { type: 'bubble', height: 300 }, fill: { opacity: 0.8 }, dataLabels: { enabled: false } }).render();
  }
  if (document.getElementById('apex-scatter')) {
    new ApexCharts(document.getElementById('apex-scatter'), { ...commonOptions, series: [{ name: "Sample A", data: [[16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]] }, { name: "Sample B", data: [[36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]] }], chart: { type: 'scatter', height: 300, zoom: { enabled: true, type: 'xy' } } }).render();
  }
  function generateData(count, yrange) {
    var i = 0; var series = [];
    while (i < count) {
      var x = 'w' + (i + 1).toString();
      var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      series.push({ x: x, y: y });
      i++;
    }
    return series;
  }
  if (document.getElementById('apex-heatmap')) {
    new ApexCharts(document.getElementById('apex-heatmap'), { ...commonOptions, series: [{ name: 'Metric1', data: generateData(18, { min: 0, max: 90 }) }, { name: 'Metric2', data: generateData(18, { min: 0, max: 90 }) }, { name: 'Metric3', data: generateData(18, { min: 0, max: 90 }) }, { name: 'Metric4', data: generateData(18, { min: 0, max: 90 }) }], chart: { type: 'heatmap', height: 300 }, dataLabels: { enabled: false } }).render();
  }
  if (document.getElementById('apex-treemap')) {
    new ApexCharts(document.getElementById('apex-treemap'), { ...commonOptions, series: [{ data: [{ x: 'New Delhi', y: 218 }, { x: 'Kolkata', y: 149 }, { x: 'Mumbai', y: 184 }, { x: 'Ahmedabad', y: 55 }, { x: 'Bangaluru', y: 84 }, { x: 'Pune', y: 31 }] }], chart: { type: 'treemap', height: 300 } }).render();
  }
  if (document.getElementById('apex-radialbar')) {
    new ApexCharts(document.getElementById('apex-radialbar'), { ...commonOptions, series: [44, 55, 67, 83], chart: { type: 'radialBar', height: 350 }, plotOptions: { radialBar: { dataLabels: { name: { fontSize: '22px' }, value: { fontSize: '16px' }, total: { show: true, label: 'Total', formatter: function () { return 249 } } } } }, labels: ['Apples', 'Oranges', 'Bananas', 'Berries'] }).render();
  }
  if (document.getElementById('apex-radar')) {
    new ApexCharts(document.getElementById('apex-radar'), { ...commonOptions, series: [{ name: 'Series 1', data: [80, 50, 30, 40, 100, 20] }, { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] }], chart: { type: 'radar', height: 350 }, labels: ['January', 'February', 'March', 'April', 'May', 'June'] }).render();
  }
  if (document.getElementById('apex-funnel')) {
    new ApexCharts(document.getElementById('apex-funnel'), { ...commonOptions, series: [{ name: "Funnel Series", data: [1380, 1100, 990, 880, 740, 548, 330, 200] }], chart: { type: 'bar', height: 300 }, plotOptions: { bar: { borderRadius: 0, horizontal: true, barHeight: '80%', isFunnel: true } }, dataLabels: { enabled: true, formatter: function (val, opt) { return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val }, dropShadow: { enabled: true } }, title: { text: 'Recruitment Funnel', align: 'center' } }).render();
  }
  if (document.getElementById('apex-candlestick')) {
    new ApexCharts(document.getElementById('apex-candlestick'), {
      ...commonOptions,
      series: [{
        data: [
          { x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
          { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
          { x: new Date(1538782200000), y: [6630.71, 6648.95, 6623.34, 6635.65] },
          { x: new Date(1538784000000), y: [6635.65, 6651, 6629.67, 6638.24] }
        ]
      }],
      chart: { type: 'candlestick', height: 300 },
      xaxis: { type: 'datetime' }
    }).render();
  }
  if (document.getElementById('apex-slope')) {
    new ApexCharts(document.getElementById('apex-slope'), {
      ...commonOptions,
      series: [
        { name: 'Blue', data: [{ x: 'Jan', y: 43 }, { x: 'Dec', y: 58 }] },
        { name: 'Green', data: [{ x: 'Jan', y: 33 }, { x: 'Dec', y: 38 }] },
        { name: 'Red', data: [{ x: 'Jan', y: 55 }, { x: 'Dec', y: 21 }] }
      ],
      chart: { type: 'line', height: 300 },
      stroke: { width: 2 },
      grid: { xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } }
    }).render();
  }
  if (document.getElementById('apex-mixed')) {
    new ApexCharts(document.getElementById('apex-mixed'), {
      ...commonOptions,
      series: [{ name: 'Income', type: 'column', data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6] }, { name: 'Cashflow', type: 'column', data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5] }, { name: 'Revenue', type: 'line', data: [20, 29, 37, 36, 44, 45, 50, 58] }],
      chart: { height: 300, type: 'line' },
      stroke: { width: [1, 1, 4] },
      xaxis: { categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016] },
      yaxis: [{ title: { text: 'Income' } }, { title: { text: 'Cashflow' } }, { opposite: true, title: { text: 'Revenue' } }]
    }).render();
  }
}
