import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAsync } from 'react-use';
import axios from 'axios';
import { hideNewVersionDialog } from '../../redux/actions/CommonActions';

export default function NewVersionDialog(props) {
  const showNewVersionDialog = useSelector(
    (state) => state.Commons.showNewVersionDialog
  );
  const { value } = useAsync(fetchNewVersionDate);
  const dispatch = useDispatch();

  if (!value) {
    return null;
  }

  function onSubmit() {
    dispatch(hideNewVersionDialog());
    window.location.reload();
  }

  return (
    <Dialog
      open={showNewVersionDialog}
      disableEscapeKeyDown
      disableBackdropClick
    >
      <DialogTitle>{value.title}</DialogTitle>
      <DialogContent>{value.description}</DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>رفتن به نسخه‌ی جدید</Button>
      </DialogActions>
    </Dialog>
  );
}

function fetchNewVersionDate() {
  return axios
    .get(`${process.env.REACT_APP_GET_VERSION_INFO}`)
    .then(({ data }) => data);
}
