import React from 'react';

import { Button } from '@material-ui/core';
import { LockOpen } from '@material-ui/icons';

import styles from './NotSignedUp.module.scss';

export default function NotSignedUp({ onSignUpClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <LockOpen color="primary" className={styles.icon} />
        <div>
          برای استفاده از قابلیت پیگیری وضعیت سلامتی لازم است ابتدا در نرم‌افزار
          ثبت‌نام کنید.
        </div>
      </div>
      <div className={styles.spacer} />
      <div className={styles.registerButtonContainer}>
        <Button
          className={styles.registerButton}
          variant="contained"
          color="primary"
          size="large"
          onClick={onSignUpClick}
        >
          ثبت نام
        </Button>
      </div>
    </div>
  );
}
