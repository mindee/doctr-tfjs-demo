// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { Grid, makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import { DET_MODEL_TYPE, RECO_MODEL_TYPE } from "./common/constants";
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
  const [detectionModelType, setDetectionModelType] = useState(
    DET_MODEL_TYPE.db_mobilenet_v2
  );
  const [recognitionModelType, setRecognitionModelType] = useState(
    RECO_MODEL_TYPE.crnn_vgg16_bn
  );
  return (
    <Grid className={classes.wrapper} container spacing={2}>
      <Grid item xs={3}>
        <Sidebar
          detectionModelType={detectionModelType}
          setDetectionModelType={setDetectionModelType}
          recognitionModelType={recognitionModelType}
          setRecognitionModelType={setRecognitionModelType}
        />
      </Grid>
      <Grid item xs={9}>
        <VisionWrapper
          detectionModelType={detectionModelType}
          recognitionModelType={recognitionModelType}
        />
      </Grid>
    </Grid>
  );
}

export default App;
