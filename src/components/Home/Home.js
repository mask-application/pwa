import React from 'react';
import './HomeStyle.scss';
import { Paper } from '@material-ui/core';
import { Assignment, Group, Info, Map, Person, Room } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useIntl } from '../../intl';

const buttons = [
  {
    icon: <Person style={{ color: '#00ffba' }} />,
    name: 'me',
    link: '/my-activities',
  },
  {
    icon: <Group style={{ color: '#00ffba' }} />,
    name: 'family',
    link: '/family-activities',
  },
  {
    icon: <Map style={{ color: '#f1e200' }} />,
    name: 'map',
    link: '/map',
  },
  {
    icon: <Assignment style={{ color: '#f1e200' }} />,
    name: 'informing',
    link: '/informing',
  },
  // {
  //     icon: <Room style={{color: "#ff006f"}}/>,
  //     name: "places",
  //     link: "/places",
  // },
  // {
  //     icon: <Info style={{color: "#ff006f"}}/>,
  //     name: "about-us",
  //     link: "/about-us",
  // },
];

export default function Home() {
  const intl = useIntl();
  return (
    <div className={`HomeWrapper`}>
      {/*Header*/}
      {buttons.map((b) => (
        <Paper
          key={b.name}
          className="link flex-column perfect-center home-icon"
          component={Link}
          to={b.link}
        >
          {b.icon}
          <b className="text-center">
            {intl.formatMessage(`pages-info.${b.name}.title`)}
          </b>
          {b.name !== 'about-us' && (
            <span className="text-center">
              {intl.formatMessage(`pages-info.${b.name}.description`)}
            </span>
          )}
        </Paper>
      ))}
    </div>
  );
}
