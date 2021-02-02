import React from "react";
import { LinearProgress, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "280px",
  },
}));

const Categories = ({ transactions }) => {
  const classes = useStyles();
  const goodLife = transactions.filter((trans) =>
    trans.relationships.parentCategory.data
      ? trans.relationships.parentCategory.data.id === "good-life"
      : null
  );
  const personal = transactions.filter((trans) =>
    trans.relationships.parentCategory.data
      ? trans.relationships.parentCategory.data.id === "personal"
      : null
  );
  const home = transactions.filter((trans) =>
    trans.relationships.parentCategory.data
      ? trans.relationships.parentCategory.data.id === "home"
      : null
  );
  const transport = transactions.filter((trans) =>
    trans.relationships.parentCategory.data
      ? trans.relationships.parentCategory.data.id === "transport"
      : null
  );

  let categories = [goodLife, personal, home, transport];
  return (
    <Box className={classes.main}>
      {categories.map((cat, index) => (
        <Box margin="10px 0" key={index}>
          <Typography variant="h5">
            {["Good life 🏖️", "Personal ⚽", "Home 🏠", "Transport 🚌"][index]}
          </Typography>
          <Box display="flex" alignItems="center">
            <Box width="100%">
              <LinearProgress
                variant="determinate"
                value={cat
                  .map((res) =>
                    Math.abs(Number.parseFloat(res.attributes.amount.value))
                  )
                  .reduce((a, b) => a + b, 0)}
              />
            </Box>
            <Box margin="5px">
              <Typography variant="body2" color="textSecondary">
                {"$" +
                  cat
                    .map((res) =>
                      Math.abs(Number.parseFloat(res.attributes.amount.value))
                    )
                    .reduce((a, b) => a + b, 0)}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export default Categories;
