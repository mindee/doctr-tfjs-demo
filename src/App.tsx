// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { Grid, makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import { DET_CONFIG, RECO_CONFIG } from "./common/constants";
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
  const [detConfig, setDetConfig] = useState(
    DET_CONFIG.db_mobilenet_v2
  );
  const [recoConfig, setRecoConfig] = useState(
    RECO_CONFIG.crnn_vgg16_bn
  );
  return (
    <Grid className={classes.wrapper} container spacing={2}>
      <Grid item xs={3}>
        <Sidebar
          detConfig={detConfig}
          setDetConfig={setDetConfig}
          recoConfig={recoConfig}
          setRecoConfig={setRecoConfig}
        />
      </Grid>
      <Grid item xs={9}>
        <VisionWrapper
          detConfig={detConfig}
          recoConfig={recoConfig}
        />
      </Grid>
    </Grid>
  );
}

export default App;
