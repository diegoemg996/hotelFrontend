import { Box, CssBaseline, Toolbar } from '@mui/material';
import Head from 'next/head';
import { NavbarAdmin } from '../ui/admin/NavbarAdmin';
import SideMenuAdmin from '../ui/admin/SideMenuAdmin';


export const AdminLayout = ({ children, title, pageDescription }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>S
            <meta name="description" content={ pageDescription } />
            
            
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />
{/* 
            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            } */}

        </Head> 

    <Box sx={{ display: 'flex', justifyContent:"center", alignItems:"center"  }}>
      <CssBaseline />
      <NavbarAdmin />
      <SideMenuAdmin/>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default' }}
      >
        <Toolbar />
        <Toolbar />
        { children }
      </Box>
    </Box>

        {/* Footer */}
        <footer>
            {/* TODO: mi custom footer */}
        </footer>

    </>
  )
}


