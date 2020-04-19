import React from 'react';
import dayjs from 'dayjs';

import {
  Dialog,
  Slide,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
} from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';

import styles from './PostDetails.module.scss';

import { engToPerDigits } from '../../../../utils';

const SlideTransition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function PostDetails({ post, onClose }) {
  return (
    <Dialog
      open={Boolean(post)}
      onClose={onClose}
      fullScreen
      TransitionComponent={SlideTransition}
    >
      <AppBar position="static">
        <Toolbar>
          ادامه مطلب
          <IconButton color="inherit" onClick={onClose}>
            <KeyboardBackspace />
          </IconButton>
        </Toolbar>
      </AppBar>
      {post && (
        <div className={styles.container}>
          <div className={styles.imageTitleContainer}>
            <div
              style={{ backgroundImage: `url("${post.image}")` }}
              className={styles.thumbnail}
            />
            <div className={styles.title}>{post.title}</div>
            <div className={styles.dateSourceContainer}>
              <Typography variant="caption">
                {engToPerDigits(
                  dayjs(post.create_time)
                    .locale('fa')
                    .calendar('jalali')
                    .format('DD MMMM YYYY')
                )}
              </Typography>
              <a
                className={styles.source}
                href={post.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                {'منبع'}
              </a>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      )}
    </Dialog>
  );
}
