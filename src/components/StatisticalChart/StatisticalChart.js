// FIXME this component should be in Home component's folder
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import { fetchData } from "./StatisticalChartActions";
import StatisticalChartGuide from "./StatisticalChartGuide";
// FIXME use sass instead of css
import "./StatisticalChart.css";


function StatisticalChart(props){

  const hasMount = useRef(false);

  useEffect(() => {
    props.fetchData();
  });

  useEffect(() => {
    if(!hasMount.current && props.isLoaded) {
      initialDraw();
      hasMount.current = true;
    }
  });

  const getObjectKeys = (obj) => Object.keys(obj);

  const constructProperDataFormatArea = (patients, recovered, dead) =>  {
    let data = [];
    for (let i = 0; i < patients.length; i++) {
      data.push({
        date: i,
        patient: patients[i],
        recovered: recovered[i],
        dead: dead[i]
      });
    }
    return data;
  }

  const constructProperDataFormatLine = (patients, recovered, dead) =>  {
    let data = [];
    let date = [];
    for (let i = 0; i < patients.length; i++) {
      date.push({i});
    }
    data.push({ name: "date", values: date });
    data.push({ name: "patients", values: patients });
    data.push({ name: "recovered", values: recovered });
    data.push({ name: "dead", values: dead });
    return data;
  }

  const drawChart = (dataArea, dataLine) => {
    let margin = ({top: 0, right: 0, bottom: 0, left: 0});
    let width = window.innerWidth;
    let height = window.innerHeight*0.2 < 200 ? 200 : window.innerHeight*0.3;

    let columns = getObjectKeys(dataArea[0]);
    Object.assign(dataArea, {columns: columns});
    let series = d3.stack().keys(dataArea.columns.slice(1))(dataArea);

    let x = d3.scaleLinear()
      .domain(d3.extent(dataArea, d => { return d.date}))
      .range([margin.left, width - margin.right]);

    let y = d3.scaleLinear()
      .domain([0, d3.max(series, d => d3.max(d, d => d[1]-d[0]))]).nice()
      .range([height - margin.bottom, margin.top]);

    let colorArea = d3.scaleOrdinal()
      .domain(dataArea.columns.slice(1))
      .range(["rgba(255,65,105,0.15)", "rgba(0,255,186,0.15)", "rgba(0, 0, 0, 0.3)"]);

    let colorLine = d3.scaleOrdinal()
      .domain(0, 2)
      .range(["rgb(235,59,93)", "rgb(0,255,186)", "rgba(0,0,0,0.5)"]);

    let area = d3.area()
      .x(d => x(d.data.date))
      .y0(d => y(0))
      .y1(d => y((d[1])-(d[0])))
      .curve(d3.curveMonotoneX);

    let line = d3.line()
      .defined(d => !isNaN(d))
      .x((d, i) => x(i))
      .y(d => y(d));

    let svg = d3.select(".svg-daily-behavior")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
      .selectAll("path")
      .data(series)
      .join("path")
      .attr("fill", ({key}) => colorArea(key))
      .attr("d", area)
      .append("title")
      .text(({key}) => key);

    svg.append("g")
      .selectAll("path")
      .data(dataLine.slice(1))
      .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("d", d => line(d.values))
      .attr("fill", "none")
      .attr("stroke", (d,i) => colorLine(i))
      .attr("stroke-width", 1)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round");
  }

  const initialDraw = () => {
    let dataArea = constructProperDataFormatArea(props.patients, props.recovered, props.dead);
    let dataLine = constructProperDataFormatLine(props.patients, props.recovered, props.dead);
    drawChart(dataArea, dataLine);
  }

  return (
    <>
      {!props.isLoaded ?
        <div className="spinner"></div>
        :
        <>
          <StatisticalChartGuide data={props}/>
          <svg className='svg-daily-behavior'/>
        </>
      }
    </>
  );
}

function mapStateToProps(state){
  return {
    isLoaded: state.StatisticalChart.isLoaded,
    patients: state.StatisticalChart.patients,
    recovered: state.StatisticalChart.recovered,
    dead: state.StatisticalChart.dead
  }
}

export default connect(mapStateToProps, { fetchData })(StatisticalChart);