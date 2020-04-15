import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../StatisticalChartActions';
import StatisticalChart from '../StatisticalChart';
import StatisticalChartGuide from '../StatisticalChartGuide';

function IranChart() {
  const dispatch = useDispatch();
  const isLoaded = useSelector((store) => store.StatisticalChart.isLoaded);
  const data = useSelector((store) => store.StatisticalChart.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [isLoaded]);

  return (
    <>
      {!isLoaded || Object.keys(data).length < 1 ? (
        <div className="spinner"></div>
      ) : (
        <>
          <StatisticalChartGuide isLoaded={isLoaded} data={data} area="iran" />
          <StatisticalChart
            isLoaded={isLoaded}
            data={data}
            area="iran"
            type="notStacked"
          />
        </>
      )}
    </>
  );
}

export default IranChart;
