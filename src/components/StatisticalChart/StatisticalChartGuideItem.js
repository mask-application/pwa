import React from 'react';
import { FiberManualRecordOutlined } from '@material-ui/icons';

import decrease from '../../assets/images/decrease.svg';
import increase from '../../assets/images/increase.svg';
import { engToPerDigits } from '../../utils/persianize';

const translateKeys = {
  patients: 'تعداد افراد مبتلا شده:',
  dead: 'تعداد افراد فوت شده:',
  recovered: 'تعداد افراد درمان شده:',
};

const translateColor = {
  patients: 'rgb(235,59,93)',
  dead: 'rgba(0,0,0,0.5)',
  recovered: 'rgb(0,255,186)',
};

const translateFontSize = {
  patients: 14,
  dead: 12,
  recovered: 10,
};

function StatisticalChartGuideItem(props) {
  const { name, currentVal, incVal, incPercentage } = props.data;

  let PersianCurrVal = engToPerDigits(String(currentVal));
  let persianIncVal = engToPerDigits(String(incVal));
  // let persianIncVal = engToPerDigits(String(incPercentage.toFixed(1)));

  return (
    <div
      className="statistics-text"
      style={{ color: translateColor[name], fontSize: translateFontSize[name] }}
    >
      {/*<FiberManualRecordOutlined*/}
      {/*  style={{ color: translateColor[name] }}*/}
      {/*  size="small"*/}
      {/*/>*/}
      <strong>{translateKeys[name]}</strong>
      &nbsp;
      <span>{PersianCurrVal}&nbsp;نفر</span>
      &nbsp;
      <span>({persianIncVal}+)</span>
      {/*<span>{persianIncVal}٪</span>*/}
      {/*{incPercentage > 0 ? (*/}
      {/*  <img src={increase} style={{ height: '16px' }} />*/}
      {/*) : (*/}
      {/*  <img src={decrease} style={{ height: '16px' }} />*/}
      {/*)}*/}
    </div>
  );
}

export default StatisticalChartGuideItem;
