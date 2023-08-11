import { teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#A7EBFF',
      light:'#cfe3fc',
      contrastText: 'white',
      },
    secondary: {
      main: '#008B7F',
      contrastText: 'white',
    },
    info: {
      main: '#018221',
      contrastText: 'white'
    }
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
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
          fontFamily: 'Roboto,sans-serif',
        },
        h9:
        {
          align: 'right',
          fontSize: '0.9rem',
          fontWeight: '550' ,
          margin: '20px',
          lineHeight: '0.8',
          '&:hover': {
            color: 'green'
          },
          
        }
        
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
