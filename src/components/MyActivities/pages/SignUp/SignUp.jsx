import React, { useState } from 'react';
import axios from 'axios';

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    TextField,
    Select,
    MenuItem,
    Button,
    Box,
    InputLabel,
    FormControl,
    Dialog,
    CircularProgress,
} from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

import styles from './SignUp.module.scss';

export default function SignUp({ onBackClick, onSMSSent }) {
    const [phone, setPhone] = useState('');
    const [condition, setCondition] = useState('');

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function onSubmit() {
        if (!(/09\d{9}/.test(phone))) {
            // TODO: Use proper notification
            alert('شماره همراه وارد شده صحیح نمی‌باشد.');
            return;
        }
        if (condition === '') {
            // TODO: Use proper notification
            alert('وضعیت شرایط خاص را مشخص کنید.');
            return;
        }
        sendActivationSMS();
    }

    function sendActivationSMS() {
        setIsDialogOpen(true);
        axios({
            method: 'POST',
            url: '/api/v1/user/register',
            data: {
                phone_number: phone,
                risk_group: condition,
            },
        })
            .then(({ data }) => {
                setIsDialogOpen(false);
                onSMSSent({
                    phone,
                    condition,
                    ttl: data.activate_ttl,
                });
            })
            .catch(err => {
                console.error(err);
                // TODO: Use proper notification
                alert('ارسال کد با خطا مواجه شد!');
                setIsDialogOpen(false);
            });
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onBackClick}
                    >
                        <ArrowForward />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        ثبت نام
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={styles.container}>
                <TextField
                    label="شماره همراه"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    fullWidth
                />
                <Box mt={2}>
                    <FormControl fullWidth>
                        <InputLabel id="condition-select-label">
                            شرایط خاص دارید؟
                        </InputLabel>
                        <Select
                            id="condition-select"
                            labelId="condition-select-label"
                            value={condition}
                            onChange={e => setCondition(e.target.value)}
                        >
                            <MenuItem value={0}>
                                بدون شرایط خاص
                            </MenuItem>
                            <MenuItem value={1}>
                                بیماران با نقص ایمنی: تحت درمان با کورتیکواستروئید،
                                شیمی درمانی، بدخیمی‌ها، پیوند اعضا، مبتلایان به HIV
                            </MenuItem>
                            <MenuItem value={2}>
                                بیماران با بیماری زمینه‌ای و سالمندان: بیماری قلبی
                                عروقی، فشار خون، بیماری‌های تنفسی زمینه‌ای، دیابت و
                                افراد بالای ۵۰ سال
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box mt={2}>
                    <Typography variant="subtitle2" align="center">
                        برای استفاده از قابلیت پیگیری وضعیت سلامتی لازم
                        است ابتدا در نرم‌افزار ثبت‌نام کنید.
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={onSubmit}
                    >
                        ارسال کد فعال‌سازی
                    </Button>
                </Box>
            </div>
            <Dialog open={isDialogOpen}>
                <div className={styles.dialogContent}>
                    <CircularProgress />
                    <Box ml={3}>
                        {'لطفا کمی صبر کنید.'}
                    </Box>
                </div>
            </Dialog>
        </>
    );
}
