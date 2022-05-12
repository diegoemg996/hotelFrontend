import React from 'react';
import '../styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes/light-theme';
import { AuthProvider, ReservationProvider, UIProvider } from '../context';
import { SWRConfig } from 'swr';


function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <AuthProvider>
        <ReservationProvider>
          <UIProvider>
            <ThemeProvider theme={ lightTheme}>
              <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
        </ReservationProvider>
      </AuthProvider>
    </SWRConfig>


  )
}

export default MyApp
