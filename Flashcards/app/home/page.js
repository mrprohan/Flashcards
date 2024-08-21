'use client'

import { UserButton, useUser } from "@clerk/nextjs";
import { Container, Typography, AppBar, Toolbar, Button, Box, Grid, ThemeProvider, createTheme } from '@mui/material';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { styled } from '@mui/system';
import '@fontsource/pacifico';
import '@fontsource/roboto';
import '@fontsource/montserrat';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  palette: {
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#ff6e40',
    },
  },
});

const GradientBackground = styled('div')({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  minHeight: '100vh',
  padding: theme.spacing(3),
});

const StyledAppBar = styled(AppBar)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
});

const LogoText = styled(Typography)({
  fontFamily: 'Pacifico, cursive',
  color: 'white',
  fontSize: '2rem',
});

const WelcomeText = styled(Typography)({
  fontFamily: 'Roboto, sans-serif',
  color: 'white',
  fontWeight: 700,
});

const StyledButton = styled(Button)({
  borderRadius: '25px',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px 4px rgba(255, 105, 135, .3)',
  },
});

const FeatureBox = styled(Box)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  padding: theme.spacing(3),
  color: 'white',
});

export default function HomePage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <GradientBackground>
        <Container maxWidth="lg">
          <StyledAppBar position="static">
            <Toolbar>
              <LogoText variant="h6" sx={{flexGrow: 1}}>
                DoughLingo
              </LogoText>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <Typography sx={{color: 'white'}}>{user?.firstName}</Typography>
                <UserButton afterSignOutUrl="/" />
              </Box>
            </Toolbar>
          </StyledAppBar>

          <Box sx={{textAlign:'center', my:6}}>
            <WelcomeText variant="h2" gutterBottom>
              Welcome to DoughLingo, {user?.firstName}!
            </WelcomeText>
            <Typography variant="h5" gutterBottom sx={{color: 'white', mb: 4}}>
              A fun way to learn a language
            </Typography>
            <StyledButton variant="contained" color="secondary">
              Get Started
            </StyledButton>
          </Box>

          <Box sx={{my: 6}}>
            <Typography variant="h4" gutterBottom sx={{color: 'white', textAlign: 'center', mb: 4}}>
              Features
            </Typography>
            <Grid container spacing={4}>
              {['Text-to-audio', 'Translation', 'Progress'].map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <FeatureBox>
                    <Typography variant="h6" gutterBottom>
                      {feature}
                    </Typography>
                    <Typography>
                      Our system uses advanced technology to enhance your learning experience.
                    </Typography>
                  </FeatureBox>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{my: 6, textAlign:'center'}}>
            <Typography variant="h4" gutterBottom sx={{color: 'white', mb: 4}}>
              Pricing
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                { title: 'Basic', price: 'Free', description: 'Access to beginner lessons' },
                { title: 'Pro', price: '₹15/month', description: 'Access to advanced features' }
              ].map((plan, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <FeatureBox>
                    <Typography variant="h5" gutterBottom>{plan.title}</Typography>
                    <Typography variant="h6" gutterBottom>{plan.price}</Typography>
                    <Typography sx={{mb: 2}}>{plan.description}</Typography>
                    <StyledButton variant="contained" color="primary">
                      I'll take this!
                    </StyledButton>
                  </FeatureBox>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </GradientBackground>
    </ThemeProvider>
  );
}