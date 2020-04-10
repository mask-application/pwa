import React from 'react';

import { Box, Typography, CircularProgress } from '@material-ui/core';

import styles from './LoadingBox.module.scss';

export default function LoadingBox() {
  return (
    <Box m={3} className={styles.container}>
      <Typography>{'در حال بارگزاری'}</Typography>
      <Box ml={2}>
        <CircularProgress size={24} />
      </Box>
    </Box>
  );
}
