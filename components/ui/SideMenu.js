import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, BackpackOutlined, BedOutlined, CardTravelOutlined, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, RestaurantOutlined, RoomServiceOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useContext } from 'react';
import { UiContext, AuthContext } from '../../context';
import { useRouter } from "next/router"; 

export const SideMenu = () => {


    const {push} = useRouter()
    const {isMenuOpen, toggleSideMenu, openLogin} = useContext(UiContext)
    const {isLoggedIn, user, handleLogout} = useContext(AuthContext)

    const handleClickLogout = () => {
        handleLogout()
        push('/')
        toggleSideMenu()
    }


    const handleOpenLogin = () => {
        openLogin()
        toggleSideMenu()
    }

   /* const [searchTerm, setSearchTerm] = useState('')

    const onSearchTerm = ()=>{
        if(searchTerm.trim().length === 0) return;

        navigateTo(`/search/${searchTerm}`)
    }

    const navigateTo = (url) => {
        router.push(url)
        toggleSideMenu()
    }  */


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                {
                    isLoggedIn && user.role === 'user' &&
                    <Box>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItem>
    
                        <ListItem 
                            button
                            onClick={() => push(`/reservaciones/${user._id}`)}
                        >
                            <ListItemIcon>
                                <CardTravelOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Reservaciones'} />
                        </ListItem>
    
                        <ListItem button>
                            <ListItemIcon>
                                <RoomServiceOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Servicios Extras'} />
                        </ListItem>

                        <ListItem 
                            button
                            onClick={ handleClickLogout }
                        >
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>
                    </Box>
                }

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={()=>navigateTo('/habitaciones')}>
                    <ListItemIcon>
                        <BedOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Habitaciones'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={()=>navigateTo('/restaurantes')}>
                    <ListItemIcon>
                        <RestaurantOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Restaurantes'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={()=>navigateTo('/experiencias')}>
                    <ListItemIcon>
                        <BackpackOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Experiencias'} />
                </ListItem>


                {
                    !isLoggedIn && (
                    <ListItem 
                        button
                        onClick={handleOpenLogin}
                    >
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItem>

                    )
                }



             {
                    isLoggedIn && user?.role === 'admin' && (
                        <Box>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem button >
                                <ListItemIcon>
                                    <BedOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Habitaciones'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <CardTravelOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Reservas'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                        </Box>
                    )   
                } 

            </List>
        </Box>
    </Drawer>
  )
}

