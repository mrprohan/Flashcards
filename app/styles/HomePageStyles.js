// styles/HomePageStyles.js

import { styled } from '@mui/system';
import { Typography, AppBar, Button, Box, TextField, Dialog, DialogTitle } from '@mui/material';
import { motion } from 'framer-motion';

export const GradientBackground = styled('div')({
  background: 'linear-gradient(135deg, #F1D3B2 0%, #F9E1C5 100%)', // Enhanced gradient
  minHeight: '100vh',
  padding: '24px',
  overflowX: 'hidden', // Prevent horizontal scrolling
});

export const StyledAppBar = styled(AppBar)({
  background: 'rgba(70, 33, 26, 0.1)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
});

export const LogoText = styled(Typography)({
  fontFamily: 'Pacifico, cursive',
  color: '#46211A',
  fontSize: '2.5rem',
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
});

export const WelcomeText = styled(Typography)({
  fontFamily: 'Dancing Script, cursive',
  color: '#46211A',
  fontWeight: 700,
  fontSize: '4.5rem',
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  marginBottom: '24px',
});

export const StyledButton = styled(Button)({
  borderRadius: '25px',
  padding: '12px 24px',
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 600,
  boxShadow: '0 4px 6px rgba(164, 56, 32, .3)',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(164, 56, 32, .3)',
  },
});

export const FeatureBox = styled(motion.div)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: '30px',
  color: '#46211A',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.45)',
  },
});

export const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    padding: '24px',
    background: 'rgba(241, 211, 178, 0.9)', // Soft cream with transparency
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  fontFamily: 'Pacifico, cursive',
  color: '#46211A',
  textAlign: 'center',
  fontSize: '2.2rem',
  marginBottom: '16px',
}));

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    color: '#46211A',
  },
  '& label': {
    color: 'rgba(70, 33, 26, 0.7)',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'rgba(70, 33, 26, 0.7)',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: '#46211A',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#46211A',
  },
}));

export const SectionDivider = styled('div')({
  width: '100%',
  height: '2px',
  background: 'linear-gradient(90deg, transparent, rgba(70, 33, 26, 0.5), transparent)',
  margin: '60px 0',
});

export const AnimatedSection = styled(motion.div)({
  marginBottom: '60px',
});

export const PricingCard = styled(motion.div)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: '30px',
  color: '#46211A',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px) rotateY(5deg)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.45)',
  },
});

export const ScrollPrompt = styled(motion.div)({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#46211A',
  fontSize: '2rem',
  cursor: 'pointer',
});

export const FeatureIcon = styled('div')({
  fontSize: '3rem',
  marginBottom: '16px',
  color: '#A43820',
});

export const PlanPrice = styled(Typography)({
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#A43820',
  marginBottom: '16px',
});

export const PlanDescription = styled(Typography)({
  fontSize: '1.1rem',
  marginBottom: '24px',
});

// New styles for the updated hero section
export const LogoContainer= styled('div')({
    marginBottom: '5px',
    '& img': {
        maxWidth: '100%',
        height: '400%',
        width: 'auto',
},
});

export const HeroSection = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '120px 0 60px',
});

export const HeroContent = styled('div')({
  textAlign: 'center',
  maxWidth: '800px',
  margin: '0 auto',
});

export const HeroDescription = styled(Typography)({
  fontSize: '1.5rem',
  color: '#46211A',
  marginBottom: '40px',
  lineHeight: 1.6,
});

export const ButtonGroup = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
});