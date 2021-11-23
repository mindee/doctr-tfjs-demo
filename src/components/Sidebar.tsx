// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import React from "react";
import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import { Card } from "@mindee/web-elements.ui.card";
import { ModelType } from "src/common/types";
import Select from "react-select";
import { DET_MODEL_TYPE, RECO_MODEL_TYPE } from "src/common/constants";

const COMPONENT_ID = "Sidebar";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "95vh",
  },
}));

interface Props {
  detectionModelType: ModelType;
  setDetectionModelType: (value: any) => void;
  recognitionModelType: ModelType;
  setRecognitionModelType: (value: any) => void;
}
export default function Sidebar({
  detectionModelType,
  setDetectionModelType,
  recognitionModelType,
  setRecognitionModelType,
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card header="Settings" id={COMPONENT_ID} className={classes.wrapper}>
      <Box display="flex" flexDirection="column ">
        <Typography>Text detection architecture (backbone)</Typography>
        <Select
          value={detectionModelType}
          onChange={(value) => setDetectionModelType(value)}
          options={Object.values(DET_MODEL_TYPE)}
        />
      </Box>
      <Box display="flex" flexDirection="column ">
        <Typography>Text recognition architecture (backbone)</Typography>
        <Select
          value={recognitionModelType}
          onChange={(value) => setRecognitionModelType(value)}
          options={Object.values(RECO_MODEL_TYPE)}
        />
      </Box>
    </Card>
  );
}
