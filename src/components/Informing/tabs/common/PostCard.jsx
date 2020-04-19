import React from 'react';
import dayjs from 'dayjs';

import { Typography } from '@material-ui/core';

import styles from './PostCard.module.scss';

import { engToPerDigits } from '../../../../utils';

export default function PostCard({ post, large, onClick }) {
  return (
    <div
      className={`${styles.container} ${large ? styles.large : ''}`}
      onClick={onClick}
    >
      <div
        style={{ backgroundImage: `url("${post.image}")` }}
        className={styles.thumbnail}
      />
      <div className={styles.titleContainer}>
        <Typography>{post.title}</Typography>
        <Typography variant="caption">
          {engToPerDigits(
            dayjs(post.create_time)
              .locale('fa')
              .calendar('jalali')
              .format('DD MMMM YYYY')
          )}
        </Typography>
      </div>
    </div>
  );
}
