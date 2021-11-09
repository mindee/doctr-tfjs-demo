// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { Card } from "@mindee/web-elements.ui.card";

const COMPONENT_ID = "Sidebar";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "95vh",
  },
}));

export default function Sidebar(): JSX.Element {
  const classes = useStyles();
  return (
    <Card
      header="Settings"
      id={COMPONENT_ID}
      className={classes.wrapper}
    ></Card>
  );
}
