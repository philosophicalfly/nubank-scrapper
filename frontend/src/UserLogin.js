import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography
} from '@material-ui/core';

import useStyles from './style/LoginStyles'
import loading from './img/general/loading.gif';

import api from './services/Api'

export default function SignInSide() {
  const classes = useStyles();

  const [cpf, setCpf] = useState('');
  const [passwd, setPasswd] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [qrCodeState, setQrCodeState] = useState('unset');

  const history = useHistory();

  async function getQrCode(event) {
    event.preventDefault();
    const data = {
      login: cpf,
      passwd
    };
    try {
      setQrCodeState('waiting');
      const response = await api.post('getQrCode', data);
      if (response && response.data && response.data) {
        setQrCodeState('present');
        setQrCode(response.data);
        watchLogin();
      }
    } catch (e) {
      alert("Error, try again later...");
    }
    return 0
  }

  async function watchLogin() {
    try {
      setQrCodeState('waiting');
      const response = await api.post('watchLogin');
      if (response && response.data && response.data.login) {
        history.push('/dashboard');
      }
    } catch (e) {
      alert("Error, try again later...");
    }
    return 0
  }

  return (<Grid container="container" component="main" className={classes.root}>
    <CssBaseline/>
    <Grid item="item" xs={false} sm={4} md={7} className={classes.image}/>
    <Grid item="item" xs={12} sm={8} md={5} component={Paper} elevation={6} square="square">
      <div className={classes.paper}>
        <Typography component="h1" variant="h1">
          Nubank Scrapper
        </Typography>
        <form className={classes.form} noValidate="noValidate" onSubmit={getQrCode}>
        <TextField variant="outlined" margin="normal" required="required" fullWidth="fullWidth" id="cpf" label="CPF" name="cpf" autoFocus="autoFocus" value={cpf} onChange={event => setCpf(event.target.value)}/>
        <TextField variant="outlined" margin="normal" required="required" fullWidth="fullWidth" id="passwd" label="Password" name="passwd" type="password" value={passwd} onChange={event => setPasswd(event.target.value)}/>
        {qrCodeState === 'unset' && (<Button className={classes.primaryButton} variant="contained" type="submit" fullWidth="fullWidth">
            Sign In
          </Button>
          )}
        </form>
        {qrCodeState !== 'unset' && (<Typography component="h5" variant="h5">Scan the QR Code below using the Nubank App</Typography>)}
        {qrCodeState !== 'unset' && (<img className={classes.qr} src={qrCode || loading} alt="Scan the QR Code below using the Nubank App"></img>)}
      </div>
    </Grid>
  </Grid>);
}
