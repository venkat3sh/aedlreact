import React, { useState } from 'react';
// React Router Dom Imports
import { Switch, Route } from 'react-router-dom';
// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// Component Imports
import AppBarPlusDrawer from './AppBarPlusDrawer';
import StaticMetadata from './StaticMetadata';
import DynamicMetadata from './DynamicMetadata';
import VulcanMetadata from './VulcanMetadata'


const drawerWidth = 240;

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
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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
}));

export default function Dashboard( { handleChangeEnv, currentEnv, isLoggedIn }) {
  const classes = useStyles();

  const [refreshNotifications] = useState(true)  
  
  return (
    // <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBarPlusDrawer 
        handleChangeEnv={handleChangeEnv} 
        currentEnv={currentEnv} 
        isLoggedIn={isLoggedIn}
        refresh={refreshNotifications}
        />
        
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={3}>

              {/* Chart */}
              <Switch>
              
                {/* <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}> */}
                    {/* <Chart /> */}
                    {/* <Route exact path='/' component={withRouter(IngestionDailyTable)} /> */}
                    <Route
                      path='/vulcan/metadata'
                      exact
                      render={(props) => <VulcanMetadata {...props} currentEnv={currentEnv} />}
                    />
                    <Route
                        path='/metadata/static'
                        exact
                        render={(props) => <StaticMetadata {...props} currentEnv={currentEnv} />}
                      />
                      {/* <Route exact path='/login' component={withRouter(RequestVulcanDialog)}/> */}
                    {/* <WeeklyTable /> */}
                  {/* </Paper>
                </Grid> */}
                {/* Recent Deposits */}

                {/* <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <Deposits />
                  </Paper>
                </Grid> */}

                {/* Recent Orders */}
                {/* <Grid item xs={12}>
                  <Paper className={classes.paper}> */}
                  <Route
                        path='/metadata/dynamic'
                        exact
                        render={(props) => <DynamicMetadata {...props} currentEnv={currentEnv} />}
                      />
                      {/* <Route exact path='/login' component={withRouter(RequestVulcanDialog)}/> */}
                    {/* <Route exact path='/processing/weekly' component={withRouter(IngestionWeeklyTable)} /> */}
                                       
                  {/* </Paper>
                </Grid> */}
                
              </Switch>

          </Grid>
        </Container>
      </main>
    </div>
  );
}