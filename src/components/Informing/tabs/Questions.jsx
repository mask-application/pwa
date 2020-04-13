import React from 'react';

import styles from './Questions.module.scss';
import logo from '../../../logo.png';

export default function Questions() {
  return (
    <div className={`contentWrapper ${styles.wrapper}`}>
      <img src={logo} alt="logo" />
      <div>به زودی در ماسک</div>
    </div>
  );
}
