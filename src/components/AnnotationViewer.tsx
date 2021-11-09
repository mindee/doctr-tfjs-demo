// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { Box, makeStyles, Theme } from "@material-ui/core";
import { Card } from "@mindee/web-elements.ui.card";
import {
  AnnotationData,
  AnnotationShape,
  AnnotationViewer as AnnotationViewerBase,
  Stage,
} from "react-mindee-js";
const COMPONENT_ID = "AnnotationViewer";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "45vh",
  },
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
      header="Detected word boxes"
      id={COMPONENT_ID}
      className={classes.wrapper}
    >
      <AnnotationViewerBase
        onShapeMouseLeave={onShapeMouseLeave}
        onShapeMouseEnter={onShapeMouseEnter}
        onShapeClick={onShapeClick}
        data={annotationData}
        getStage={setAnnotationStage}
        style={{ height: "35vh", width: "100%", background: "white" }}
      />
    </Card>
  );
}
