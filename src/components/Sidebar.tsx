// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import React from "react";
import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import { Card } from "@mindee/web-elements.ui.card";
import { ModelConfig } from "src/common/types";
import { SelectInput } from "@mindee/web-elements.ui.select-input";
import { DET_CONFIG, RECO_CONFIG } from "src/common/constants";
import { FONTS } from "@mindee/web-elements.assets";

const COMPONENT_ID = "Sidebar";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {},
  item: {
    rowGap: 5,
  },
}));

interface Props {
  detConfig: ModelConfig;
  setDetConfig: (value: any) => void;
  recoConfig: ModelConfig;
  setRecoConfig: (value: any) => void;
}
export default function Sidebar({
  detConfig,
  setDetConfig,
  recoConfig,
  setRecoConfig,
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card
      topBar
      header={
        <Typography
          style={{ fontFamily: FONTS.bold }}
          paragraph
          variant="subtitle1"
        >
          1 Select a Model
        </Typography>
      }
      contentStyle={{
        paddingTop: 10,
      }}
      id={COMPONENT_ID}
      className={classes.wrapper}
    >
      <Box
        display={"flex"}
        flexDirection="column"
        style={{
          rowGap: 8,
        }}
      >
        <Box className={classes.item} display="flex" flexDirection="column ">
          <Typography>Detection model</Typography>
          <SelectInput
            value={detConfig}
            onChange={(value) => setDetConfig(value)}
            options={Object.values(DET_CONFIG)}
          />
        </Box>
        <Box className={classes.item} display="flex" flexDirection="column ">
          <Typography>Recognition model</Typography>
          <SelectInput
            value={recoConfig}
            onChange={(value) => setRecoConfig(value)}
            options={Object.values(RECO_CONFIG)}
          />
        </Box>
        <Box mt="10px" id="upload-container"></Box>
      </Box>
    </Card>
  );
}
