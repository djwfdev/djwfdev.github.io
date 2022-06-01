import { createTheme } from '@mui/material/styles';
import "@fontsource/sora"

export const Theme = createTheme ({
    palette: {
      type: 'light',
      primary: {
        main: '#1f351c',
      },
      secondary: {
        main: '#80b979',
      },
    },
    typography: {
      fontFamily: 'Sora',
      fontSize: 14,
      button: {
        fontSize: 16,
      },
    },
  }
); 
