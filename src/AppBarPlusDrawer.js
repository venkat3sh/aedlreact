import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { NavLink } from 'react-router-dom';
// Material UI Imports
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DateRangeTwoTone from '@material-ui/icons/DateRangeTwoTone';
import TodayTwoTone from '@material-ui/icons/TodayTwoTone';
import ViewModuleIcon from '@material-ui/icons/ViewModule';


const drawerWidth = 280;
const scrollBarMargin = 12;
const drawerWithScrollMargin = drawerWidth + scrollBarMargin

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#e8e8e8",
    marginRight: scrollBarMargin
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWithScrollMargin}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    color: "black",
    textAlign: 'right'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  grayedText: {
    fontSize: 14,
    color: 'gray',
    lineHeight: 1
  },
  loginWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoHolder: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  mainTitle: {
    textAlign: 'center'
  },
  para: {
    lineHeight: 1.5,
    paddingRight: 10
  },
  redText: {
    color: 'red'
  }
}));

export default function AppBarPlusDrawer({ handleChangeEnv, currentEnv, isLoggedIn, refresh }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };

    let mainListItems = (<div>
      
      <ListSubheader style={{"fontSize": 21, backgroundColor: 'gray', color: 'white'}}>Generate Metadata</ListSubheader>
      <NavLink to={'/vulcan/editablegrid'} exact className="link-no-decoration flex">
        <ListItem button>
          <ListItemIcon>
              <TodayTwoTone />
          </ListItemIcon>
          <ListItemText primary="Vulcan metadata generator" />
        </ListItem>
      </NavLink>
      
      <ListSubheader style={{"fontSize": 21, backgroundColor: 'gray', color: 'white'}}>Monitoring</ListSubheader>
      <NavLink to={'/vulcan/editablegrid'} exact className="link-no-decoration flex">
        <ListItem button>
          <ListItemIcon>
              <TodayTwoTone />
          </ListItemIcon>
          <ListItemText primary="EMR" />
        </ListItem>
      </NavLink>
      <NavLink to={'/metadata/editablegrid'} className="link-no-decoration flex">
        <ListItem button>
            <ListItemIcon>
              <DateRangeTwoTone />
            </ListItemIcon>
            <ListItemText primary="Glue" />
        </ListItem>
      </NavLink>
      <NavLink to={'/metadata/editablegrid'} className="link-no-decoration flex">
        <ListItem button>
            <ListItemIcon>
              <ViewModuleIcon />
            </ListItemIcon>
            <ListItemText primary="Step Function" />
        </ListItem>
      </NavLink>
      <NavLink to={'/metadata/editablegrid'} className="link-no-decoration flex">
        <ListItem button>
            <ListItemIcon>
              <ViewModuleIcon />
            </ListItemIcon>
            <ListItemText primary="Lambda" />
        </ListItem>
      </NavLink>

      <ListSubheader style={{"fontSize": 21, backgroundColor: 'gray', color: 'white'}}>Auditing</ListSubheader>
      <NavLink to={'/vulcan/editablegrid'} exact className="link-no-decoration flex">
        <ListItem button>
          <ListItemIcon>
              <TodayTwoTone />
          </ListItemIcon>
          <ListItemText primary="RDS" />
        </ListItem>
      </NavLink>
      
    </div>
  )
    
    return (
    <div className={classes.root}>
        
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logoHolder}>
            <img src="https://www.anthem.com/assets/images/brands/top-logo-abcbs.svg" style={{height:30}} alt="" />
          </div>
          
          <Typography component="h1" variant="h3" color="inherit" noWrap className={`${classes.title} ${classes.mainTitle}`}>
            <span className="blue-text"> Data Portal </span>
          </Typography>

          {
            !isLoggedIn ? (
              <div className={classes.loginWrapper}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                  <span className={classes.grayedText}> <p className={classes.para}>You are in read-only mode. <br></br>Login to edit records.</p></span>
                </Typography>
              </div>
            ) : (
              <div className={classes.loginWrapper}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                  <span className={classes.redText}> <p className={classes.para}>You are in write mode.</p></span>
                </Typography>
              </div>
            )
          }
    
          

          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon htmlColor="#0067A5"/>
            </Badge>
          </IconButton> */}

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        

        {/* <Divider /> */}
        {/* <List> */}
          {mainListItems}
        {/* </List> */}
        {/* <Divider />
        <List>{secondaryListItems}</List> */}
      </Drawer>
    </div>
    )
};