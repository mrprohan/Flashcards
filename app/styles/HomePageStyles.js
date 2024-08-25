// styles/HomePageStyles.js

import { styled } from '@mui/system';
import { Typography, AppBar, Button, Box, TextField, Dialog, DialogTitle } from '@mui/material';

export const GradientBackground = styled('div')({
  background: '#F1D3B2', // Soft cream
  minHeight: '100vh',
  padding: '24px', // Use a static value instead of theme.spacing
});

export const StyledAppBar = styled(AppBar)({
  background: 'rgba(70, 33, 26, 0.1)', // Chestnut brown with opacity
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
});

export const LogoText = styled(Typography)({
  fontFamily: 'Pacifico, cursive',
  color: '#46211A', // Chestnut brown
  fontSize: '2rem',
});

export const WelcomeText = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  color: '#46211A', // Chestnut brown
  fontWeight: 700,
});

export const StyledButton = styled(Button)({
  borderRadius: '25px',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  boxShadow: '0 3px 5px 2px rgba(164, 56, 32, .3)', // Burnt sienna with opacity
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px 4px rgba(164, 56, 32, .3)', // Burnt sienna with opacity
  },
});

export const FeatureBox = styled(Box)({
  background: 'rgba(70, 33, 26, 0.1)', // Chestnut brown with opacity
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  padding: '24px', // Use a static value instead of theme.spacing
  color: '#46211A', // Chestnut brown
});

export const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    padding: '16px', // Use a static value instead of theme.spacing
    background: '#F1D3B2', // Soft cream
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  fontFamily: 'Pacifico, cursive',
  color: '#46211A', // Chestnut brown
  textAlign: 'center',
  fontSize: '2rem',
}));

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    color: '#46211A', // Chestnut brown
  },
  '& label': {
    color: 'rgba(70, 33, 26, 0.7)', // Chestnut brown with opacity
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'rgba(70, 33, 26, 0.7)', // Chestnut brown with opacity
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: '#46211A', // Chestnut brown
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#46211A', // Chestnut brown
  },
}));