import React from 'react';
import './InformingStyle.scss';
// import BuildIcon from '@material-ui/icons/Build';
// import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import logo from '../../logo.png';

export default function Informing() {
  return (
    <div className={`contentWrapper InformingWrapper`}>
      {/*<div>*/}
      {/*    در حال ساخت ...*/}
      {/*</div>*/}
      {/*<br/>*/}
      {/*<div>*/}
      {/*    <SentimentSatisfiedAltIcon />*/}
      {/*    <BuildIcon />*/}
      {/*</div>*/}
      <img src={logo} alt="" />
      <div>به زودی در ماسک</div>
    </div>
  );
}
