import React from 'react';
import StatisticalChartGuideItem from './StatisticalChartGuideItem';

function StatisticalChartGuide(props) {
  const data = props.data[props.area];
  const keys = Object.keys(data);
  const keysDataLen = data[keys[0]].length;
  let guideRow = [];

  function constructProperData() {
    let properData = [];
    for (let i = 0; i < keys.length; i++) {
      const currentVal = data[keys[i]][keysDataLen - 1];
      const incVal =
        data[keys[i]][keysDataLen - 1] - data[keys[i]][keysDataLen - 2];
      const incPercentage = (incVal / currentVal) * 100;
      properData.push({
        name: keys[i],
        currentVal: currentVal,
        incVal: incVal,
        incPercentage: incPercentage,
      });
    }
    return properData;
  }

  function createGuide() {
    let data = constructProperData();
    for (let i = 0; i < keys.length; i++)
      guideRow.push(<StatisticalChartGuideItem key={i} data={data[i]} />);
  }

  if (props.isLoaded) {
    createGuide();
  }

  return (
    <>
      <div>{guideRow}</div>
      {/*<div className="last-update-text">*/}
      {/*  تاریخ آخرین به‌روز‌رسانی:*/}
      {/*  &nbsp;*/}
      {/*  {new Date(props.data.last_update).toLocaleDateString('fa-IR')}*/}
      {/*</div>*/}
    </>
  );
}

export default StatisticalChartGuide;
