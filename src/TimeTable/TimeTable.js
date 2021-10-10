import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { SettingsInputCompositeTwoTone } from '@material-ui/icons';
import axios from 'axios';

import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";




import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});







const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: 'url(https://res.cloudinary.com/dxz8wbaqv/image/upload/v1631639062/SPM%20Project/Tharaka/s-migaj-b2qszO9C7sw-unsplash_qvuxks.jpg)',
    backgroundImage: 'url(https://res.cloudinary.com/dxz8wbaqv/image/upload/v1633803142/SPM%20Project/Tharaka/13199_ip8uzz.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select:{  
    width:'500px !important'

  }
}));



export default function SignInSide() {
  const classes = useStyles();

  const INITIAL_VALUES = {
    route: "",
    vehicalNumber: "",
    startTime: null,
    endTime: null,
    startLocation: "",
    endLocation: "",
    open: false,
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setValues({...values, open: false})

  };




  const [values, setValues] = React.useState(INITIAL_VALUES);



  const onSubmit = async (e) =>{
    e.preventDefault()

    let formValues = {
      route: values.route,
      vehicalNumber: values.vehicalNumber,
      startTime: moment(values.startTime).format('LTS'),
      endTime: moment(values.endTime).format('LTS'),
      startLocation: values.startLocation,
      endLocation: values.endLocation,
    };


    const datax = await axios.post(
        "http://localhost:4000/api/v1/route/addroute",
        formValues
    );

    setValues({...values, open: true})

    // console.log("form values", formValues)
    // setValues(INITIAL_VALUES)
  }

  const resetForm = () =>{
    setValues({
      route: "",
      vehicalNumber: "",
      startTime: null,
      endTime: null,
      startLocation: "",
      endLocation: "",
      open: false
    })
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h4" color={"primary"} >
            <b>Time Tables</b>

          </Typography>
          <Snackbar open={values.open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Successfully Inserted!
            </Alert>
          </Snackbar>
          <form className={classes.form} onSubmit = {onSubmit} noValidate>

          <TextField
              margin="normal"
              variant="outlined"
              value={values.route}
              onChange={(e) =>
                  setValues({ ...values, route: e.target.value })
              }
              required
              fullWidth
              id="routeNum"
              label="Route Number"
              name="routeNum"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="vehiNum"
              label="Vehicle Number"
              name="vehiNum"
              variant="outlined"
              value={values.vehicalNumber}
              onChange={(e) =>
                  setValues({ ...values, vehicalNumber: e.target.value })
              }
            />


            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                    style={{ width: "100%" }}
                    inputVariant="outlined"
                    autoOk
                    margin="normal"
                    // id="time-picker"
                    label="Departure Time*"
                    value={values.startTime}
                    onChange={(time) =>
                        setValues({
                          ...values,
                          startTime: time
                        })
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                />

              <KeyboardTimePicker
                  style={{ width: "100%" }}
                  inputVariant="outlined"
                  autoOk
                  margin="normal"
                  // id="time-picker"
                  label="Arrival Time*"
                  value={values.endTime}
                  onChange={(time) =>
                      setValues({
                        ...values,
                        endTime: time
                      })
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
              />
            </MuiPickersUtilsProvider>



            <TextField
              margin="normal"
              required
              fullWidth
              id="from"
              label="Start location"
              name="from"
              variant="outlined"
              value={values.startLocation}
              onChange={(e) =>
                  setValues({ ...values, startLocation: e.target.value })
              }
            />
              <TextField
              margin="normal"
              required
              fullWidth
              id="to"
              label="End location"
              name="to"
              variant="outlined"
              value={values.endLocation}
              onChange={(e) =>
                  setValues({ ...values, endLocation: e.target.value })
              }
            />


  
            <Button
              style={{marginRight: 50, width: 250, height: 50, fontSize: 16}}
              type="submit"
              // fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <b>ADD</b>

            </Button>

            <Button
                style={{ width: 100, height: 50, fontSize: 16, backgroundColor: "white", borderWidth: "2px", borderStyle: "solid", borderColor: "#e7e7e7", color: "#808080"}}
                // fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={resetForm}
            >
              <b>Reset</b>

            </Button>
       
          
          </form>
        </div>
      </Grid>
    </Grid>
  );
}