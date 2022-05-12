import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { CardTravel, Menu, SearchOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext, UiContext } from '../../context'; 
import Image from 'next/image';

export const Navbar = () => {

    const {asPath, push} = useRouter()

    const { toggleSideMenu} = useContext(UiContext)

    const {user, isLoggedIn} = useContext(AuthContext)


/*     const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)


    const onSearchTerm = ()=>{
        if(searchTerm.trim().length === 0) return;

        push(`/search/${searchTerm}`)
    }

 */

  return (
    <AppBar>     
        <Toolbar sx={{marginX: 4}}>
            <NextLink href='/' passHref>
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
            </NextLink>

            <Box flex={ 1 } />

            <Box /* sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} */>
                <NextLink href='/rooms/Sencilla' passHref>
                    <Link>
                        <Button color={asPath === '/habitaciones' ? 'primary' : 'info'} >Sencilla</Button>
                    </Link>
                </NextLink>
                <NextLink href='/rooms/Doble' passHref>
                    <Link>
                        <Button color={asPath === '/restaurantes' ? 'primary' : 'info'}>Doble</Button>
                    </Link>
                </NextLink>
                <NextLink  href='/rooms/Imperial' passHref>
                    <Link>
                        <Button color={asPath === '/experiencias' ? 'primary' : 'info'}>Imperial</Button>
                    </Link>
                </NextLink>
            </Box>


            <Box flex={ 1 } />

            <IconButton
                sx={{display: {xs: 'flex', sm: 'none'}}}
            >
                <SearchOutlined />
            </IconButton>

            {
                isLoggedIn 
                &&
                <>
                    <Typography sx={{color: "#000", marginRight: 3}} >
                        {`Bienvenido, ${user.firstName} `}
                    </Typography>

                    <NextLink href="/" passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={ 1 } color="secondary">
                                <CardTravel/>
                            </Badge>
                        </IconButton>
                    </Link>
                    </NextLink>                
                </>


            }
            <IconButton onClick={toggleSideMenu}>
                <Menu/>
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}
