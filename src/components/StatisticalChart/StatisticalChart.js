import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './StatisticalChart.css';
import { engToPerDigits } from '../../utils/persianize';

function StatisticalChart(props) {
  const dimension = {
    margin: { top: 32, right: 0, bottom: 32, left: 0 },
    width: window.innerWidth,
    height: window.innerHeight * 0.25 < 250 ? 250 : window.innerHeight * 0.3,
  };
  const data = props.data[props.area];
  const keys = Object.keys(data);
  const keysDataLen = data[keys[0]].length;
  const hasMount = useRef(false);

  useEffect(() => {
    if (!hasMount.current && props.isLoaded) {
      drawChart();
      hasMount.current = true;
    }
  });

  const constructProperDataArea = (data, keys, keysDataLen) => {
    let properDataArea = [];
    for (let i = 0; i < keysDataLen; i++) {
      let newObj = {};
      newObj['date'] = i;
      let dt = new Date(props.data.last_update);
      let newDt = new Date(
        dt.setDate(dt.getDate() + i + 1 - keysDataLen)
      ).toLocaleDateString('fa-IR');
      newObj['title'] = String(newDt);
      for (let j = 0; j < keys.length; j++) newObj[keys[j]] = data[keys[j]][i];
      properDataArea.push(newObj);
    }
    return properDataArea;
  };

  const constructProperDataLine = (data, keys, keysDataLen) => {
    let properDataLine = [];

    let date = [];
    for (let i = 0; i < keysDataLen; i++) date.push(i);
    properDataLine.push({ name: 'date', values: date });

    for (let i = 0; i < keys.length; i++) {
      if (props.type === 'notStacked')
        properDataLine.push({ name: keys[i], values: data[keys[i]] });
      else {
        // TODO: fix bug
        let sum = new Array(keysDataLen).fill(0);
        for (let j = 0; j < keysDataLen; j++)
          for (let k = 0; k <= j; k++) sum[j] = sum[j] + data[keys[i]][k];
        properDataLine.push({ name: keys[i], values: sum });
      }
    }
    return properDataLine;
  };

  const constructProperDataAxis = (dataArea) => {
    let xDomain = [];
    let step = (keysDataLen - 1) / 6;
    for (let i = 0; i < 7; i++)
      xDomain[i] = dataArea[Math.floor(step * i)].title;
    return xDomain;
  };

  const getSeries = (dataArea) => {
    let columns = Object.keys(dataArea[0]);
    Object.assign(dataArea, { columns: columns });
    return d3.stack().keys(keys)(dataArea);
  };

  const getX = (dataArea) =>
    d3
      .scaleLinear()
      .domain(
        d3.extent(dataArea, (d) => {
          return d.date;
        })
      )
      .range([dimension.margin.left, dimension.width - dimension.margin.right]);

  const getY = (dataArea) =>
    d3
      .scaleLinear()
      .domain([
        0,
        d3.max(getSeries(dataArea), (d) => d3.max(d, (d) => d[1] - d[0])),
      ])
      .nice()
      .range([
        dimension.height - dimension.margin.bottom,
        dimension.margin.top,
      ]);

  const getArea = (x) =>
    d3
      .area()
      .x((d) => x(d.data.date))
      .curve(d3.curveMonotoneX);

  const getLine = (x, y) =>
    d3
      .line()
      .defined((d) => !isNaN(d))
      .x((d, i) => x(i))
      .y((d) => y(d));

  const getColor = () =>
    d3
      .scaleOrdinal()
      .domain(keys)
      .range(['rgb(235,59,93)', 'rgba(0,0,0,0.68)', 'rgb(0,255,186)']);

  const areaGradientColor = (g, keys, color) => {
    for (let i = 0; i < keys.length; i++) {
      const areaGradient = g
        .append('defs')
        .append('linearGradient')
        .attr('id', `area-gradient-${keys[i]}`)
        .attr('x1', '20%')
        .attr('y1', '40%')
        .attr('x2', '100%')
        .attr('y2', '100%');

      areaGradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', color(i))
        .attr('stop-opacity', 1);
      areaGradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'white')
        .attr('stop-opacity', 0);
    }
  };

  const drawArea = (g, dataArea, y, area) => {
    if (props.type === 'notStacked')
      area.y0((d) => y(0)).y1((d) => y(d[1] - d[0]));
    else area.y0((d) => y(d[0])).y1((d) => y(d[1]));
    return g
      .selectAll('path')
      .data(getSeries(dataArea))
      .join('path')
      .attr('fill', ({ key }) => `url(#area-gradient-${key})`)
      .attr('d', area)
      .append('title')
      .text(({ key }) => key);
  };

  const drawLine = (g, dataLine, line, color) =>
    g
      .selectAll('path')
      .data(dataLine.slice(1))
      .join('path')
      .style('mix-blend-mode', 'multiply')
      .attr('d', (d) => line(d.values))
      .attr('fill', 'none')
      .attr('stroke', (d, i) => color(i))
      .attr('stroke-width', 1)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round');

  const getXLabel = (dataArea) => {
    const xDomain = constructProperDataAxis(dataArea);

    return d3
      .scalePoint()
      .domain(xDomain)
      .range([
        dimension.margin.left - 1,
        dimension.width - dimension.margin.right + 1,
      ]);
  };

  const drawXAxis = (g, dataArea) => {
    let xLabel = getXLabel(dataArea);
    return g
      .attr(
        'transform',
        `translate(0,${dimension.height - dimension.margin.bottom})`
      )
      .call(d3.axisBottom(xLabel))
      .selectAll('text')
      .attr('class', 'x-axis-text');
  };

  const drawYAxis = (g, y) => {
    return g
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).tickSize(-dimension.width))
      .call((g) => g.select('.domain').remove())
      .selectAll('text')
      .attr('class', 'y-axis-text')
      .attr('x', 10)
      .attr('dy', '-.32em');
  };

  const translateYAxis = () =>
    d3.selectAll('.y-axis-text').each(function (d, i) {
      d3.select(this).text(engToPerDigits(d));
    });

  const removeFirstLastLabelXAxis = () =>
    d3.selectAll('.x-axis-text').each(function (d, i) {
      if (i == 0 || i == 6) {
        this.remove();
      }
    });

  const lastUpdateTime = (g) => {
    const lastUpdate = new Date(props.data.last_update).toLocaleDateString(
      'fa-IR'
    );
    const date = `آخرین به‌روز ‌رسانی: ${lastUpdate}`;
    return g
      .attr('dx', '.35em')
      .attr('transform', `translate(${dimension.width - 24} ,16)`)
      .attr('font-family', 'IRANSans')
      .attr('font-size', 10)
      .text(date);
  };

  const getSVG = () =>
    d3
      .select('.svg-daily-behavior')
      .attr('width', dimension.width)
      .attr('height', dimension.height)
      .attr('viewBox', [0, 0, dimension.width, dimension.height]);

  const drawChart = () => {
    const dataArea = constructProperDataArea(data, keys, keysDataLen);
    const dataLine = constructProperDataLine(data, keys, keysDataLen);
    const x = getX(dataArea);
    const y = getY(dataArea);

    const svg = getSVG();
    // svg.append('g').call((g) => {
    //   drawYAxis(g, y, dataArea);
    // });
    svg.append('g').call((g) => {
      areaGradientColor(g, keys, getColor());
    });
    svg.append('g').call((g) => {
      drawArea(g, dataArea, y, getArea(x));
    });
    svg.append('g').call((g) => {
      drawLine(g, dataLine, getLine(x, y), getColor());
    });
    svg.append('g').call((g) => {
      drawXAxis(g, dataArea);
    });
    // svg.append('text').call(lastUpdateTime);

    removeFirstLastLabelXAxis();
    translateYAxis();
  };

  return (
    <>
      {!props.isLoaded ? (
        <div className="spinner"></div>
      ) : (
        <svg className="svg-daily-behavior" />
      )}
    </>
  );
}

export default StatisticalChart;
