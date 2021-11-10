// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import React from "react";
import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import { Card } from "@mindee/web-elements.ui.card";
import { DetectionModelType } from "src/common/types";
import Select from "react-select";
import { DETECTION_MODEL_TYPE } from "src/common/constants";

const COMPONENT_ID = "Sidebar";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "95vh",
  },
}));

interface Props {
  detectionModelType: DetectionModelType;
  setDetectionModelType: (value: any) => void;
}
export default function Sidebar({
  detectionModelType,
  setDetectionModelType,
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card header="Settings" id={COMPONENT_ID} className={classes.wrapper}>
      <Box display="flex" flexDirection="column ">
        <Typography>Choose a detection model</Typography>
        <Select
          value={detectionModelType}
          onChange={(value) => setDetectionModelType(value)}
          options={Object.values(DETECTION_MODEL_TYPE)}
        />
      </Box>
    </Card>
  );
}
