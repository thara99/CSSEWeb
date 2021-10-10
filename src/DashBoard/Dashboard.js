import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from './listItems';
import Chart from './Chart';
import axios from "axios";
import {useState} from "react";
import MaterialTable from "material-table";
import moment from "moment";
import Title from "./Title";




const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();










function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

    const [columns, setColumns] = useState([
        { title: "Route No.", field: "route" },
        { title: "From", field: "startLocation" },
        { title: "To", field: "endLocation" },
        { title: "Departure Time", field: "endTime", type: "time" },
        { title: "Arrival Time", field: "startTime" },
    ]);

    const [journey, setJourney] = React.useState([]);






    const [adminValues, setAdminValues] = React.useState({
        totFare: null,
        totInspections: null,
    });

    const [members, setMembers] = React.useState();




    React.useEffect(async () => {
        let data = await axios.get(
            "http://localhost:4000/api/v1/route/getroutes"
        );

        setJourney(data.data.timeTable);



        let adminData = await axios.get(
            "https://blackcode-bus-ticketing-system.herokuapp.com/api/v1/user/admindata"
        );



        setAdminValues({...adminValues,
            totFare: adminData.data.finalAmount,
            totInspections: adminData.data.finalCount[0].inspectionCount});


        let userData = await axios.get(
            "http://blackcode-bus-ticketing-system.herokuapp.com/api/v1/user/allusers"
        );

        setMembers(userData.data.userCount);


    }, []);








    const updateRoute = async (newData) => {
        // console.log("new dataaa", newData)
        // console.log("new data iddd", newData._id)
        await axios.put("http://localhost:4000/api/v1/route/updateroute/" + newData._id,newData)
            .then((res)=>{
                // alert("Successfully Updated")
            })
            .catch((err)=>{
                alert(err.message)
            })
    }

    const deleteRoute = async (oldData) => {
        // console.log("new dataaa", newData)
        // console.log("new data iddd", newData._id)
        await axios.delete("http://localhost:4000/api/v1/route/deleteroute/" + oldData._id)
            .then((res)=>{
                // alert("Successfully Deleted")
            })
            .catch((err)=>{
                alert(err.message)
            })
    }













  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Total Members */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                    <Title>Total Members</Title>
                    <Typography component="p" variant="h4">
                        {members}
                    </Typography>
                </Paper>
              </Grid>
               {/* Total Fare */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                    <Title>Total Fare</Title>
                    <Typography component="p" variant="h4">
                        {adminValues.totFare}
                    </Typography>
                </Paper>
              </Grid>
              {/* Number of inspection */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 150,
                  }}
                >
                    <Title>Number of Inspections</Title>
                    <Typography component="p" variant="h4">
                        {adminValues.totInspections}
                    </Typography>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                {/*<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>*/}
                {/*  <Orders />*/}
                {/*</Paper>*/}
                  <MaterialTable
                      style={{ padding: 20, marginTop: 30 }}
                      title=""
                      columns={columns}
                      data={journey}
                      options={{
                          exportButton: true,
                          rowStyle: (rowData) => ({
                              backgroundColor: rowData.tableData.id % 2 === 0 ? "#EEE" : "#FFF",
                          }),
                          headerStyle: {
                              backgroundColor: "#3f51b5",
                              color: "#fff",
                          },
                          pageSize: 5,
                          actionsColumnIndex: -1,
                          paging: true,
                      }}
                      editable={{
                          onRowUpdate: (newData, oldData) =>
                              new Promise((resolve, reject) => {
                                  setTimeout(() => {
                                      const dataUpdate = [...journey];
                                      const index = oldData.tableData.id;
                                      dataUpdate[index] = newData;
                                      setJourney([...dataUpdate]);

                                      updateRoute(newData);

                                      resolve();
                                  }, 1000);
                              }),
                          onRowDelete: (oldData) =>
                              new Promise((resolve, reject) => {
                                  setTimeout(() => {
                                      const dataDelete = [...journey];
                                      const index = oldData.tableData.id;
                                      dataDelete.splice(index, 1);
                                      setJourney([...dataDelete]);

                                      deleteRoute(oldData);

                                      resolve();
                                  }, 1000);
                              }),
                      }}
                  />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}