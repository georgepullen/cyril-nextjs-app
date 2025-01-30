import { AuthProvider } from "./contexts/AuthContext";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import { Plus_Jakarta_Sans } from 'next/font/google'
import { ThemeProvider } from './contexts/ThemeContext'
import { Toaster } from 'react-hot-toast';
import LoadingScreen from './components/LoadingScreen';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

export const metadata: Metadata = {
  title: "Cyril - AI-Powered Knowledge Management",
  description: "Transform your note-taking with advanced AI insights and intelligent organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakarta.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Cyril" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <LoadingScreen>
              {children}
              <Toaster 
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: '#1A1A2E',
                    color: '#fff',
                    border: '1px solid rgba(179, 92, 255, 0.1)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#b35cff',
                      secondary: '#1A1A2E',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ff4a4a',
                      secondary: '#1A1A2E',
                    },
                  },
                }}
              />
            </LoadingScreen>
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
