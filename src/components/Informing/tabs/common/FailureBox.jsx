import React from 'react';

import { Box, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function FailureBox() {
  return (
    <Box m={3}>
      <Alert severity="error">
        <Typography>{'دریافت اطلاعات با خطا مواجه شد'}</Typography>
      </Alert>
    </Box>
  );
}
