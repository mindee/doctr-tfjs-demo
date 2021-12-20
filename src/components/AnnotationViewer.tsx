// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { makeStyles, Theme } from "@material-ui/core";
import { FONTS } from "@mindee/web-elements.assets";
import { Card } from "@mindee/web-elements.ui.card";
import { Typography } from "@mindee/web-elements.ui.typography";
import {
  AnnotationData,
  AnnotationShape,
  AnnotationViewer as AnnotationViewerBase,
  Stage,
} from "react-mindee-js";
const COMPONENT_ID = "AnnotationViewer";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {},
  image: {
    height: "100%",
    width: "100%",
  },
}));

interface Props {
  annotationData: AnnotationData;
  setAnnotationStage: (stage: Stage) => void;
  onShapeMouseEnter: (shape: AnnotationShape) => void;
  onShapeMouseLeave: (shape: AnnotationShape) => void;
  onShapeClick: (shape: AnnotationShape) => void;
}

export default function AnnotationViewer({
  setAnnotationStage,
  annotationData,
  onShapeMouseLeave,
  onShapeClick,
  onShapeMouseEnter,
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card
      topBar
      id={COMPONENT_ID}
      header={
        <Typography
          style={{ fontFamily: FONTS.bold }}
          paragraph
          variant="subtitle1"
        >
          3 Visualize word predictions
        </Typography>
      }
      className={classes.wrapper}
    >
      <AnnotationViewerBase
        onShapeMouseLeave={onShapeMouseLeave}
        onShapeMouseEnter={onShapeMouseEnter}
        onShapeClick={onShapeClick}
        data={annotationData}
        getStage={setAnnotationStage}
        style={{ height: "50vh", width: "100%", background: "white" }}
      />
    </Card>
  );
}
