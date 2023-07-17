import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#A7EBFF',
      contrastText: 'white',
    },
    secondary: {
      main: '#008B7F',
      contrastText: 'white',
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          marginBottom: '20px',
          marginTop: '0px',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          padding: '10px',
          color: 'black',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: '40px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
      },
    },
  },
});
