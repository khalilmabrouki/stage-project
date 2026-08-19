

function initECharts() {
  const getThemeColor = (name) => getComputedStyle(document.documentElement).getPropertyValue(`--bs-${name}`).trim() || '#000000';
  
  const primary = getThemeColor('primary');
  const success = getThemeColor('success');
  const warning = getThemeColor('warning');
  const danger = getThemeColor('danger');
  const info = getThemeColor('info');

  const lineEl = document.getElementById('echarts-line');
  if (lineEl) {
    const myChart = echarts.init(lineEl);
    myChart.setOption({
      color: [primary],
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const barEl = document.getElementById('echarts-bar');
  if (barEl) {
    const myChart = echarts.init(barEl);
    myChart.setOption({
      color: [success],
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' }]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const pieEl = document.getElementById('echarts-pie');
  if (pieEl) {
    const myChart = echarts.init(pieEl);
    myChart.setOption({
      color: [primary, success, warning, danger, info],
      tooltip: { trigger: 'item' },
      series: [{
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const radarEl = document.getElementById('echarts-radar');
  if (radarEl) {
    const myChart = echarts.init(radarEl);
    myChart.setOption({
      color: [primary, warning],
      tooltip: {},
      radar: { indicator: [{ name: 'Sales', max: 6500 }, { name: 'Admin', max: 16000 }, { name: 'IT', max: 30000 }, { name: 'Customer Support', max: 38000 }, { name: 'Dev', max: 52000 }, { name: 'Marketing', max: 25000 }] },
      series: [{ name: 'Budget vs spending', type: 'radar', data: [{ value: [4200, 3000, 20000, 35000, 50000, 18000], name: 'Allocated Budget' }, { value: [5000, 14000, 28000, 26000, 42000, 21000], name: 'Actual Spending' }] }]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const scatterEl = document.getElementById('echarts-scatter');
  if (scatterEl) {
    const myChart = echarts.init(scatterEl);
    myChart.setOption({
      color: [danger],
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {},
      yAxis: {},
      series: [{ symbolSize: 20, data: [ [10.0, 8.04], [8.0, 6.95], [13.0, 7.58], [9.0, 8.81], [11.0, 8.33], [14.0, 9.96], [6.0, 7.24], [4.0, 4.26], [12.0, 10.84], [7.0, 4.82], [5.0, 5.68] ], type: 'scatter' }]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const gaugeEl = document.getElementById('echarts-gauge');
  if (gaugeEl) {
    const myChart = echarts.init(gaugeEl);
    myChart.setOption({
      series: [{ type: 'gauge', progress: { show: true, width: 18 }, axisLine: { lineStyle: { width: 18 } }, axisTick: { show: false }, splitLine: { length: 15, lineStyle: { width: 2, color: '#999' } }, axisLabel: { distance: 25, color: '#999', fontSize: 14 }, anchor: { show: true, showAbove: true, size: 25, itemStyle: { borderWidth: 10 } }, title: { show: false }, detail: { valueAnimation: true, fontSize: 40, offsetCenter: [0, '70%'] }, data: [{ value: 70 }] }]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const hBarEl = document.getElementById('echarts-horizontal-bar');
  if (hBarEl) {
    const myChart = echarts.init(hBarEl);
    myChart.setOption({
      color: [info],
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'value', boundaryGap: [0, 0.01] },
      yAxis: { type: 'category', data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'] },
      series: [ { type: 'bar', data: [18203, 23489, 29034, 104970, 131744, 630230] } ]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const shBarEl = document.getElementById('echarts-stacked-horizontal-bar');
  if (shBarEl) {
    const myChart = echarts.init(shBarEl);
    myChart.setOption({
      color: [primary, success, warning, danger],
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: {},
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'value' },
      yAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      series: [
        { name: 'Direct', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [320, 302, 301, 334, 390, 330, 320] },
        { name: 'Mail Ad', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Affiliate Ad', type: 'bar', stack: 'total', label: { show: true }, emphasis: { focus: 'series' }, data: [220, 182, 191, 234, 290, 330, 310] }
      ]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const doughnutEl = document.getElementById('echarts-doughnut');
  if (doughnutEl) {
    const myChart = echarts.init(doughnutEl);
    myChart.setOption({
      color: [primary, success, warning, danger, info],
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center' },
      series: [
        {
          name: 'Access From', type: 'pie', radius: ['40%', '70%'], avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: 40, fontWeight: 'bold' } },
          labelLine: { show: false },
          data: [ { value: 1048, name: 'Search Engine' }, { value: 735, name: 'Direct' }, { value: 580, name: 'Email' }, { value: 484, name: 'Union Ads' }, { value: 300, name: 'Video Ads' } ]
        }
      ]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const lineYEl = document.getElementById('echarts-line-y');
  if (lineYEl) {
    const myChart = echarts.init(lineYEl);
    myChart.setOption({
      color: [warning],
      tooltip: { trigger: 'axis' },
      legend: {},
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'value' },
      yAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      series: [ { name: 'Step', type: 'line', data: [150, 230, 224, 218, 135, 147, 260] } ]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const stepLineEl = document.getElementById('echarts-step-line');
  if (stepLineEl) {
    const myChart = echarts.init(stepLineEl);
    myChart.setOption({
      color: [success, primary, danger],
      tooltip: { trigger: 'axis' },
      legend: { data: ['Step Start', 'Step Middle', 'Step End'] },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [
        { name: 'Step Start', type: 'line', step: 'start', data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Step Middle', type: 'line', step: 'middle', data: [220, 282, 201, 234, 290, 430, 410] },
        { name: 'Step End', type: 'line', step: 'end', data: [450, 432, 401, 454, 590, 530, 510] }
      ]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const waterfallEl = document.getElementById('echarts-waterfall');
  if (waterfallEl) {
    const myChart = echarts.init(waterfallEl);
    myChart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, formatter: function (params) {
        var tar = params[1]; return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
      } },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', splitLine: { show: false }, data: ['Total', 'Rent', 'Utilities', 'Transportation', 'Meals', 'Other'] },
      yAxis: { type: 'value' },
      series: [
        { name: 'Placeholder', type: 'bar', stack: 'Total', itemStyle: { borderColor: 'transparent', color: 'transparent' }, emphasis: { itemStyle: { borderColor: 'transparent', color: 'transparent' } }, data: [0, 1700, 1400, 1200, 300, 0] },
        { name: 'Life Cost', type: 'bar', stack: 'Total', label: { show: true, position: 'inside' }, data: [2900, 1200, 300, 200, 900, 300] }
      ]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const boxplotEl = document.getElementById('echarts-boxplot');
  if (boxplotEl) {
    const myChart = echarts.init(boxplotEl);
    myChart.setOption({
      color: [primary],
      title: { text: 'Boxplot', left: 'center' },
      dataset: [{ source: [
        [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
        [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800]
      ] }, { transform: { type: 'boxplot', config: { itemNameFormatter: 'expr {value}' } } }, { fromDatasetIndex: 1, fromTransformResult: 1 }],
      tooltip: { trigger: 'item', axisPointer: { type: 'shadow' } },
      grid: { left: '10%', right: '10%', bottom: '15%' },
      xAxis: { type: 'category', boundaryGap: true, nameGap: 30, splitArea: { show: false }, splitLine: { show: false } },
      yAxis: { type: 'value', name: 'Value', splitArea: { show: true } },
      series: [ { name: 'boxplot', type: 'boxplot', datasetIndex: 1 } ]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const pictorialEl = document.getElementById('echarts-pictorial');
  if (pictorialEl) {
    const myChart = echarts.init(pictorialEl);
    myChart.setOption({
      color: [success],
      tooltip: { trigger: 'axis', axisPointer: { type: 'none' }, formatter: function (params) { return params[0].name + ': ' + params[0].value; } },
      xAxis: { data: ['A', 'B', 'C', 'D', 'E'], axisTick: { show: false }, axisLine: { show: false }, axisLabel: { color: '#e54035' } },
      yAxis: { splitLine: { show: false }, axisTick: { show: false }, axisLine: { show: false }, axisLabel: { show: false } },
      series: [{
        name: 'hill', type: 'pictorialBar', barCategoryGap: '-130%',
        symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
        itemStyle: { opacity: 0.5 },
        emphasis: { itemStyle: { opacity: 1 } },
        data: [123, 60, 25, 18, 12],
        z: 10
      }]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }

  const pieRichEl = document.getElementById('echarts-pie-rich');
  if (pieRichEl) {
    const myChart = echarts.init(pieRichEl);
    myChart.setOption({
      color: [primary, success, warning, danger, info],
      tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
      series: [
        {
          name: 'Access From', type: 'pie', radius: ['40%', '70%'],
          labelLine: { length: 30 },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#F6F8FC',
            borderColor: '#8C8D8E',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: { color: '#6E7079', lineHeight: 22, align: 'center' },
              hr: { borderColor: '#8C8D8E', width: '100%', borderWidth: 1, height: 0 },
              b: { color: '#4C5058', fontSize: 14, fontWeight: 'bold', lineHeight: 33 },
              per: { color: '#fff', backgroundColor: '#4C5058', padding: [3, 4], borderRadius: 4 }
            }
          },
          data: [ { value: 1048, name: 'Baidu' }, { value: 335, name: 'Direct' }, { value: 310, name: 'Email' }, { value: 251, name: 'Google' }, { value: 102, name: 'Others' } ]
        }
      ]
    });
    new ResizeObserver(() => myChart.resize()).observe(myChart.getDom());
  }
}
