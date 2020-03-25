import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProvinceData } from "./ProvinceStatisticsActions";
import * as d3 from "d3";

const days = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];

class ProvinceStatistics extends Component {

  constructor(props) {
    super(props);

    this.getObjectKeys = this.getObjectKeys.bind(this);
    this.constructProperDataFormat = this.constructProperDataFormat.bind(this);
    this.initialDisplay = this.initialDisplay.bind(this);
  }

  componentDidMount() {
    this.props.fetchProvinceData();
  }

  componentDidUpdate(prevProps) {
    if(this.props.isLoaded !== prevProps.isLoaded){
      const { isLoaded, patients, dead, recovered } = this.props;
      let data = this.constructProperDataFormat(patients, dead, recovered);
      this.initialDisplay(data);
    }
  }

  constructProperDataFormat(patients, dead, recovered) {
    let data = [];
    for (let i = 0; i < patients.length; i++) {
      data.push({
        date: i,
        patient: patients[i],
        dead: dead[i],
        recovered: recovered[i]
      });
    }
    return data;
  }

  getObjectKeys(obj, sliceNum) {
    return Object.keys(obj).slice(sliceNum);
  }

  initialDisplay(data) {

    let columns = this.getObjectKeys(data[0], 1)
    let daily_data = Object.assign(data, {columns: columns})
    let series = d3.stack().keys(data.columns)(daily_data)

    console.log(series[0])

    let margin = ({top: 20, right: 30, bottom: 30, left: 40})
    let width = window.innerWidth;
    let height = 200;

    let x = d3.scaleUtc()
      .domain(d3.extent(daily_data, d => d.date))
      .range([margin.left, width - margin.right])

    let y = d3.scaleLinear()
      .domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).nice()
      .range([height - margin.bottom, margin.top])

    let xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    let yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(daily_data.y))

    let color = d3.scaleOrdinal()
      .domain(daily_data.columns)
      .range(d3.schemeCategory10)

    let area = d3.area()
      .x(d => x(d.data.date))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]))

    let svg = d3.select(".svg-daily-behavior")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
      .selectAll("path")
      .data(series)
      .join("path")
      .attr("fill", ({key}) => color(key))
      .attr("d", area)
      .append("title")
      .text(({key}) => key);

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);
  }

  render(){
    const { isLoaded, patients, dead, recovered } = this.props;

    if (!isLoaded) {
      // TODO
      return <div>Spinner</div>;
    }

    return (
      <div>
        <svg className='svg-daily-behavior' />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    isLoaded: state.ProvinceStatisticsReducer.isLoaded,
    patients: state.ProvinceStatisticsReducer.patients,
    dead: state.ProvinceStatisticsReducer.dead,
    recovered: state.ProvinceStatisticsReducer.recovered
  }
}

export default connect(mapStateToProps, { fetchProvinceData })(ProvinceStatistics);