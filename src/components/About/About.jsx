import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './About.scss';

export const ABOUT_URL = 'http://185.97.116.63:3000/data/about.html';

export default function About() {
  const [html_response, set_html_response] = useState('');

  useEffect(() => {
    axios({
      url: ABOUT_URL,
    }).then((response) => {
      set_html_response(response.data);
    });
  });

  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: html_response }}
    />
  );
}
