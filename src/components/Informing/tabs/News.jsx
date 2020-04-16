import React from 'react';

import styles from './News.module.scss';
import logo from '../../../logo.png';

export default function News() {
  return (
    <div className={`contentWrapper ${styles.wrapper}`}>
      <img src={logo} alt="logo" />
      <div>به زودی در ماسک</div>
    </div>
  );
}
