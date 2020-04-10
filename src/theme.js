import { createMuiTheme } from '@material-ui/core';
import { MainColor } from './constants/Colors';

export default createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: MainColor,
    },
  },
});
