import React from "react";
import { useIntl } from "../../intl";

function translateNum(n) {
  //  FIXME Use css to show numbers in persian
  let num = JSON.parse('{"0":"۰","1":"۱","2":"۲","3":"۳","4":"۴","5":"۵","6":"۶","7":"۷","8":"۸","9":"۹"}');
  return n.replace(/./g,function(c){
    return (typeof num[c]==="undefined")?
      ((/\d+/.test(c))?c:''):
      num[c];
  })
  return n;
}

function StatisticalChartGuide(props) {

  const intl = useIntl();
  const { isLoaded, patients, recovered, dead } = props.data;
  const dataLen = patients.length;
  const patientsNum = translateNum(String(patients[dataLen-1]));
  const patientsInc = translateNum(String(patients[dataLen-1]-patients[dataLen-2]));
  const recoveredNum = translateNum(String(recovered[dataLen-1]));
  const recoveredInc = translateNum(String(recovered[dataLen-1]-recovered[dataLen-2]));
  const deadNum = translateNum(String(dead[dataLen-1]));
  const deadInc = translateNum(String(dead[dataLen-1]-dead[dataLen-2]));

  // TODO: fix title in fa.json

  return (
    <div className="statistics-text">
      <h3>
        {intl.formatMessage(`statistical-chart.title`, {title: `${patientsNum} نفر مبتلا (${patientsInc}+)`})}
      </h3>
      <h4>
        {intl.formatMessage(`statistical-chart.title`, {title: `${recoveredNum} نفر مبتلا (${recoveredInc}+)`})}
      </h4>
      <h5>
        {intl.formatMessage(`statistical-chart.title`, {title: `${deadNum} نفر مبتلا (${deadInc}+)`})}
      </h5>
    </div>
  );
}

export default StatisticalChartGuide;
