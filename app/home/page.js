'use client'

import { UserButton, useUser } from "@clerk/nextjs";
import { Container, Typography, Toolbar, Box, Grid, ThemeProvider, createTheme, DialogActions, DialogContent } from '@mui/material';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db, signInWithClerk } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import '@fontsource/pacifico';
import '@fontsource/roboto';
import '@fontsource/montserrat';
import {
  GradientBackground, StyledAppBar, LogoText, WelcomeText, StyledButton,
  FeatureBox, StyledDialog, StyledDialogTitle, StyledTextField
} from '../styles/HomePageStyles';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  palette: {
    primary: {
      main: '#46211A', // Chestnut brown
    },
    secondary: {
      main: '#A43820', // Burnt sienna
    },
  },
});

export default function HomePage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    subscriptionStatus: 'none'
  });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    } else if (isSignedIn && user) {
      signInWithClerk(user).then(() => {
        fetchUserDetails();
      });
    }
  }, [isSignedIn, isLoaded, router, user]);

  const fetchUserDetails = async () => {
    try {
      const userRef = doc(db, 'users', user.id);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        setUserDetails(userSnap.data());
      } else {
        setUserDetails(prevState => ({
          ...prevState,
          email: user.emailAddresses[0].emailAddress
        }));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name !== 'email') {
      setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }
  };

  const handleUserRegistration = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', user.id), {
        ...userDetails,
        clerkId: user.id,
        subscriptionStatus: selectedPlan
      });
      setOpenDialog(false);
      setUserDetails(prevDetails => ({...prevDetails, subscriptionStatus: selectedPlan}));
      
      if (selectedPlan === 'pro') {
        handleProPayment();
      }
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: 'pro',
          userId: user.id,
        }),
      });

      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelection = (planType) => {
    setSelectedPlan(planType);
    if (userDetails.subscriptionStatus === 'none') {
      setOpenDialog(true);
    } else if (planType === 'pro') {
      handleProPayment();
    }
  };

  const isCurrentPlan = (planType) => userDetails.subscriptionStatus === planType;

  const isPlanAvailable = (planType) => {
    if (planType === 'basic') return userDetails.subscriptionStatus === 'none';
    if (planType === 'pro') return userDetails.subscriptionStatus !== 'pro';
    return false;
  };

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
                <Typography sx={{color: '#46211A'}}>{userDetails.name}</Typography>
                <UserButton afterSignOutUrl="/" />
              </Box>
            </Toolbar>
          </StyledAppBar>

          <Box sx={{textAlign:'center', my:6}}>
            <WelcomeText variant="h2" gutterBottom>
              Welcome to DoughLingo, {userDetails.name}!
            </WelcomeText>
            <Typography variant="h5" gutterBottom sx={{color: '#A43820', mb: 4}}>
              A fun way to learn a language
            </Typography>
            <StyledButton variant="contained" color="secondary">
              Get Started
            </StyledButton>
          </Box>

          <Box sx={{my: 6}}>
            <Typography variant="h4" gutterBottom sx={{color: '#46211A', textAlign: 'center', mb: 4}}>
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
            <Typography variant="h4" gutterBottom sx={{color: '#46211A', mb: 4}}>
              Pricing
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                { title: 'Basic', price: 'Free', description: 'Access to beginner lessons' },
                { title: 'Pro', price: '$0.18/month', description: 'Access to advanced features' }
              ].map((plan, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <FeatureBox>
                    <Typography variant="h5" gutterBottom>{plan.title}</Typography>
                    <Typography variant="h6" gutterBottom>{plan.price}</Typography>
                    <Typography sx={{mb: 2}}>{plan.description}</Typography>
                    <StyledButton 
                      variant="contained" 
                      color="primary"
                      onClick={() => handlePlanSelection(plan.title.toLowerCase())}
                      disabled={loading || isCurrentPlan(plan.title.toLowerCase()) || !isPlanAvailable(plan.title.toLowerCase())}
                    >
                      {loading ? 'Processing...' : 
                       isCurrentPlan(plan.title.toLowerCase()) ? 'Current Plan' : 
                       isPlanAvailable(plan.title.toLowerCase()) ? "I'll take this!":
                       'Not Available'}
                    </StyledButton>
                  </FeatureBox>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        <AnimatePresence>
          {openDialog && (
            <StyledDialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              aria-labelledby="registration-dialog-title"
              PaperComponent={motion.div}
              PaperProps={{
                initial: { y: -50, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                exit: { y: -50, opacity: 0 },
                transition: { duration: 0.3 }
              }}
            >
              <StyledDialogTitle id="registration-dialog-title">
                Join DoughLingo - {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
              </StyledDialogTitle>
              <DialogContent>
                <Typography variant="body1" gutterBottom sx={{ color: '#46211A' }}>
                  You are signing up for our {selectedPlan === 'basic' ? 'Free Basic' : 'Pro'} Plan. Complete your registration to get started!
                </Typography>
                {['name', 'email', 'phone'].map((field, index) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * (index + 1), duration: 0.3 }}
                  >
                    <StyledTextField
                      autoFocus={index === 0}
                      margin="dense"
                      name={field}
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      fullWidth
                      variant="standard"
                      value={userDetails[field]}
                      onChange={handleInputChange}
                      InputProps={{
                        readOnly: field === 'email',
                      }}
                    />
                  </motion.div>
                ))}
              </DialogContent>
              <DialogActions>
                <StyledButton onClick={() => setOpenDialog(false)} color="secondary">
                  Cancel
                </StyledButton>
                <StyledButton 
                  onClick={handleUserRegistration} 
                  disabled={loading}
                  color="primary"
                  variant="contained"
                >
                  {loading ? 'Registering...' : 'Join Now'}
                </StyledButton>
              </DialogActions>
            </StyledDialog>
          )}
        </AnimatePresence>
      </GradientBackground>
    </ThemeProvider>
  );
}