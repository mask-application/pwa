import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProvinceData } from "./ProvinceStatisticsActions";
import * as d3 from "d3";

class ProvinceStatistics extends Component {

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // TODO : http://jsfiddle.net/cdagli/b2uq8704/6/ worked but my version doesn't work!
  componentDidMount() {
    this.props.fetchProvinceData();
  }

  render(){
    return (
      <ul>
        {
          this.props.data &&
          this.props.data.map((d) =>{
            return(
              <li>{d.title}</li>
            )
          })
        }
      </ul>
    )
  }
}

function mapStateToProps(state){
  return {
    data: state.data
  }
}

export default connect(mapStateToProps, { fetchProvinceData })(ProvinceStatistics);