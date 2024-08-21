import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DoughLingo',
  description: 'Learn languages with AI-powered flashcards',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}