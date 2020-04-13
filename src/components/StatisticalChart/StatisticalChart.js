import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './StatisticalChart.css';

function StatisticalChart(props) {
  const dimension = {
    margin: { top: 0, right: 0, bottom: 32, left: 0 },
    width: window.innerWidth,
    height: window.innerHeight * 0.25 < 250 ? 200 : window.innerHeight * 0.3,
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

  const constructProperDataFormatArea = (data, keys, keysDataLen) => {
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
  const dataArea = constructProperDataFormatArea(data, keys, keysDataLen);

  const constructProperDataFormatLine = (data, keys, keysDataLen) => {
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
  const dataLine = constructProperDataFormatLine(data, keys, keysDataLen);

  const getSeries = () => {
    let columns = Object.keys(dataArea[0]);
    Object.assign(dataArea, { columns: columns });
    return d3.stack().keys(keys)(dataArea);
  };

  const getX = () =>
    d3
      .scaleLinear()
      .domain(
        d3.extent(dataArea, (d) => {
          return d.date;
        })
      )
      .range([dimension.margin.left, dimension.width - dimension.margin.right]);

  const getY = () =>
    d3
      .scaleLinear()
      .domain([0, d3.max(getSeries(), (d) => d3.max(d, (d) => d[1] - d[0]))])
      .nice()
      .range([
        dimension.height - dimension.margin.bottom,
        dimension.margin.top,
      ]);

  const getArea = () => {
    const x = getX();
    return d3
      .area()
      .x((d) => {
        return x(d.data.date);
      })
      .curve(d3.curveMonotoneX);
  };

  const getLine = () => {
    const x = getX();
    const y = getY();
    return d3
      .line()
      .defined((d) => !isNaN(d))
      .x((d, i) => x(i))
      .y((d) => y(d));
  };

  const getAreaColor = () =>
    d3
      .scaleOrdinal()
      .domain(keys)
      .range([
        'rgba(255,65,105,0.15)',
        'rgba(0, 0, 0, 0.3)',
        'rgba(0,255,186,0.15)',
      ]);

  const getLineColor = () =>
    d3
      .scaleOrdinal()
      .domain(keys)
      .range(['rgb(235,59,93)', 'rgba(0,0,0,0.5)', 'rgb(0,255,186)']);

  const drawArea = (g) => {
    const y = getY();
    const area = getArea();
    const areaColor = getAreaColor();

    if (props.type === 'notStacked')
      area.y0((d) => y(0)).y1((d) => y(d[1] - d[0]));
    else area.y0((d) => y(d[0])).y1((d) => y(d[1]));

    return g
      .selectAll('path')
      .data(getSeries())
      .join('path')
      .attr('fill', ({ key }) => areaColor(key))
      .attr('d', area)
      .append('title')
      .text(({ key }) => key);
  };

  const drawLine = (g) => {
    const line = getLine();
    const lineColor = getLineColor();

    return g
      .selectAll('path')
      .data(dataLine.slice(1))
      .join('path')
      .style('mix-blend-mode', 'multiply')
      .attr('d', (d) => line(d.values))
      .attr('fill', 'none')
      .attr('stroke', (d, i) => lineColor(i))
      .attr('stroke-width', 1)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round');
  };

  const lastUpdateTime = (g) => {
    const lastUpdate = new Date(props.data.last_update).toLocaleDateString(
      'fa-IR'
    );
    const date = `تاریخ آخرین به‌روز‌رسانی: ${lastUpdate}`;
    return g
      .attr('dx', '.35em')
      .attr(
        'transform',
        `translate(150,${dimension.height - dimension.margin.bottom - 32})`
      )
      .attr('font-family', 'IRANYekan')
      .attr('font-size', 10)
      .text(date);
  };

  const drawXAxis = (g) => {
    let xDomain = [];
    let step = (keysDataLen - 1) / 6;
    for (let i = 0; i < 7; i++)
      xDomain[i] = dataArea[Math.floor(step * i)].title;

    let xLabel = d3
      .scalePoint()
      .domain(xDomain)
      .range([dimension.margin.left, dimension.width - dimension.margin.right]);

    return g
      .attr(
        'transform',
        `translate(-.5,${dimension.height - dimension.margin.bottom})`
      )
      .call(d3.axisBottom(xLabel))
      .selectAll('text')
      .style('text-anchor', 'middle')
      .style('font-family', 'IRANYekan');
  };

  const drawChart = () => {
    let svg = d3
      .select('.svg-daily-behavior')
      .attr('width', dimension.width)
      .attr('height', dimension.height)
      .attr('viewBox', [0, 0, dimension.width, dimension.height]);

    svg.append('g').call(drawArea);
    svg.append('g').call(drawLine);
    svg.append('g').call(drawXAxis);
    svg.append('text').call(lastUpdateTime);

    d3.selectAll('.tick').each(function (d, i) {
      if (i == 0 || i == 6) {
        this.remove();
      }
    });
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
