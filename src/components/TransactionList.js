import React from "react";
import {
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  chipInc: {
    backgroundColor: "#4caf50",
  },
  chipOut: {
    backgroundColor: "#f44336",
  },
  priceText: {
    textAlign: "center",
  },
  priceLabel: {
    marginRight: theme.spacing(2),
  },
  transList: {
    overflow: "auto",
    height: "500px",
  },
  chipRow: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
  },
}));

const TransactionList = ({ transactions }) => {
  const classes = useStyles();

  const PriceLabel = ({ value }) => {
    return value > 0 ? (
      <Box className={classes.priceLabel}>
        <Chip
          label={
            <Typography className={classes.priceText}>
              {"$" + Math.abs(value)}
            </Typography>
          }
          className={classes.chipInc}
        />
      </Box>
    ) : (
      <Box className={classes.priceLabel}>
        <Chip
          label={
            <Typography className={classes.priceText}>
              {"$" + Math.abs(value)}
            </Typography>
          }
          className={classes.chipOut}
        />
      </Box>
    );
  };

  const DateSince = ({ dateStr }) => {
    let daysSince = Math.ceil(
      Math.abs(Date.now() - Date.parse(dateStr)) / (1000 * 60 * 60 * 24)
    );
    return (
      <Box>
        {daysSince === 1 ? (
          <Typography>{daysSince + " day ago"}</Typography>
        ) : (
          <Typography>{daysSince + " days ago"}</Typography>
        )}
      </Box>
    );
  };

  return (
    <Box>
      <Divider />
      <List className={classes.transList}>
        {transactions.map((trans) => (
          <Box key={trans.id}>
            <ListItem>
              <Box>
                <Typography>{trans.attributes.description}</Typography>
                <Box className={classes.chipRow}>
                  <PriceLabel value={trans.attributes.amount.value} />
                  <Chip
                    label={<DateSince dateStr={trans.attributes.createdAt} />}
                  />
                </Box>
                {trans.attributes.message ? (
                  <Chip
                    style={{ height: "100%" }}
                    avatar={<Avatar>M</Avatar>}
                    label={
                      <Typography style={{ whiteSpace: "normal" }}>
                        {trans.attributes.message}
                      </Typography>
                    }
                  />
                ) : null}
              </Box>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};
export default TransactionList;
