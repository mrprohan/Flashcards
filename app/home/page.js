'use client'

import { UserButton, useUser } from "@clerk/nextjs";
import { Container, Typography, Toolbar, Box, Grid, ThemeProvider, createTheme, DialogActions, DialogContent } from '@mui/material';
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { db, signInWithClerk } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import '@fontsource/pacifico';
import '@fontsource/roboto';
import '@fontsource/montserrat';
import '@fontsource/dancing-script';
import {
  GradientBackground, StyledAppBar, LogoText, WelcomeText, StyledButton,
  FeatureBox, StyledDialog, StyledDialogTitle, StyledTextField, SectionDivider,
  HeroSection, HeroContent, HeroDescription, ButtonGroup,
  LogoContainer
} from '../styles/HomePageStyles';
import Image from 'next/image';

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

  const pricingRef = useRef(null);
  const featuresRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

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
    if (planType === 'basic') {
      // Use router.push for client-side navigation
      router.push('/generate');
    } else if (planType === 'pro') {
      if (userDetails.subscriptionStatus !== 'pro') {
        setOpenDialog(true);
      } else {
        alert("you're already on pro plan,Enjoy all the features!");
      }
    }
  };

  const isCurrentPlan = (planType) => userDetails.subscriptionStatus === planType;

  // const isPlanAvailable = (planType) => {
  //   if (planType === 'basic') return true;
  //   if (planType === 'pro') return userDetails.subscriptionStatus !== 'pro';
  //   return false;
  // };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <GradientBackground>
        <Container maxWidth="lg">
          <StyledAppBar position="fixed">
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

          <HeroSection>
            <HeroContent>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <LogoContainer>
                  <Image
                    src="/Dough_lingo_nb.png"
                    alt="DoughLingo Logo"
                    width={150}
                    height={150}
                  />
                </LogoContainer>
                <WelcomeText variant="h1" gutterBottom>
                  Welcome to DoughLingo!
                </WelcomeText>
                <HeroDescription variant="h5" gutterBottom>
                  Knead your way through language learning with our unique bread-themed lessons. 
                  Rise to the challenge and become fluent, one slice at a time!
                </HeroDescription>
                <ButtonGroup>
                  <StyledButton variant="contained" color="secondary" onClick={scrollToPricing}>
                    Get Started
                  </StyledButton>
                  <StyledButton variant="outlined" color="primary" onClick={scrollToFeatures}>
                    Learn More
                  </StyledButton>
                </ButtonGroup>
              </motion.div>
            </HeroContent>
          </HeroSection>

          <SectionDivider />

          <Box sx={{my: 12}} ref={featuresRef}>
            <motion.div style={{ opacity, scale }}>
              <Typography variant="h4" gutterBottom sx={{color: '#46211A', textAlign: 'center', mb: 6,}}>
                Features
              </Typography>
              <Grid container spacing={4}>
                {['Text-to-audio', 'Translation', 'Progress'].map((feature, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <motion.div
                      whileHover={{ scale: 1.05, rotateY: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FeatureBox>
                        <Typography variant="h6" gutterBottom>
                          {feature}
                        </Typography>
                        <Typography>
                          Our system uses advanced technology to enhance your learning experience.
                        </Typography>
                      </FeatureBox>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Box>

          <SectionDivider />

          <Box sx={{my: 12}} ref={pricingRef}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Typography variant="h4" gutterBottom sx={{color: '#46211A', textAlign: 'center', mb: 6}}>
                Pricing
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {[
                  { title: 'Basic', price: 'Free', description: 'Access to beginner lessons' },
                  { title: 'Pro', price: '$0.18/month', description: 'Access to advanced features' }
                ].map((plan, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <motion.div
                      whileHover={{ scale: 1.05, rotateY: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FeatureBox>
                        <Typography variant="h5" gutterBottom>{plan.title}</Typography>
                        <Typography variant="h6" gutterBottom>{plan.price}</Typography>
                        <Typography sx={{mb: 2}}>{plan.description}</Typography>
                        <StyledButton 
                          variant="contained" 
                          color="primary"
                          onClick={() => handlePlanSelection(plan.title.toLowerCase())}
                          disabled={loading ||(plan.title.toLowerCase()==='pro' && isCurrentPlan('pro'))}
                        >
                          {loading ? 'Processing...' : 
                           plan.title.toLowerCase() === 'basic' ? 
                           (isCurrentPlan('pro')? "Access Basic Features" : "Start Learning") :
                           isCurrentPlan('pro') ? 'Current Plan' :
                           "Upgrade to Pro"}
                           
                        </StyledButton>
                      </FeatureBox>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
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
                Join DoughLingo - Pro Plan
              </StyledDialogTitle>
              <DialogContent>
                <Typography variant="body1" gutterBottom sx={{ color: '#46211A' }}>
                  You are signing up for our Pro Plan. Complete your registration to get started!
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