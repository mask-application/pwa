import React from 'react';
import MyHealthEvent from '../components/MyActivities/pages/events/rgisterHealthInfo/MyHealthEvent';
import { useHistory } from 'react-router-dom';

function MyHealthEventPage() {
  let history = useHistory();
  return <MyHealthEvent />;
}

export default MyHealthEventPage;
