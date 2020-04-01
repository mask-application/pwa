import React from 'react';
import {
  FiberManualRecordOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@material-ui/icons';

import decrease from '../../assets/images/decrease.svg';
import increase from '../../assets/images/increase.svg';

function translateNum(n) {
  let num = JSON.parse(
    '{".":"/","0":"۰","1":"۱","2":"۲","3":"۳","4":"۴","5":"۵","6":"۶","7":"۷","8":"۸","9":"۹"}'
  );
  return n.replace(/./g, function (c) {
    return typeof num[c] === 'undefined' ? (/\d+/.test(c) ? c : '') : num[c];
  });
  return n;
}

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

function StatisticalChartGuideItem(props) {
  const { name, currentVal, incVal, incPercentage } = props.data;

  let PersianCurrVal = translateNum(String(currentVal));
  let persianIncVal = translateNum(String(incPercentage.toFixed(1)));

  return (
    <div className="statistics-text">
      <FiberManualRecordOutlined
        style={{ color: translateColor[name] }}
        size="small"
      />
      <strong>{translateKeys[name]}</strong>
      <span>{PersianCurrVal}&nbsp;نفر</span>
      <span>{persianIncVal}</span>
      {incPercentage > 0 ? (
        <img src={increase} style={{ height: '16px' }} />
      ) : (
        <img src={decrease} style={{ height: '16px' }} />
      )}
    </div>
  );
}

export default StatisticalChartGuideItem;
