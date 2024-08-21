'use client'

import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import '@fontsource/pacifico';
import '@fontsource/roboto';

export default function LandingPage() {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/home');
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Box 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          padding: '20px',
        }}
      >
        <motion.h1
          style={{
            fontFamily: 'Pacifico, cursive',
            fontSize: '4rem',
            color: 'white',
            marginBottom: '20px',
          }}
        >
          {['D', 'o', 'u', 'g', 'h', 'l', 'i', 'n', 'g', 'o'].map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1.5rem',
            color: 'white',
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          Learn new languages through AI-powered flashcards
        </motion.p>

        <Box sx={{ display: 'flex', gap: '20px' }}>
          {isSignedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/home')}
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                fontFamily: 'Roboto, sans-serif',
                backgroundColor: 'white',
                color: '#FE6B8B',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              Go to Home
            </motion.button>
          ) : (
            <>
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    fontFamily: 'Roboto, sans-serif',
                    backgroundColor: 'white',
                    color: '#FE6B8B',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Sign In
                </motion.button>
              </SignInButton>
              <SignUpButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    fontFamily: 'Roboto, sans-serif',
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Sign Up
                </motion.button>
              </SignUpButton>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}