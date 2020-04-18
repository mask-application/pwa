import React, { useState } from 'react';

import { Tabs, Tab } from '@material-ui/core';

import Trainings from './tabs/Trainings';
import News from './tabs/News';
import Questions from './tabs/Questions';

import styles from './Informing.module.scss';

export default function Informing() {
  const [tab, setTab] = useState('training');

  return (
    <div className="contentWrapper">
      <div className={styles.content}>
        <Tabs
          value={tab}
          onChange={(e, newTab) => setTab(newTab)}
          variant="fullWidth"
        >
          <Tab value="training" label="آموزش" />
          <Tab value="news" label="اخبار" />
          <Tab value="questions" label="سوالات" />
        </Tabs>
        {tab === 'training' && <Trainings />}
        {tab === 'news' && <News />}
        {tab === 'questions' && <Questions />}
      </div>
    </div>
  );
}
