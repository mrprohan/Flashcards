'use client'

import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import Image from 'next/image';
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

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.5,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      textShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        duration: 0.3
      }
    }
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
          background: '#F1D3B2', // Soft cream background
          padding: '20px',
        }}
      >
        <Box sx={{ position: 'relative', marginBottom: '40px' }}>
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            style={{
              position: 'absolute',
              top: '55px',
              left: '13.5%',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          >
            <Image
              src="/Dough_lingo_nb.png"
              alt="DoughLingo Logo"
              width={120}
              height={120}
            />
          </motion.div>
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            style={{
              fontFamily: 'Pacifico, cursive',
              fontSize: '4rem',
              color: '#46211A', // Chestnut brown for the title
              margin: 0,
              textAlign: 'center',
              position: 'relative',
              zIndex: 2
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
            </motion.span>
            <br />
            {['D','o', 'u', 'g', 'h', 'l', 'i', 'n', 'g', 'o'].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </Box>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1.5rem',
            color: '#A43820', // Burnt sienna for the subtitle
            textAlign: 'center',
            marginBottom: '40px',
            marginTop: '10px',
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
                backgroundColor: '#46211A', // Chestnut brown for button background
                color: '#F1D3B2', // Soft cream for button text
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
                    backgroundColor: '#46211A', // Chestnut brown for button background
                    color: '#F1D3B2', // Soft cream for button text
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
                    color: '#A43820', // Burnt sienna for button text
                    border: '2px solid #A43820', // Burnt sienna for button border
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