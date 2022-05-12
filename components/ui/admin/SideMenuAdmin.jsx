
import { Home } from '@mui/icons-material';
import { Avatar,  List,  Box, Drawer, Typography, Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { deepOrange } from '@mui/material/colors';



const drawerWidth = 240;

export default function SideMenuAdmin() {

  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'secondary.main',
            
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box display="flex" flexDirection="column" alignItems="center" padding={3} >
            <Avatar sx={{ bgcolor:"#f0a4a3", width: 65, height: 65, marginBottom: 1 }}>DM</Avatar>
            <Typography variant="body1" color={"white"} >Diego</Typography>

        </Box>

        <Divider sx={{background: "secondary"}}/>
       <List>
            <ListItem button>
                <ListItemIcon>
                    <Home sx={{color: "#FFF"}} />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{color: "#FFF"}} />
            </ListItem>
       </List>


      </Drawer>
      
  );
}