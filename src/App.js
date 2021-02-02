import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Categories from "./components/Categories";
import TransactionList from "./components/TransactionList";
import { Typography, Box, Grid, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const UP_BASE_URL = "https://api.up.com.au/api/v1";

const useStyles = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    borderColor: theme.palette.primary.main,
  },
}));

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(UP_BASE_URL + "/transactions?page[size]=100", {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        // best way I have found to differentiate between outgoing/incoming
        // payments and internal transfers
        console.log(res.data.data.filter((res) => res.attributes.rawText));
        setTransactions(res.data.data.filter((res) => res.attributes.rawText));
      });

    axios
      .get(UP_BASE_URL + "/accounts/?page[size]=100", {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setAccounts(resp.data.data);
      });
  }, []);

  const getTotal = () => {
    return accounts
      .map((acc) => Number.parseFloat(acc.attributes.balance.value))
      .reduce((a, b) => a + b, 0);
  };

  return (
    <Box>
      <Header />
      <Box className={classes.main}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper className={classes.paper} elevation={0} variant="outlined">
              <Typography variant="h5">💰 Total value of accounts:</Typography>
              <Typography>{"$" + getTotal()}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper} elavation={0} variant="outlined">
              <Typography variant="h5">Transactions</Typography>
              <Divider />
              <TransactionList transactions={transactions} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper} elavation={0} variant="outlined">
              <Typography variant="h5">Categories</Typography>
              <Divider />
              <Categories transactions={transactions} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
