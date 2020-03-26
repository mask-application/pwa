import React, { Fragment } from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../AppHeader/Header';
import Qrcode from 'qrcode.react';
import styles from './QrCode.module.scss';
import { Box, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

export default function ShowQrCode () {

    const history = useHistory();

    const backClick = () => {
        history.push('/my-activities');
    }

    return (
        <Fragment>
            <Header title="کد اختصاصی من" backBtn onClickBackBtn={backClick}/>
            <Box className={styles.qrCode}>
                <Qrcode value="test" />
            </Box>
            <Box className={styles.warning}>
                <Typography>
                    <FormattedMessage id="pages-info.qr-code.description"/>
                </Typography>
                <Typography component="span" variant="caption">
                    <FormattedMessage id="pages-info.qr-code.warning"/>
                </Typography>
            </Box>
        </Fragment>
    )
};