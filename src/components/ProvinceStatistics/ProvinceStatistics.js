import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProvinceData } from "./ProvinceStatisticsActions";
import * as d3 from "d3";

class ProvinceStatistics extends Component {

  componentDidMount() {
    this.props.fetchProvinceData();
  }

  render(){
    return (
      <div>
        {this.props.data !== undefined &&
        <>
          <h2>
            dead : {this.props.data.dead[0]}
          </h2>
          <h2>
            patient: {this.props.data.patients[0]}
          </h2>
          <h2>
            recovered: {this.props.data.recovered[0]}
          </h2>
        </>
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state.ProvinceStatisticsReducer.data.iran)
  return {
    data: state.ProvinceStatisticsReducer.data.iran
  }
}

export default connect(mapStateToProps, { fetchProvinceData })(ProvinceStatistics);