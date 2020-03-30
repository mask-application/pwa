import React from 'react';
import MyActivityEvents from '../components/MyActivities/pages/events/MyActivityEvents';
import { useHistory } from 'react-router-dom';

function MyActivityEventsPage() {
  let history = useHistory();
  return <MyActivityEvents />;
}

export default MyActivityEventsPage;
