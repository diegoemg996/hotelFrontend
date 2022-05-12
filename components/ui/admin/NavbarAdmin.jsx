import { LogoutOutlined } from '@mui/icons-material'
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material'
import Image from 'next/image';


export const NavbarAdmin = () => {

/*   const {handleLogout} = useContext(LoginContext);

  const navigate = useNavigate()

  const handleStateLogout = ()=>{
    handleLogout()
    navigate('/')
  }
 */

    const drawerWidth = 240;

  return (
    <AppBar
        elevation={0}
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#e8e8e8' }}
      >
        <Toolbar>
            <Box display="flex">
            <Link display='flex' alignItems='center'>
                <Image
                    src='/logo.png'
                    width={150}
                    height={150}
                    alt='logo'
                    sx={{
                        marginRight: 10
                    }}
                    />
                   {/*  <Typography variant='h6'>Hotel |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Posada Real</Typography> */}
                </Link>  
            </Box>

            <Button  sx={{ ml: 'auto' }}>
                <LogoutOutlined/>
                Logout
            </Button>
        </Toolbar>
      </AppBar>
  )
}
