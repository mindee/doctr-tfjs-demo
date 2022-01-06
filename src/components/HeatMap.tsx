// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { makeStyles, Theme } from "@material-ui/core";
import { MutableRefObject } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {},
  image: {
    height: "35vh",
    margin: "auto",
    display: "none",
  },
}));

interface Props {
  heatMapContainerRef: MutableRefObject<HTMLCanvasElement | null>;
}

export default function HeatMap({ heatMapContainerRef }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <canvas className={classes.image} id="heatmap" ref={heatMapContainerRef} />
  );
}
