// FIXME this component should be in Home component's folder
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../StatisticalChartActions';
import StatisticalChart from '../StatisticalChart';
import StatisticalChartGuide from '../StatisticalChartGuide';

function IranChart(props) {
  useEffect(() => {
    props.fetchData();
  });

  return (
    <>
      {!props.isLoaded ? (
        <div className="spinner"></div>
      ) : (
        <>
          <StatisticalChartGuide
            isLoaded={props.isLoaded}
            data={props.data}
            area="iran"
          />
          <StatisticalChart
            isLoaded={props.isLoaded}
            data={props.data}
            area="iran"
            type="notStacked"
          />
        </>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    isLoaded: state.StatisticalChart.isLoaded,
    data: state.StatisticalChart.data,
  };
}

export default connect(mapStateToProps, { fetchData })(IranChart);
