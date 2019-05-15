import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#FF9800' },
  secondary: { main: '#1976D2' },
  typography: {
    useNextVariants: true,
  },
};
const themeName = 'Capivareo theme';

export default createMuiTheme({ palette, themeName });