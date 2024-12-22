import { createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      light: blueGrey[50],
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
  },
});
