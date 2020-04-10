import React from 'react';
import './HeaderStyle.scss';
import logo from '../../logo.png';

export default function Header(props) {
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
    </div>
  );
}
