// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { Grid, makeStyles, Theme } from "@material-ui/core";
import Sidebar from "./components/Sidebar";
import VisionWrapper from "./components/VisionWrapper";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "100vh",
    width: "100%",
    background: theme.palette.grey[50],
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Grid className={classes.wrapper} container spacing={2}>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        <VisionWrapper />
      </Grid>
    </Grid>
  );
}

export default App;
