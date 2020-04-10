import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './StatisticalChart.css';

function translateNum(n) {
  let num = JSON.parse(
    '{".":"/","0":"۰","1":"۱","2":"۲","3":"۳","4":"۴","5":"۵","6":"۶","7":"۷","8":"۸","9":"۹"}'
  );
  return n.replace(/./g, function (c) {
    return typeof num[c] === 'undefined' ? (/\d+/.test(c) ? c : '') : num[c];
  });
  return n;
}

function StatisticalChart(props) {
  const hasMount = useRef(false);

  useEffect(() => {
    if (!hasMount.current && props.isLoaded) {
      initialDraw();
      hasMount.current = true;
    }
  });

  const getObjectKeys = (obj) => Object.keys(obj);

  const constructProperDataFormatArea = (data, keys, keysDataLen) => {
    let properDataArea = [];

    for (let i = 0; i < keysDataLen; i++) {
      let newObj = {};
      newObj['date'] = i;
      newObj['title'] = String('روز ' + translateNum(String(i + 1)));
      for (let j = 0; j < keys.length; j++) newObj[keys[j]] = data[keys[j]][i];
      properDataArea.push(newObj);
    }
    return properDataArea;
  };

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

  const drawChart = (dataArea, dataLine, keys, keysDataLen, lastUpdate) => {
    let margin = { top: 0, right: 0, bottom: 50, left: 0 };
    let width = window.innerWidth;
    let height =
      window.innerHeight * 0.25 < 250 ? 200 : window.innerHeight * 0.3;

    let columns = getObjectKeys(dataArea[0]);
    Object.assign(dataArea, { columns: columns });
    let series = d3.stack().keys(keys)(dataArea);

    let x = d3
      .scaleLinear()
      .domain(
        d3.extent(dataArea, (d) => {
          return d.date;
        })
      )
      .range([margin.left, width - margin.right]);

    let xDomain = [];
    let step = keysDataLen / 7;
    for (let i = 0; i < 7; i++)
      xDomain[i] = dataArea[Math.floor(step * i)].title;

    let xLabel = d3
      .scalePoint()
      .domain(xDomain)
      .range([margin.left, width - margin.right]);

    let xAxis = (g) =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xLabel))
        .selectAll('text')
        .attr('transform', 'translate(12,0)rotate(45)')
        .style('text-anchor', 'end')
        .style('font-family', 'IRANYekan');

    let y = d3
      .scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1] - d[0]))])
      .nice()
      .range([height - margin.bottom, margin.top]);

    let colorArea = d3
      .scaleOrdinal()
      .domain(keys)
      .range([
        'rgba(255,65,105,0.15)',
        'rgba(0, 0, 0, 0.3)',
        'rgba(0,255,186,0.15)',
      ]);

    let colorLine = d3
      .scaleOrdinal()
      .domain(keys)
      .range(['rgb(235,59,93)', 'rgba(0,0,0,0.5)', 'rgb(0,255,186)']);

    let area = d3
      .area()
      .x((d) => {
        return x(d.data.date);
      })
      .curve(d3.curveMonotoneX);

    if (props.type === 'notStacked')
      area.y0((d) => y(0)).y1((d) => y(d[1] - d[0]));
    else area.y0((d) => y(d[0])).y1((d) => y(d[1]));

    let line = d3
      .line()
      .defined((d) => !isNaN(d))
      .x((d, i) => x(i))
      .y((d) => y(d));

    let svg = d3
      .select('.svg-daily-behavior')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    svg
      .append('g')
      .selectAll('path')
      .data(series)
      .join('path')
      .attr('fill', ({ key }) => colorArea(key))
      .attr('d', area)
      .append('title')
      .text(({ key }) => key);

    svg
      .append('g')
      .selectAll('path')
      .data(dataLine.slice(1))
      .join('path')
      .style('mix-blend-mode', 'multiply')
      .attr('d', (d) => line(d.values))
      .attr('fill', 'none')
      .attr('stroke', (d, i) => colorLine(i))
      .attr('stroke-width', 1)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round');

    svg.append('g').call(xAxis);

    const date = `تاریخ آخرین به‌روز‌رسانی: ${lastUpdate}`;
    svg
      .append('text')
      .attr('dx', '.35em')
      .attr('transform', `translate(160,${height - margin.bottom - 32})`)
      .attr('font-family', 'IRANYekan')
      .attr('font-size', 10)
      .text(date);
  };

  const initialDraw = () => {
    let data = props.data[props.area];
    let keys = getObjectKeys(data);
    let keysDataLen = data[keys[0]].length;
    let dataArea = constructProperDataFormatArea(data, keys, keysDataLen);
    let dataLine = constructProperDataFormatLine(data, keys, keysDataLen);
    let lastUpdate = new Date(props.data.last_update).toLocaleDateString(
      'fa-IR'
    );
    drawChart(dataArea, dataLine, keys, keysDataLen, lastUpdate);
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
