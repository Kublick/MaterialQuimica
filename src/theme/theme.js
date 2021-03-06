import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
      contrastText: '#fff',
    },
  },
  shape: {
    borderRadius: 8,
  },
  overrides: {
    MuiDrawer: {
      paper: {
        minWidth: 256,
        background: '#051E34',
      },
      paperAnchorDockedLeft: {
        borderRight: 'none',
      },
    },
  },
});

export default theme;

// background: '#18202c',
