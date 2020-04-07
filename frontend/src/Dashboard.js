import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CachedIcon from '@material-ui/icons/Cached';
import loading from './img/general/loading.gif';

import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import useStyles from './style/DashboardStyles'
import api from './services/Api'

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();

  const [dataToShow, setDataToShow] = useState('profile');
  const [profile, setProfile] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const [tabNames, setTabNames] = useState(false);
  const [charges, setCharges] = useState(false);
  const [summaries, setSummaries] = useState(false);

  useEffect(() => {
    showProfile();
  }, []);

  async function showProfile(refetch) {
    if(!profile|| refetch){
    setDataToShow('loading');
    setProfile(false)
      try {
        await api.get('profile').then(response => {
            if (response && response.data) {
                setProfile(response.data)
            }
        })    
      } catch (e) {
        alert("Error, try again later...");
      }
    }
    setDataToShow('profile');
  }

  async function showTransactions(refetch) {
    if(!transactions|| refetch){
    setDataToShow('loading');
    setTransactions(false)
      try {
        await api.get('transactions').then(response => {
            if (response && response.data) {
                setTransactions(response.data)
            }
        });    
      } catch (e) {
        alert("Error, try again later...");
      }
    }
    setDataToShow('transactions');
  }

  async function showCharges(refetch) {
    if(!charges || refetch){
    setDataToShow('loading');
    setTabNames(false);
    setCharges(false);
      try {
        await api.get('charges').then(response => {
            if (response && response.data && response.data.tabNames && response.data.charges) {
                setTabNames(response.data.tabNames)
                setCharges(response.data.charges)
            }
        });
      } catch (e) {
        alert("Error, try again later...");
      }
    }
    setDataToShow('charges');
  }

  async function showSummaries(refetch) {
    if(!summaries || refetch){
    setDataToShow('loading');
    setTabNames(false);
    setSummaries(false);
      try {
        await api.get('summaries').then(response => {
            if (response && response.data && response.data.tabNames && response.data.summaries) {
                setTabNames(response.data.tabNames)
                setSummaries(response.data.summaries)
                console.log(response.data)
            }
        });
      } catch (e) {
        alert("Error, try again later...");
      }
    }
    setDataToShow('summaries');
  }

  async function logout() {
    try {
        const response = await api.post('logout');
        if (response && response.data && response.data.login == false) {
          history.push('/');
        }
      } catch (e) {
        alert("Error, try again later...");
        history.push('/');
      }
      return 0
   }

  return (<React.Fragment>
    <CssBaseline/>
    <div className={classes.root}>
      <AppBar position="relative" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h3" variant="h4" align="left" color="white">
              Nubank Scrapper
          </Typography>
          <Button className={classes.transparentButton} onClick={() => logout()}>
            <ExitToAppIcon className={classes.icon}/>
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <div className={classes.title}>
        <Container maxWidth="md">
          <Typography component="h3" variant="h4" align="center" color="textPrimary">{profile.name}</Typography>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={2} justify="center">
            <Grid item><Button variant="contained" color="primary" onClick={() => showProfile()}>Show Profile</Button></Grid>
            <Grid item><Button variant="contained" color="primary" onClick={() => showSummaries()}>Show Summaries</Button></Grid>
            <Grid item><Button variant="contained" color="primary" onClick={() => showTransactions()}>Show Transactions</Button></Grid>
            <Grid item><Button variant="contained" color="primary" onClick={() => showCharges()}>Show Charges</Button></Grid>
          </Grid>
        </Container>
        </div>

        {dataToShow === 'loading' && (
        <Container className={classes.loadingContainer} maxWidth="md">
        <img className={classes.loading} src={loading} alt="loading"></img>
        </Container>
        )}

        {dataToShow === 'profile' && (
        <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2} justify="space-between">
            <Grid item><Typography component="h4" variant="h4">Profile</Typography></Grid>
            <Grid item><Button variant="contained" color="primary" onClick={() => showProfile(true)}><CachedIcon className={classes.icon}/></Button></Grid>
        </Grid>
          <Typography color="textSecondary">Email: {profile.email}</Typography>
          <Typography color="textSecondary">Phone: {profile.phone}</Typography>
          <Typography color="textSecondary">Card Number: {profile.number}</Typography>
          <Typography color="textSecondary">Used Credit: {profile.usedCredit || 'R$0,00'}</Typography>
          <Typography color="textSecondary">Available Credit: {profile.availableCredit}</Typography>
          <Typography color="textSecondary">Total Credit: {profile.totalCredit}</Typography>
          <Typography color="textSecondary">Due Day: {profile.dueDay}</Typography>
        </Container>
        )}

        {dataToShow === 'transactions' && (
        <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2} justify="space-between">
            <Grid item><Typography component="h4" variant="h4">Transactions</Typography></Grid>
            <Grid item><Button variant="contained" color="primary" onClick={() => showTransactions(true)}><CachedIcon className={classes.icon}/></Button></Grid>
        </Grid>
        <Typography component="h5" variant="h5">Total Purchases: {transactions.purchases}</Typography>
        <Typography component="h5" variant="h5">Total Expenses: R${transactions.expenses}</Typography>
        <br/>
          <Grid container="container" spacing={4}>
            <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.feed.map((transaction, i) => (
                    <TableRow key={i}>
                      <TableCell>{transaction.title}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
          </Grid>
        </Container>
        )}

        {dataToShow === 'charges' && (
        <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2} justify="space-between">
            <Grid item><Typography component="h4" variant="h4">Charges</Typography></Grid>
            <Grid item><Button variant="contained" color="primary" onClick={() => showCharges(true)}><CachedIcon className={classes.icon}/></Button></Grid>
        </Grid>
         {Object.entries(tabNames).map(([v, value]) => (
          <Grid container="container" spacing={4} key={v}>
            <Typography className={classes.cardGrid} component="h5" variant="h5">{value}</Typography>
            <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {charges && charges[v] && Object.entries(charges[v]).map(([c, charge]) => (
                    <TableRow key={c}>
                      <TableCell>{charge.date}</TableCell>
                      <TableCell>{charge.description}</TableCell>
                      <TableCell>{charge.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
          </Grid>
        ))}
        </Container>
        )}


        {dataToShow === 'summaries' && (
        <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={2} justify="space-between">
            <Grid item><Typography component="h4" variant="h4">Summaries</Typography></Grid>
            <Grid item><Button variant="contained" color="primary" onClick={() => showSummaries(true)}><CachedIcon className={classes.icon}/></Button></Grid>
        </Grid>
         {Object.entries(tabNames).map(([v, value]) => (
          <Grid container="container" spacing={4} key={v}>
            <Typography className={classes.cardGrid} component="h5" variant="h5">{value}</Typography>
            <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {summaries && summaries[v] && 
                    <TableRow>
                      <TableCell>{summaries[v].dueDate}</TableCell>
                      <TableCell>{summaries[v].amount}</TableCell>
                    </TableRow>                      
                  }
                </TableBody>
            </Table>
          </Grid>
        ))}
        </Container>
        )}

      </main>

      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom="gutterBottom">
          Nubank Scrapper
        </Typography>
        <Typography align="center" color="white" component="p">
          Simple Nubank scrapper
        </Typography>
      </footer>
    </div>
    </React.Fragment>
    );
}