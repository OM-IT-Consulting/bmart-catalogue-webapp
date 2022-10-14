import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { isAPIAllowed } from '../session/api';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Link from '@mui/material/Link';
import LayersIcon from '@mui/icons-material/Layers';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

export default function NestedMenuList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menu
        </ListSubheader>
      }
      >
      {isAPIAllowed('API001')?
      <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
        <Link href="/#/app/dashboard" color="inherit" underline="none"><ListItemText primary="Dashboard" /></Link>
      </ListItemButton>
      :""}
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Sample Pages" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton  sx={{ pl: 4 }}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <Link href="/#/app/checkoutform" color="inherit" underline="none"><ListItemText primary="Checkout Form" /></Link>
          </ListItemButton>
          <ListItemButton  sx={{ pl: 4 }}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <Link href="/#/app/fileupload" color="inherit" underline="none"><ListItemText primary="File Upload" /></Link>
          </ListItemButton>
          <ListItemButton  sx={{ pl: 4 }}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <Link href="/#/app/applicationpage" color="inherit" underline="none"><ListItemText primary="Application Page" /></Link>
          </ListItemButton>
          <ListItemButton  sx={{ pl: 4 }}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <Link href="/#/app/pymtintegration" color="inherit" underline="none"><ListItemText primary="Payment Integration" /></Link>
        </ListItemButton>
        <ListItemButton  sx={{ pl: 4 }}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <Link href="/#/app/mfintegration" color="inherit" underline="none"><ListItemText primary="MicroFrontEnd Integration" /></Link>
        </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <Link href="/#/app/signin" color="inherit" underline="none" ><ListItemText primary="Logout" /></Link>
      </ListItemButton>
    </List>
  );
}